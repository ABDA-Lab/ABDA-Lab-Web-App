variable "origin_domain_name" {
  description = "The origin's domain name (Wasabi endpoint)"
  type        = string
}

variable "origin_path" {
  description = "The origin path to append to the domain name"
  type        = string
}

variable "abda_lab_public_key_group" {
  description = "CloudFront public key group (PEM formatted)"
  type        = string
}

variable "lambda_edge_secret" {
  description = "Secret used to sign the cookie generated by CloudFront"
  type        = string
}

variable "bucket_secret_referer" {
  description = "Secret used to sign the cookie generated by CloudFront"
  type        = string
}

variable "region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "us-east-1"
}

variable "availability_zone_1" {
  description = "First Availability Zone"
  type        = string
  default     = "us-east-1a"
}

variable "availability_zone_2" {
  description = "Second Availability Zone"
  type        = string
  default     = "us-east-1b"
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "vpc_name" {
  description = "Name tag for the VPC"
  type        = string
  default     = "khang-vpc"
}

variable "cluster_name" {
  description = "Name of the ECS cluster"
  type        = string
  default     = "ecs-cluster"
}

variable "ecs_ami_id" {
  description = "AMI ID for an ECS-optimized instance. For us-east-1, a common default is ami-0238889b768139d9b."
  type        = string
  default     = "ami-0238889b768139d9b"
}

variable "instance_type" {
  description = "EC2 instance type for ECS container instances. 't2.micro' is free tier eligible."
  type        = string
  default     = "t2.micro"
}

variable "desired_capacity" {
  description = "Desired number of ECS container instances"
  type        = number
  default     = 2
}

variable "max_size" {
  description = "Maximum number of ECS container instances in the ASG"
  type        = number
  default     = 3
}

variable "min_size" {
  description = "Minimum number of ECS container instances in the ASG"
  type        = number
  default     = 1
}

variable "alb_name" {
  description = "Name for the Application Load Balancer"
  type        = string
  default     = "khang-alb"
}

variable "target_port" {
  description = "Port for the target group where the registered targets serve content"
  type        = number
  default     = 80
}

variable "listener_port" {
  description = "Port for the ALB listener"
  type        = number
  default     = 80
}

variable "health_check_path" {
  description = "Path used for ALB health checks"
  type        = string
  default     = "/"
}

variable "container_port" {
  description = "Port on which the container listens (used in ECS instance SG ingress rule)"
  type        = number
  default     = 80
}

variable "certificate_arn" {
  description = "ARN of the ACM certificate for the ALB HTTPS listener. Leave empty for HTTP-only mode."
  type        = string
  default     = ""
}
