resource "aws_service_discovery_private_dns_namespace" "this" {
  name        = "${var.name}.local"  # Change domain name if needed
  vpc         = var.vpc_id
  description = "Service discovery namespace for ${var.name}"
}

resource "aws_service_discovery_service" "this" {
  name = "${var.name}-cloudmap"

  dns_config {
    namespace_id = aws_service_discovery_private_dns_namespace.this.id
    dns_records {
      ttl  = 10
      type = "A"  # Use A record for awsvpc mode (IP-based)
    }
    routing_policy = "MULTIVALUE"
  }

  health_check_custom_config {
    failure_threshold = 2
  }
}

locals {
  # Flatten all container mount points.
  container_volumes = flatten([
    for container in var.container_definitions : [
      for mount in container.mount_points : [
        {
          name      = mount.name
          host_path = lookup(mount, "host_path", "")
        }
      ]
    ]
  ])

  flat_volumes = flatten(local.container_volumes)

  # Deduplicate volumes by their name.
  volumes_from_containers = { for vol in local.flat_volumes : vol.name => vol }
  unique_volumes = values(local.volumes_from_containers)
}


data "aws_ecr_repository" "app" {
  for_each = { for container in var.container_definitions : container.ecr_repository_name => container if container.use_dockerhub == false }
  name     = each.key
}

resource "aws_ssm_document" "ensure_volumes" {
  name          = "${var.name}-ensure-volumes"
  document_type = "Command"

  content = jsonencode({
    schemaVersion = "2.2",
    description   = "Ensure all required volume directories exist before starting ECS tasks.",
    mainSteps = [
      {
        action = "aws:runShellScript",
        name   = "EnsureDirectoriesExist",
        inputs = {
          runCommand = flatten([
            for container in var.container_definitions : [
              for mount in container.mount_points : lookup(mount, "host_path", null) != null ? [
                "mkdir -p ${lookup(mount, "host_path", "")}",
                "chown ec2-user:ec2-user ${lookup(mount, "host_path", "")}",
                "chmod 755 ${lookup(mount, "host_path", "")}"
              ] : []
            ]
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
  name              = "/ecs/${var.name}-logs"
  retention_in_days = 7
}


resource "aws_ecs_task_definition" "this" {
  # The task family name could be derived from a merged name.
  family                   = "${var.name}-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["EC2"]
  # Task-level CPU and memory values must be sufficient to run all containers.
  cpu                      = var.cpu
  memory                   = var.memory

  # Dynamically generate volume definitions from container mount points.
  dynamic "volume" {
    for_each = local.unique_volumes
    content {
      name = volume.value.name
      host_path = volume.value.host_path != "" ? volume.value.host_path : null
    }
  }

  

  container_definitions = jsonencode([
    for container in var.container_definitions : {
      name  = container.container_name

      image = container.use_dockerhub ? "${container.name}:${container.image_tag}" : "${data.aws_ecr_repository.app[container.ecr_repository_name].repository_url}:${container.image_tag}"

      essential = true
      command   = container.command

      environment = [
        for key, value in container.env_vars : {
          name  = key
          value = value
        }
      ]
      
      mountPoints = container.mount_points != null ? [
        for mount in container.mount_points : {
          sourceVolume  = mount.name
          containerPath = mount.container_path
          readOnly      = coalescelist([mount.read_only], [false])[0]
        }
      ] : []

      portMappings = container.expose_port ? [
        {
          containerPort = container.container_port
          hostPort      = container.container_port
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

      healthCheck = container.health_check == null ? null : {
        command     = container.health_check.command
        interval    = container.health_check.interval
        timeout     = container.health_check.timeout
        retries     = container.health_check.retries
        startPeriod = container.health_check.startPeriod
      }

      dependsOn = container.depend_on != null ? [
        for d in container.depend_on : {
          containerName = d.containerName
          condition     = d.condition
        }
      ] : []
    }
  ])
  
}

resource "aws_ecs_service" "this" {
  name            = "${var.name}-service"
  cluster         = var.ecs_cluster_id
  task_definition = aws_ecs_task_definition.this.arn
  desired_count   = var.desired_count
  launch_type     = "EC2"


  service_registries {
    registry_arn = aws_service_discovery_service.this.arn
  }

  # For load balancing, we assume that one of the containers (e.g. the first in the list) exposes a port.
  dynamic "load_balancer" {
    for_each = var.container_definitions[0].expose_port ? [1] : []
    content {
      target_group_arn = var.alb_target_group_arn
      container_name   = var.container_definitions[0].container_name
      container_port   = var.container_definitions[0].container_port
    }
  }

  deployment_minimum_healthy_percent = 0
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

resource "aws_appautoscaling_target" "ecs_target" {
  max_capacity       = 10  # Max number of tasks
  min_capacity       = 1   # Min number of tasks
  resource_id        = "service/${var.ecs_cluster_id}/${aws_ecs_service.this.name}"
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"
}

# Auto Scaling Policy - Scale up when CPU usage is high
resource "aws_appautoscaling_policy" "ecs_scale_up" {
  name               = "${var.name}-scale-up"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.ecs_target.resource_id
  scalable_dimension = aws_appautoscaling_target.ecs_target.scalable_dimension
  service_namespace  = aws_appautoscaling_target.ecs_target.service_namespace

  target_tracking_scaling_policy_configuration {
    target_value       = 70.0
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageCPUUtilization"
    }

    scale_in_cooldown  = 300
    scale_out_cooldown = 300
  }
}

# Auto Scaling Policy - Scale down when CPU usage is low
resource "aws_appautoscaling_policy" "ecs_scale_down" {
  name               = "${var.name}-scale-down"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.ecs_target.resource_id
  scalable_dimension = aws_appautoscaling_target.ecs_target.scalable_dimension
  service_namespace  = aws_appautoscaling_target.ecs_target.service_namespace

  target_tracking_scaling_policy_configuration {
    target_value       = 30.0
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageCPUUtilization"
    }

    scale_in_cooldown  = 300
    scale_out_cooldown = 300
  }
}

data "aws_caller_identity" "current" {}

resource "aws_iam_policy" "ecs_logging_policy" {
  name        = "${var.name}-ecs-logging-policy"
  description = "Allows ECS tasks to write logs to CloudWatch"
  policy      = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        Resource = "arn:aws:logs:${var.region}:${data.aws_caller_identity.current.account_id}:log-group:/ecs/${var.name}-logs:*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_logging_attachment" {
  role       = var.ecs_task_execution_role_name
  policy_arn = aws_iam_policy.ecs_logging_policy.arn
}