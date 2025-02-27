resource "aws_ecs_service" "nginx_service" {
  name            = "${var.cluster_name}-nginx-service"
  cluster         = aws_ecs_cluster.this.id            # from your ECS cluster resource
  task_definition = aws_ecs_task_definition.nginx_task.arn
  desired_count   = 1
  launch_type     = "EC2"

  # Tie into an ALB target group if you want external access.
  # This assumes your ALB module exports a target_group_arn for port 80.
  load_balancer {
    target_group_arn = var.alb_target_group_arn       # e.g. module.alb.alb_tg_arn
    container_name   = "nginx"
    container_port   = 80
  }

  network_configuration {
    subnets          = var.subnet_ids                 # e.g. [module.subnet1.subnet_id, module.subnet2.subnet_id]
    security_groups  = [aws_security_group.ecs_instance_sg.id]
    assign_public_ip = false
  }

  # Make sure ECS waits for the ASG to finish before creating the service.
  depends_on = [
    aws_autoscaling_group.ecs_asg
  ]
}