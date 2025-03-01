locals {
  services_list = split(" ", var.services)
}

module "ecs_service" {
  source               = "./service"
  name                 = local.services_list[0]
  ecr_repository_name  = local.services_list[0]
  image_tag            = "latest"
  cpu                  = 256
  memory               = 512
  desired_count        = 2
  container_port       = 80 
  expose_port          = true
  ecs_cluster_id       = aws_ecs_cluster.this.id
  alb_target_group_arn = var.alb_target_group_arn
  subnet_ids           = var.subnet_ids
  security_group_id    = aws_security_group.ecs_instance_sg.id
  autoscaling_group_id = aws_autoscaling_group.ecs_asg.id
  ecs_instance_tag     = "${var.cluster_name}-instance"
  env_vars = {
    "APP_VERSION" = "1.0.0"
  }
  volumes = []  # Adjust volumes if necessary
}
