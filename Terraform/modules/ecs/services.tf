locals {
  services_list = split(" ", var.services)
}

module "api_gateway_service" {
  source                       = "./service"
  name                         = local.services_list[0]
  ecr_repository_name          = local.services_list[0]
  image_tag                    = "latest"
  cpu                          = 128
  memory                       = 256
  desired_count                = 1
  container_port               = 8080
  expose_port                  = true
  ecs_cluster_id               = aws_ecs_cluster.this.id
  alb_target_group_arn         = var.alb_target_group_arn
  subnet_ids                   = var.subnet_ids
  security_group_id            = aws_security_group.ecs_instance_sg.id
  autoscaling_group_id         = aws_autoscaling_group.ecs_asg.id
  ecs_instance_tag             = "${var.cluster_name}-instance"
  ecs_task_execution_role_name = aws_iam_role.ecs_instance_role.name
  region                       = var.region
  env_vars = {
    ASPNETCORE_ENVIRONMENT = "Production"
    ASPNETCORE_URLS        = "http://+:8080"
    OCELOT_BASE_URL        = "http://localhost:8080"

    ROUTE_1_UPSTREAM_PATH    = "/api/user/{everything}"
    ROUTE_1_UPSTREAM_METHODS = "Get,Post,Put,Delete"
    ROUTE_1_DOWNSTREAM_HOST  = "user-microservice"
    ROUTE_1_DOWNSTREAM_PORT  = 5002
    ROUTE_1_DOWNSTREAM_PATH  = "/api/user/{everything}"

    ROUTE_2_UPSTREAM_PATH    = "/api/auth/{everything}"
    ROUTE_2_UPSTREAM_METHODS = "Get,Post,Put,Delete"
    ROUTE_2_DOWNSTREAM_HOST  = "identity-microservice"
    ROUTE_2_DOWNSTREAM_PORT  = 5001
    ROUTE_2_DOWNSTREAM_PATH  = "/api/auth/{everything}"

    ROUTE_3_UPSTREAM_PATH    = "/api/resource/{everything}"
    ROUTE_3_UPSTREAM_METHODS = "Get,Post,Put,Delete"
    ROUTE_3_DOWNSTREAM_HOST  = "resource-microservice"
    ROUTE_3_DOWNSTREAM_PORT  = 5003
    ROUTE_3_DOWNSTREAM_PATH  = "/api/resource/{everything}"

    ROUTE_4_UPSTREAM_PATH    = "/api/post/{everything}"
    ROUTE_4_UPSTREAM_METHODS = "Get,Post,Put,Delete"
    ROUTE_4_DOWNSTREAM_HOST  = "post-microservice"
    ROUTE_4_DOWNSTREAM_PORT  = 8091
    ROUTE_4_DOWNSTREAM_PATH  = "/api/v1/posts/{everything}"
  }
  volumes = []
}


module "user_service" {
  source                       = "./service"
  use_dockerhub                = false
  name                         = local.services_list[1]
  ecr_repository_name          = local.services_list[1]
  image_tag                    = "latest"
  cpu                          = 128
  memory                       = 256
  desired_count                = 1
  container_port               = 5002
  expose_port                  = false
  ecs_cluster_id               = aws_ecs_cluster.this.id
  alb_target_group_arn         = var.alb_target_group_arn
  subnet_ids                   = var.subnet_ids
  security_group_id            = aws_security_group.ecs_instance_sg.id
  autoscaling_group_id         = aws_autoscaling_group.ecs_asg.id
  ecs_instance_tag             = "${var.cluster_name}-instance"
  ecs_task_execution_role_name = aws_iam_role.ecs_instance_role.name
  region                       = var.region

  env_vars = {
    ASPNETCORE_ENVIRONMENT = "Production"
    ASPNETCORE_URLS        = "http://+:5002"
    DATABASE_HOST          = var.database_host
    DATABASE_PORT          = var.database_port
    DATABASE_NAME          = var.database_name
    DATABASE_USERNAME      = var.database_username
    DATABASE_PASSWORD      = var.database_password
    RABBITMQ_HOST          = "rabbit-mq"
    RABBITMQ_PORT          = "5672"
    RABBITMQ_USERNAME      = var.rabbitmq_username
    RABBITMQ_PASSWORD      = var.rabbitmq_password
    REDIS_HOST             = "redis"
    REDIS_PORT             = "6379"
    REDIS_PASSWORD         = var.redis_password
  }

  volumes = []
  health_check_dependency = [module.rabbitmq_service.ecs_service_dependency, module.redis_service.ecs_service_dependency]
}

module "rabbitmq_service" {
  source                       = "./service"
  name                         = "rabbitmq"
  ecr_repository_name          = "rabbit-mq"
  use_dockerhub                = true
  image_tag                    = "3-management"
  cpu                          = 128
  memory                       = 256
  desired_count                = 1
  container_port               = 5672
  expose_port                  = false
  ecs_cluster_id               = aws_ecs_cluster.this.id
  alb_target_group_arn         = var.alb_target_group_arn
  subnet_ids                   = var.subnet_ids
  security_group_id            = aws_security_group.ecs_instance_sg.id
  autoscaling_group_id         = aws_autoscaling_group.ecs_asg.id
  ecs_instance_tag             = "${var.cluster_name}-instance"
  ecs_task_execution_role_name = aws_iam_role.ecs_instance_role.name
  region                       = var.region

  env_vars = {
    RABBITMQ_DEFAULT_USER = var.rabbitmq_username
    RABBITMQ_DEFAULT_PASS = var.rabbitmq_password
  }

  health_check = {
    command     = ["CMD", "rabbitmqctl", "status"]
    interval    = 5
    timeout     = 3
    retries     = 5
    startPeriod = 0
  }

  volumes = [
    {
      name           = "rabbitmq-data"
      container_path = "/var/lib/rabbitmq"
    }
  ]
}

module "redis_service" {
  source              = "./service"
  name                = "redis"
  ecr_repository_name = "redis"
  use_dockerhub       = true
  image_tag           = "alpine"
  cpu                 = 128
  memory              = 256
  desired_count       = 1
  container_port       = 6379
  expose_port          = false
  alb_target_group_arn = var.alb_target_group_arn
  ecs_cluster_id    = aws_ecs_cluster.this.id
  subnet_ids        = var.subnet_ids
  security_group_id = aws_security_group.ecs_instance_sg.id
  autoscaling_group_id         = aws_autoscaling_group.ecs_asg.id
  ecs_instance_tag             = "${var.cluster_name}-instance"
  ecs_task_execution_role_name = aws_iam_role.ecs_instance_role.name
  region                       = var.region

  env_vars = {
  }

  command = [
    "redis-server",
    "--requirepass",
    var.redis_password
  ]

  health_check = {
    command     = ["CMD", "redis-cli", "-a", var.redis_password, "ping"]
    interval    = 5
    timeout     = 3
    retries     = 5
    startPeriod = 0
  }

  volumes = [
    {
      name           = "redis-data"
      container_path = "/data"
      host_path      = "/var/redis/data"
      read_only      = false
    }
  ]
}
