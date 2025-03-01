module "lambda_edge" {
  source = "./modules/lambda_edge"
}

module "cloudfront" {
  source                    = "./modules/cloudfront"
  origin_domain_name        = var.origin_domain_name
  origin_path               = var.origin_path
  set_cookie_lambda_arn     = module.lambda_edge.lambda_function_qualified_arn
  abda_lab_public_key_group = var.abda_lab_public_key_group
  bucket_secret_referer     = var.bucket_secret_referer
}

module "key_vault_cloudfront_public_key_id" {
  source         = "./modules/key_vault"
  parameter_name = "/cloudfront/public-key-id"
  value          = module.cloudfront.public_key_encoded
  description    = "Cloudfront public key ID"
}

module "key_vault_lambda_edge_secret" {
  source         = "./modules/key_vault"
  parameter_name = "/lambda/edge/secret"
  value          = var.lambda_edge_secret
  description    = "Secret to sign the cookie generated by cloudfront"
}

module "vpc" {
  source     = "./modules/vpc"
  cidr_block = var.vpc_cidr
  name       = var.vpc_name
}

# Create Public Subnets for the ALB (and NAT Gateway)
module "public_subnet1" {
  source                  = "./modules/subnet"
  vpc_id                  = module.vpc.vpc_id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = var.availability_zone_1
  name                    = "public-subnet-1"
  map_public_ip_on_launch = true
  route_table_id          = module.vpc.public_rt_id
}

module "public_subnet2" {
  source                  = "./modules/subnet"
  vpc_id                  = module.vpc.vpc_id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = var.availability_zone_2
  name                    = "public-subnet-2"
  map_public_ip_on_launch = true
  route_table_id          = module.vpc.public_rt_id
}

# Create Private Subnets for ECS container instances
module "private_subnet1" {
  source                  = "./modules/subnet"
  vpc_id                  = module.vpc.vpc_id
  cidr_block              = "10.0.101.0/24"
  availability_zone       = var.availability_zone_1
  name                    = "private-subnet-1"
  map_public_ip_on_launch = false
  route_table_id          = module.vpc.private_rt_id
}

module "private_subnet2" {
  source                  = "./modules/subnet"
  vpc_id                  = module.vpc.vpc_id
  cidr_block              = "10.0.102.0/24"
  availability_zone       = var.availability_zone_2
  name                    = "private-subnet-2"
  map_public_ip_on_launch = false
  route_table_id          = module.vpc.private_rt_id
}

# Create NAT Gateway for private subnets outbound access
resource "aws_eip" "nat" {
  associate_with_private_ip = true
}

resource "aws_nat_gateway" "this" {
  allocation_id = aws_eip.nat.id
  subnet_id     = module.public_subnet1.subnet_id

  depends_on = [module.public_subnet1]
}

# Update the Private Route Table to use the NAT Gateway
resource "aws_route" "private_nat" {
  route_table_id         = module.vpc.private_rt_id
  destination_cidr_block = "0.0.0.0/0"
  nat_gateway_id         = aws_nat_gateway.this.id
}

module "alb" {
  source             = "./modules/alb"
  load_balancer_name = var.alb_name
  subnet_ids         = [module.public_subnet1.subnet_id, module.public_subnet2.subnet_id]
  vpc_id             = module.vpc.vpc_id
  target_port        = var.target_port
  listener_port      = var.listener_port
  health_check_path  = var.health_check_path
  certificate_arn    = var.certificate_arn # Supply certificate ARN for HTTPS; leave empty for HTTP-only
}

module "ecs" {
  source        = "./modules/ecs"
  cluster_name  = var.cluster_name
  vpc_id        = module.vpc.vpc_id
  ecs_ami_id    = var.ecs_ami_id
  instance_type = var.instance_type
  # Use the private subnets for ECS tasks
  region                = var.region
  subnet_ids            = [module.private_subnet1.subnet_id, module.private_subnet2.subnet_id]
  desired_capacity      = var.desired_capacity
  max_size              = var.max_size
  min_size              = var.min_size
  container_port        = var.container_port
  alb_security_group_id = module.alb.alb_sg_id
  alb_target_group_arn  = module.alb.target_group_arn
  services              = var.services
  database_host         = var.database_host
  database_name         = var.database_name
  database_username     = var.database_username
  database_password     = var.database_password
  database_port         = var.database_port
  redis_password        = var.redis_password
  rabbitmq_password     = var.rabbitmq_password
  rabbitmq_username     = var.rabbitmq_username
}