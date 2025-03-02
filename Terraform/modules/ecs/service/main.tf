
data "aws_ecr_repository" "app" {
  count = var.use_dockerhub ? 0 : 1
  name  = var.ecr_repository_name
}

resource "aws_ssm_document" "ensure_volumes" {
  name          = "${var.ecr_repository_name}-ensure-volumes"
  document_type = "Command"

  content = jsonencode({
    schemaVersion = "2.2"
    description   = "Ensure all required volume directories exist before starting ECS tasks."
    mainSteps = [
      {
        action = "aws:runShellScript"
        name   = "EnsureDirectoriesExist"
        inputs = {
          runCommand = flatten([
            for volume in var.volumes : [
              "mkdir -p ${volume.host_path}",
              "chown ec2-user:ec2-user ${volume.host_path}",
              "chmod 755 ${volume.host_path}"
            ] if volume.host_path != null
          ])
        }
      }
    ]
  })
}

resource "aws_ssm_association" "run_ensure_volumes" {
  name = aws_ssm_document.ensure_volumes.name
  targets {
    key    = "tag:Name"
    values = [var.ecs_instance_tag]
  }
}

resource "aws_cloudwatch_log_group" "ecs_logs" {
  name              = "/ecs/${var.ecr_repository_name}-logs"
  retention_in_days = 7
}

resource "aws_ecs_task_definition" "this" {
  family                   = "${var.ecr_repository_name}-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["EC2"]
  cpu                      = var.cpu
  memory                   = var.memory

  dynamic "volume" {
    for_each = var.volumes
    content {
      name      = volume.value.name
      host_path = volume.value.host_path
    }
  }

  container_definitions = jsonencode([
    {
      name           = var.ecr_repository_name
      container_name = var.ecr_repository_name
      image          = var.use_dockerhub ? "${var.name}:${var.image_tag}" : "${data.aws_ecr_repository.app[0].repository_url}:${var.image_tag}"
      essential      = true
      command        = var.command
      environment = [
        for key, value in var.env_vars : {
          name  = key
          value = value
        }
      ]
      mountPoints = [
        for volume in var.volumes : {
          sourceVolume  = volume.name
          containerPath = volume.container_path
          readOnly      = coalescelist([volume.read_only], [false])[0]
        }
      ]
      portMappings = var.expose_port ? [
        {
          containerPort = var.container_port
          hostPort      = var.container_port
          protocol      = "tcp"
        }
      ] : []
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = aws_cloudwatch_log_group.ecs_logs.name
          awslogs-region        = var.region
          awslogs-stream-prefix = "ecs"
        }
      }
      
      dependsOn = [
        for dep in var.health_check_dependency : {
          containerName = dep
          condition     = "HEALTHY"
        }
      ]

      healthCheck = var.health_check == null ? null : {
        command     = var.health_check.command
        interval    = var.health_check.interval
        timeout     = var.health_check.timeout
        retries     = var.health_check.retries
        startPeriod = var.health_check.startPeriod
      }

    }
  ])
}

resource "aws_ecs_service" "this" {
  name            = "${var.ecr_repository_name}-service"
  cluster         = var.ecs_cluster_id
  task_definition = aws_ecs_task_definition.this.arn
  desired_count   = var.desired_count
  launch_type     = "EC2"

  dynamic "load_balancer" {
    for_each = var.expose_port ? [1] : []
    content {
      target_group_arn = var.alb_target_group_arn
      container_name   = var.ecr_repository_name
      container_port   = var.container_port
    }
  }

  deployment_minimum_healthy_percent = 50
  deployment_maximum_percent         = 200

  network_configuration {
    subnets         = var.subnet_ids
    security_groups = [var.security_group_id]
    assign_public_ip = false
  }

  depends_on = [
    var.autoscaling_group_id,
    aws_ssm_association.run_ensure_volumes
  ]

  timeouts {
    delete = "30m"
  }
}

data "aws_caller_identity" "current" {}

resource "aws_iam_policy" "ecs_logging_policy" {
  name        = "${var.ecr_repository_name}-ecs-logging-policy"
  description = "Allows ECS tasks to write logs to CloudWatch"
  policy      = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "arn:aws:logs:${var.region}:${data.aws_caller_identity.current.account_id}:log-group:/ecs/${var.ecr_repository_name}-logs:*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_logging_attachment" {
  role       = var.ecs_task_execution_role_name
  policy_arn = aws_iam_policy.ecs_logging_policy.arn
}
