resource "aws_ecs_task_definition" "nginx_task" {
  family                   = "${var.cluster_name}-nginx"
  network_mode             = "awsvpc"
  requires_compatibilities = ["EC2"]
  cpu                      = 256
  memory                   = 512

  container_definitions = jsonencode([
    {
      name      = "nginx"
      image     = "nginx:latest"
      essential = true
      portMappings = [
        {
          containerPort = 80
        }
      ]
    }
  ])
}
