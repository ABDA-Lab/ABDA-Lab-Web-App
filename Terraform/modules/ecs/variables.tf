variable "cluster_name" {
  description = "Name of the ECS cluster"
  type        = string
  default     = "ecs-cluster"
}

variable "vpc_id" {
  description = "VPC ID where ECS instances will be launched"
  type        = string
}

variable "ecs_ami_id" {
  description = "AMI ID for an ECS-optimized instance"
  type        = string
}

variable "instance_type" {
  description = "EC2 instance type for ECS container instances"
  type        = string
  default     = "t2.micro"  # For free tier eligibility
}

variable "subnet_ids" {
  description = "List of subnet IDs where ECS instances will be launched"
  type        = list(string)
}

variable "desired_capacity" {
  description = "Desired capacity for the ECS Auto Scaling Group"
  type        = number
  default     = 2
}

variable "max_size" {
  description = "Maximum number of ECS container instances in the ASG. Increase this if you require more instances to run a larger number of container tasks."
  type        = number
  default     = 3
}

variable "min_size" {
  description = "Minimum number of ECS container instances in the ASG"
  type        = number
  default     = 1
}
