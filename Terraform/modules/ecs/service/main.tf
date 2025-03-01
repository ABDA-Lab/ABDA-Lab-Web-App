data "aws_ecr_repository" "app" {
  name = var.ecr_repository_name
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
      name = volume.value["name"]
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
        sourceVolume = volume.name
        containerPath = volume.container_path
        readOnly = lookup(volume, "read_only", false)
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

  depends_on = [var.autoscaling_group_id]

  timeouts {
    delete = "30m"
  }
}
