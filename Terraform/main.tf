module "lambda_edge" {
  source = "./modules/lambda_edge"
}

module "cloudfront" {
  source                    = "./modules/cloudfront"
  origin_domain_name        = var.origin_domain_name
  origin_path               = var.origin_path
  set_cookie_lambda_arn     = module.lambda_edge.lambda_function_qualified_arn
  abda_lab_public_key_group = var.abda_lab_public_key_group
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

