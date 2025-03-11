variable "cidr_block" {
  description = "CIDR block for the VPC"
  type        = string
}

variable "name" {
  description = "Name tag for the VPC"
  type        = string
}

variable "region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "us-east-1"
}

variable "private_subnet_ids" {
  type        = list(string)
  description = "List of private subnet IDs where VPC endpoints will be deployed"
}

variable "public_subnet_ids" {
  type        = list(string)
  description = "List of private subnet IDs where VPC endpoints will be deployed"
}