variable "vpc_id" {
  description = "VPC ID in which to create the subnet"
  type        = string
}

variable "cidr_block" {
  description = "CIDR block for the subnet"
  type        = string
}

variable "availability_zone" {
  description = "The availability zone for the subnet"
  type        = string
}

variable "name" {
  description = "Name tag for the subnet"
  type        = string
}
