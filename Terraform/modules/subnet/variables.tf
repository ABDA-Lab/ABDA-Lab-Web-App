variable "vpc_id" {
  description = "VPC ID in which to create the subnet"
  type        = string
}

variable "cidr_block" {
  description = "CIDR block for the subnet"
  type        = string
}

variable "availability_zone" {
  description = "Availability zone for the subnet"
  type        = string
}

variable "name" {
  description = "Name tag for the subnet"
  type        = string
}

variable "map_public_ip_on_launch" {
  description = "Whether to automatically assign public IP addresses"
  type        = bool
  default     = false
}

variable "route_table_id" {
  description = "Route table ID to associate with the subnet"
  type        = string
}
