
module "microservice" {
  source = "./service"
  name   = "microservice"
  cpu    = 1000
  memory = 800
  desired_count = 1
  ecs_cluster_id = aws_ecs_cluster.this.id
  alb_target_group_arns = var.alb_target_group_arns
  subnet_ids = var.subnet_ids
  security_group_id = aws_security_group.ecs_instance_sg.id
  autoscaling_group_id = aws_autoscaling_group.ecs_asg.id
  ecs_instance_tag = "${var.cluster_name}-instance"
  ecs_task_execution_role_name = aws_iam_role.ecs_instance_role.name
  region = var.region
  vpc_id = var.vpc_id
  depends_on = [
    module.utility_service,
  ]
  container_definitions = [
    var.container_definitions.api_gateway,
    var.container_definitions.user_microservice,
    var.container_definitions.identity_microservice
  ]
}

module "utility_service" {
  source = "./service"
  name   = "utility-service"
  cpu    = 700
  memory = 512
  desired_count = 1
  ecs_cluster_id = aws_ecs_cluster.this.id
  subnet_ids = var.subnet_ids
  security_group_id = aws_security_group.ecs_instance_sg.id
  autoscaling_group_id = aws_autoscaling_group.ecs_asg.id
  ecs_instance_tag = "${var.cluster_name}-instance"
  ecs_task_execution_role_name = aws_iam_role.ecs_instance_role.name
  region = var.region
  vpc_id = var.vpc_id
  depends_on = [
  ]
  container_definitions = [
    var.container_definitions.redis_service,
    var.container_definitions.rabbitmq_service
  ]
}
