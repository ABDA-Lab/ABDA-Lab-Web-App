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


module "subnet1" {
  source            = "./modules/subnet"
  vpc_id            = module.vpc.vpc_id
  cidr_block        = "10.0.1.0/24"
  availability_zone = var.availability_zone_1
  name              = "subnet-1"
}

module "subnet2" {
  source            = "./modules/subnet"
  vpc_id            = module.vpc.vpc_id
  cidr_block        = "10.0.2.0/24"
  availability_zone = var.availability_zone_2
  name              = "subnet-2"
}

resource "aws_route_table_association" "subnet_association" {
  for_each      = toset([module.subnet1.subnet_id, module.subnet2.subnet_id])
  subnet_id     = each.value
  route_table_id = module.vpc.public_rt_id
}

module "alb" {
  source             = "./modules/alb"
  load_balancer_name = var.alb_name
  subnet_ids         = [module.subnet1.subnet_id, module.subnet2.subnet_id]
  vpc_id             = module.vpc.vpc_id
  target_port        = var.target_port
  listener_port      = var.listener_port
  health_check_path  = var.health_check_path
}

module "ecs" {
  source                = "./modules/ecs"
  cluster_name          = var.cluster_name
  vpc_id                = module.vpc.vpc_id
  ecs_ami_id            = var.ecs_ami_id
  instance_type         = var.instance_type
  subnet_ids            = [module.subnet1.subnet_id, module.subnet2.subnet_id]
  desired_capacity      = var.desired_capacity
  max_size              = var.max_size
  min_size              = var.min_size
  container_port        = var.container_port
  alb_security_group_id = module.alb.alb_sg_id
}