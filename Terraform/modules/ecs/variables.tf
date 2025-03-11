variable "cluster_name" {
  description = "Name of the ECS cluster"
  type        = string
}

variable "vpc_id" {
  description = "VPC ID where ECS is deployed"
  type        = string
}

variable "subnet_ids" {
  description = "List of private subnet IDs for ECS container instances"
  type        = list(string)
}

variable "ecs_ami_id" {
  description = "ECS-optimized AMI ID"
  type        = string
}

variable "instance_type" {
  description = "EC2 instance type for ECS container instances"
  type        = string
}

variable "desired_capacity" {
  description = "Desired number of ECS container instances"
  type        = number
}

variable "max_size" {
  description = "Maximum number of ECS container instances"
  type        = number
}

variable "min_size" {
  description = "Minimum number of ECS container instances"
  type        = number
}

variable "container_port" {
  description = "Port on which the container listens"
  type        = number
}

variable "alb_security_group_id" {
  description = "Security Group ID of the ALB"
  type        = string
}


variable "alb_target_group_arns" {
  description = <<EOT
Map of container_name => ALB target group ARN.

Example:
{
  "gateway"  = "arn:aws:elasticloadbalancing:us-east-1:1234:targetgroup/gateway-tg/abcd1234",
  "redis"    = "arn:aws:elasticloadbalancing:us-east-1:1234:targetgroup/redis-tg/abcd2345"
  ...
}
EOT
  type    = map(string)
  default = {}
}


variable "region" {
  description = "The AWS region where the ECS cluster is deployed"
  type        = string
}

variable "container_definitions" {
  description = "Map of container definitions for the service"
  type        = map(any)
}