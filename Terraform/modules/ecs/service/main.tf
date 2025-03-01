# Ensure ECR repository exists
data "aws_ecr_repository" "app" {
  name = var.ecr_repository_name
}

# Ensure all volume directories exist using AWS SSM
resource "aws_ssm_document" "ensure_volumes" {
  name          = "EnsureVolumeDirectories"
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
              "chown -R 1000:1000 ${volume.host_path}",
              "chmod -R 777 ${volume.host_path}" 
            ] if volume.host_path != null
          ])
        }
      }
    ]
  })
}


# Run the SSM command to create the directories on all ECS instances
resource "aws_ssm_association" "run_ensure_volumes" {
  name             = aws_ssm_document.ensure_volumes.name
  targets {
    key    = "tag:Name"
    values = ["ecs-instance"]  # Replace with your EC2 instance tag
  }
}

# ECS Task Definition
resource "aws_ecs_task_definition" "this" {
  family                   = "${var.name}-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["EC2"]
  cpu                      = var.cpu
  memory                   = var.memory

  # Define volumes if provided
  dynamic "volume" {
    for_each = var.volumes
    content {
      name      = volume.value["name"]
      host_path = lookup(volume.value, "host_path", null)
    }
  }

  container_definitions = jsonencode([
    {
      name      = var.name
      image     = "${data.aws_ecr_repository.app.repository_url}:${var.image_tag}"
      essential = true

      # Environment variables
      environment = [for key, value in var.env_vars : { name = key, value = value }]

      # Volume mounts
      mountPoints = [for volume in var.volumes : {
        sourceVolume  = volume.name
        containerPath = volume.container_path
        readOnly      = lookup(volume, "read_only", false)
      }]

      portMappings = var.expose_port ? [
        {
          containerPort = var.container_port
          hostPort      = var.container_port
          protocol      = "tcp"
        }
      ] : []
    }
  ])
}

# ECS Service
resource "aws_ecs_service" "this" {
  name            = "${var.name}-service"
  cluster         = var.ecs_cluster_id
  task_definition = aws_ecs_task_definition.this.arn
  desired_count   = var.desired_count
  launch_type     = "EC2"

  dynamic "load_balancer" {
    for_each = var.expose_port ? [1] : []
    content {
      target_group_arn = var.alb_target_group_arn
      container_name   = var.name
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
    aws_ssm_association.run_ensure_volumes  # Ensure volume directories exist before ECS starts
  ]

  timeouts {
    delete = "30m"
  }
}
