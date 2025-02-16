variable "value" {
  description = "The public key (encoded) to be stored in SSM Parameter Store."
  type        = string
}

variable "parameter_name" {
  description = "The name (path) for the SSM parameter (e.g., /cloudfront/public-key)."
  type        = string
}

variable "description" {
  description = "The description"
  type        = string
}
