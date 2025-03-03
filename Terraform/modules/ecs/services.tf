locals {
  services_list = split(" ", var.services)
}

module "microservice" {
  source                       = "./service"
  name                         = "microservice"
  cpu                          = 512
  memory                       = 512
  desired_count                = 1
  ecs_cluster_id               = aws_ecs_cluster.this.id
  alb_target_group_arn         = var.alb_target_group_arn
  subnet_ids                   = var.subnet_ids
  security_group_id            = aws_security_group.ecs_instance_sg.id
  autoscaling_group_id         = aws_autoscaling_group.ecs_asg.id
  ecs_instance_tag             = "${var.cluster_name}-instance"
  ecs_task_execution_role_name = aws_iam_role.ecs_instance_role.name
  region                       = var.region
  vpc_id                       = var.vpc_id

  container_definitions = [
    {
      container_name      = local.services_list[0]
      name                = local.services_list[0] # Image name
      use_dockerhub       = false
      ecr_repository_name = local.services_list[0]
      image_tag           = "latest"
      command             = [] # No override command
      env_vars = {
        ASPNETCORE_ENVIRONMENT   = "Production"
        ASPNETCORE_URLS          = "http://+:8080"
        OCELOT_BASE_URL          = "http://localhost:8080"
        ROUTE_1_UPSTREAM_PATH    = "/api/user/{everything}"
        ROUTE_1_UPSTREAM_METHODS = "Get,Post,Put,Delete"
        ROUTE_1_DOWNSTREAM_HOST  = "localhost" #user-microservice
        ROUTE_1_DOWNSTREAM_PORT  = "5002"
        ROUTE_1_DOWNSTREAM_PATH  = "/api/user/{everything}"
        ROUTE_2_UPSTREAM_PATH    = "/api/auth/{everything}"
        ROUTE_2_UPSTREAM_METHODS = "Get,Post,Put,Delete"
        ROUTE_2_DOWNSTREAM_HOST  = "localhost" #identity-microservice"
        ROUTE_2_DOWNSTREAM_PORT  = "5001"
        ROUTE_2_DOWNSTREAM_PATH  = "/api/auth/{everything}"
        ROUTE_3_UPSTREAM_PATH    = "/api/resource/{everything}"
        ROUTE_3_UPSTREAM_METHODS = "Get,Post,Put,Delete"
        ROUTE_3_DOWNSTREAM_HOST  = "localhost" #resource-microservice"
        ROUTE_3_DOWNSTREAM_PORT  = "5003"
        ROUTE_3_DOWNSTREAM_PATH  = "/api/resource/{everything}"
        ROUTE_4_UPSTREAM_PATH    = "/api/post/{everything}"
        ROUTE_4_UPSTREAM_METHODS = "Get,Post,Put,Delete"
        ROUTE_4_DOWNSTREAM_HOST  = "localhost" #post-microservice"
        ROUTE_4_DOWNSTREAM_PORT  = "8091"
        ROUTE_4_DOWNSTREAM_PATH  = "/api/v1/posts/{everything}"

      }
      mount_points   = []
      expose_port    = true
      container_port = 8080
      health_check = {
        command : ["CMD", "curl", "-f", "http://localhost:8080/health"]
        interval    = 5
        timeout     = 3
        retries     = 5
        startPeriod = 0
      }
    },
    {
      container_name      = local.services_list[1]
      name                = local.services_list[1]
      use_dockerhub       = false
      ecr_repository_name = local.services_list[1]
      image_tag           = "latest"
      command             = []
      env_vars = {
        ASPNETCORE_ENVIRONMENT = "Production"
        ASPNETCORE_URLS        = "http://+:5002"
        DATABASE_HOST          = var.database_host
        DATABASE_PORT          = var.database_port
        DATABASE_NAME          = var.database_name
        DATABASE_USERNAME      = var.database_username
        DATABASE_PASSWORD      = var.database_password
        RABBITMQ_HOST          = module.utility_service.cloudmap_service_dns
        RABBITMQ_PORT          = "5672"
        RABBITMQ_USERNAME      = var.rabbitmq_username
        RABBITMQ_PASSWORD      = var.rabbitmq_password
        REDIS_HOST             = module.utility_service.cloudmap_service_dns
        REDIS_PORT             = "6379"
        REDIS_PASSWORD         = var.redis_password
      }
      mount_points   = []
      expose_port    = false
      container_port = 5002
      health_check = {
        command : ["CMD", "curl", "-f", "http://localhost:5002/api/user/health"]
        interval    = 5
        timeout     = 3
        retries     = 5
        startPeriod = 0
      }
    }
  ]
}


module "utility_service" {
  source                       = "./service"
  name                         = "utility-service"
  cpu                          = 256 # Combined CPU for both containers
  memory                       = 256 # Combined memory for both containers
  desired_count                = 1
  ecs_cluster_id               = aws_ecs_cluster.this.id
  alb_target_group_arn         = var.alb_target_group_arn # Not used if no container exposes a port
  subnet_ids                   = var.subnet_ids
  security_group_id            = aws_security_group.ecs_instance_sg.id
  autoscaling_group_id         = aws_autoscaling_group.ecs_asg.id
  ecs_instance_tag             = "${var.cluster_name}-instance"
  ecs_task_execution_role_name = aws_iam_role.ecs_instance_role.name
  region                       = var.region
  vpc_id                       = var.vpc_id

  container_definitions = [
    {
      container_name      = local.services_list[2]
      name                = local.services_list[2]
      use_dockerhub       = false
      ecr_repository_name = local.services_list[2]
      image_tag           = "latest"
      command             = ["redis-server", "--requirepass", var.redis_password]
      env_vars            = {}
      mount_points = [
        {
          name           = "redis-data"
          container_path = "/data"
          read_only      = false
        }
      ]
      expose_port    = true
      container_port = 6379
      health_check = {
        command     = ["CMD", "redis-cli", "-a", var.redis_password, "ping"]
        interval    = 5
        timeout     = 3
        retries     = 5
        startPeriod = 0
      }
    },
    {
      container_name      = local.services_list[3]
      name                = local.services_list[3]
      use_dockerhub       = false
      ecr_repository_name = local.services_list[3]
      image_tag           = "latest"
      command             = []
      env_vars = {
        RABBITMQ_DEFAULT_USER = var.rabbitmq_username
        RABBITMQ_DEFAULT_PASS = var.rabbitmq_password
      }
      mount_points   = [] # You can define container-level mount points if needed
      expose_port    = true
      container_port = 5672
      health_check = {
        command     = ["CMD", "rabbitmqctl", "status"]
        interval    = 5
        timeout     = 3
        retries     = 5
        startPeriod = 0
      }
    }
  ]
}
