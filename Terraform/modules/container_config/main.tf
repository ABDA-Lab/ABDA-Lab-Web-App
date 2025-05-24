locals {
  # Split the services and database strings into lists.
  services_list = split(" ", var.services)
  database_list = split(" ", var.database)

  # Create a list of databases from the provided string.
  databases = [
    for i in range(length(local.database_list) / 5) : {
      host     = local.database_list[i * 5]
      port     = local.database_list[i * 5 + 1]
      name     = local.database_list[i * 5 + 2]
      username = local.database_list[i * 5 + 3]
      password = local.database_list[i * 5 + 4]
    }
  ]

  # Define the container definitions.
  container_definitions = {
    api_gateway = {
      container_name      = local.services_list[0]
      name                = local.services_list[0]
      use_dockerhub       = false
      ecr_repository_name = local.services_list[0]
      image_tag           = "latest"
      command             = []
      env_vars = {
        ASPNETCORE_ENVIRONMENT   = "Production"
        ASPNETCORE_URLS          = "http://+:8080"
        OCELOT_BASE_URL          = "http://localhost:8080"
        ROUTE_1_UPSTREAM_PATH    = "/api/user/{everything}"
        ROUTE_1_UPSTREAM_METHODS = "Get,Post,Put,Delete"
        ROUTE_1_DOWNSTREAM_HOST  = "127.0.0.1"
        ROUTE_1_DOWNSTREAM_PORT  = "5002"
        ROUTE_1_DOWNSTREAM_PATH  = "/api/user/{everything}"
        ROUTE_2_UPSTREAM_PATH    = "/api/auth/{everything}"
        ROUTE_2_UPSTREAM_METHODS = "Get,Post,Put,Delete"
        ROUTE_2_DOWNSTREAM_HOST  = "127.0.0.1"
        ROUTE_2_DOWNSTREAM_PORT  = "5001"
        ROUTE_2_DOWNSTREAM_PATH  = "/api/auth/{everything}"
        ROUTE_3_UPSTREAM_PATH    = "/api/resource/{everything}"
        ROUTE_3_UPSTREAM_METHODS = "Get,Post,Put,Delete"
        ROUTE_3_DOWNSTREAM_HOST  = "127.0.0.1"
        ROUTE_3_DOWNSTREAM_PORT  = "5003"
        ROUTE_3_DOWNSTREAM_PATH  = "/api/resource/{everything}"
        ROUTE_4_UPSTREAM_PATH    = "/api/post/{everything}"
        ROUTE_4_UPSTREAM_METHODS = "Get,Post,Put,Delete"
        ROUTE_4_DOWNSTREAM_HOST  = "127.0.0.1"
        ROUTE_4_DOWNSTREAM_PORT  = "8091"
        ROUTE_4_DOWNSTREAM_PATH  = "/api/v1/posts/{everything}"
      }
      mount_points   = []
      expose_port    = true
      container_port = 8080
      health_check = {
        command     = ["CMD", "curl", "-f", "http://localhost:8080/health"]
        interval    = 5
        timeout     = 3
        retries     = 5
        startPeriod = 0
      }
    }

    user_microservice = {
      container_name      = local.services_list[3]
      name                = local.services_list[3]
      use_dockerhub       = false
      ecr_repository_name = local.services_list[3]
      image_tag           = "latest"
      command             = []
      env_vars = {
        ASPNETCORE_ENVIRONMENT = "Production"
        ASPNETCORE_URLS        = "http://+:5002"
        DATABASE_HOST          = local.databases[0].host
        DATABASE_PORT          = local.databases[0].port
        DATABASE_NAME          = "AbdaUserService"
        DATABASE_USERNAME      = local.databases[0].username
        DATABASE_PASSWORD      = local.databases[0].password
        RABBITMQ_HOST          = "localhost"
        RABBITMQ_PORT          = "5672"
        RABBITMQ_USERNAME      = var.rabbitmq_username
        RABBITMQ_PASSWORD      = var.rabbitmq_password
        REDIS_HOST             = "localhost"
        REDIS_PASSWORD         = var.redis_password
        REDIS_PORT             = "6379"
      }
      mount_points   = []
      expose_port    = false
      container_port = 5002
      health_check = {
        command     = ["CMD", "curl", "-f", "http://localhost:5002/api/user/health"]
        interval    = 5
        timeout     = 3
        retries     = 5
        startPeriod = 0
      }
    }

    identity_microservice = {
      container_name      = local.services_list[4]
      name                = local.services_list[4]
      use_dockerhub       = false
      ecr_repository_name = local.services_list[4]
      image_tag           = "latest"
      command             = []
      env_vars = {
        ASPNETCORE_ENVIRONMENT = "Production"
        DATABASE_HOST          = local.databases[0].host
        DATABASE_PORT          = local.databases[0].port
        DATABASE_NAME          = "AbdaIdentityService"
        DATABASE_USERNAME      = local.databases[0].username
        DATABASE_PASSWORD      = local.databases[0].password
        ASPNETCORE_URLS        = "http://+:5001"
        JWT_ISSUER             = "IdentityService"
        JWT_AUDIENCE           = "AllMicroservices"
        JWT_KEY                = var.jwt_key
        RABBITMQ_HOST          = "localhost"
        RABBITMQ_PORT          = "5672"
        RABBITMQ_USERNAME      = var.rabbitmq_username
        RABBITMQ_PASSWORD      = var.rabbitmq_password
        REDIS_HOST             = "localhost"
        REDIS_PASSWORD         = var.redis_password
        REDIS_PORT             = "6379"
      }
      mount_points   = []
      expose_port    = false
      container_port = 5001
      health_check = {
        command     = ["CMD", "curl", "-f", "http://localhost:5001/api/auth/health"]
        interval    = 5
        timeout     = 3
        retries     = 5
        startPeriod = 0
      }
    }
 
   

    redis_service = {
      container_name      = local.services_list[1]
      name                = local.services_list[1]
      use_dockerhub       = false
      ecr_repository_name = local.services_list[1]
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
    }

    rabbitmq_service = {
      container_name      = local.services_list[2]
      name                = local.services_list[2]
      use_dockerhub       = false
      ecr_repository_name = local.services_list[2]
      image_tag           = "latest"
      command             = []
      env_vars = {
        RABBITMQ_DEFAULT_USER = var.rabbitmq_username
        RABBITMQ_DEFAULT_PASS = var.rabbitmq_password
      }
      mount_points = [
        {
          name           = "rabbitmq-data"
          container_path = "/var/lib/rabbitmq"
          read_only      = false
        }
      ]
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
  }

  # Compute the map of exposed containers from the definitions.
  exposed_containers = {
    for name, def in local.container_definitions : name => {
      container_port = def.container_port
    }
    if def.expose_port
  }
}
