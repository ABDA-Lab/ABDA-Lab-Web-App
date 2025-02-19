variable "load_balancer_name" {
  description = "Name for the Application Load Balancer"
  type        = string
}

variable "subnet_ids" {
  description = "List of subnet IDs where the ALB will be deployed"
  type        = list(string)
}

variable "vpc_id" {
  description = "VPC ID where the ALB is deployed"
  type        = string
}

variable "target_port" {
  description = "Port for the target group (where the registered targets will receive traffic)"
  type        = number
  default     = 80
}

variable "listener_port" {
  description = "Port for the ALB listener"
  type        = number
  default     = 80
}

variable "health_check_path" {
  description = "Path for health check requests"
  type        = string
  default     = "/"
}
