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
  description = "Port for the target group"
  type        = number
  default     = 80
}

variable "listener_port" {
  description = "Listener port for the ALB (HTTP)"
  type        = number
  default     = 80
}

variable "health_check_path" {
  description = "Path for health check requests"
  type        = string
  default     = "/"
}

variable "certificate_arn" {
  description = "ACM Certificate ARN for the HTTPS listener. Leave empty for HTTP-only."
  type        = string
  default     = ""
}
