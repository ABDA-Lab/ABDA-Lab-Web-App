resource "aws_ssm_parameter" "stored_key" {
  name      = var.parameter_name
  type      = "SecureString"
  value     = var.value
  description = var.description
}