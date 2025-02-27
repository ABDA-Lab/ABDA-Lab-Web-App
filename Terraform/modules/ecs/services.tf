# ECS Task Definition for nginx using awsvpc network mode
resource "aws_ecs_task_definition" "nginx" {
  family                   = "${var.cluster_name}-nginx"
  network_mode             = "awsvpc"
  requires_compatibilities = ["EC2"]
  cpu                      = "256"
  memory                   = "512"

  container_definitions = jsonencode([
    {
      name      = "nginx"
      image     = "nginx:latest"
      essential = true
      portMappings = [
        {
          containerPort = 80,
          hostPort      = 80,
          protocol      = "tcp"
        }
      ]
    }
  ])
}

# ECS Service for the nginx task
resource "aws_ecs_service" "nginx" {
  name            = "${var.cluster_name}-nginx-service"
  cluster         = aws_ecs_cluster.this.id
  task_definition = aws_ecs_task_definition.nginx.arn
  desired_count   = 1
  launch_type     = "EC2"

  load_balancer {
    target_group_arn = var.alb_target_group_arn
    container_name   = "nginx"
    container_port   = 80
  }

  deployment_minimum_healthy_percent = 50
  deployment_maximum_percent         = 200

  network_configuration {
    subnets          = var.subnet_ids
    security_groups  = [aws_security_group.ecs_instance_sg.id]
    assign_public_ip = false
  }

  # Ensure the service waits until the ECS instances are available
  depends_on = [aws_autoscaling_group.ecs_asg]
}
