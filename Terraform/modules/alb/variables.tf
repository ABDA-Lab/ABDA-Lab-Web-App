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

variable "health_check_path" {
  description = "Path for health check requests"
  type        = string
  default     = "/health"
}

variable "certificate_arn" {
  description = "ACM Certificate ARN for the HTTPS listener. Leave empty for HTTP-only."
  type        = string
  default     = ""
}

variable "exposed_containers" {
  description = "Map of exposed containers with their ports"
  type = map(object({
    container_port = number
  }))
  default = {}
}