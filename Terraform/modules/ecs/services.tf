resource "aws_ecs_service" "nginx_service" {
  name            = "${var.cluster_name}-nginx-service"
  cluster         = aws_ecs_cluster.this.id
  task_definition = aws_ecs_task_definition.nginx_task.arn
  desired_count   = 1
  launch_type     = "EC2"


  load_balancer {
    target_group_arn = var.alb_target_group_arn       
    container_name   = "nginx"
    container_port   = 80
  }

  network_configuration {
    subnets          = var.subnet_ids                 
    security_groups  = [aws_security_group.ecs_instance_sg.id]
    assign_public_ip = false
  }

  depends_on = [
    aws_autoscaling_group.ecs_asg
  ]
}