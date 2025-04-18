variable "origin_domain_name" {
  description = "The origin domain name for CloudFront"
  type        = string
}

variable "origin_path" {
  description = "The origin path to append to the domain name"
  type        = string
}

variable "set_cookie_lambda_arn" {
  description = "The qualified ARN of the Lambda@Edge function for /set-cookie behavior"
  type        = string
}

variable "abda_lab_public_key_group" {
  description = "Public key group for ABDA Lab inform of Pem"
  type = string
}

variable "bucket_secret_referer" {
  description = "Custom header referer for the bucket"
  type = string
}
