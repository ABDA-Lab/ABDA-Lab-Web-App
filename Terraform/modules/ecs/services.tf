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
  container_port       = 8080
  expose_port          = true
  ecs_cluster_id       = aws_ecs_cluster.this.id
  alb_target_group_arn = var.alb_target_group_arn
  subnet_ids           = var.subnet_ids
  security_group_id    = aws_security_group.ecs_instance_sg.id
  autoscaling_group_id = aws_autoscaling_group.ecs_asg.id
  ecs_instance_tag     = "${var.cluster_name}-instance"
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
