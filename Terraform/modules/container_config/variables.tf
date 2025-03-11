variable "services" {
  description = "Space-separated list of service names"
  type        = string
}

variable "database" {
  description = "Database connection details as a space-separated string (host port name username password repeated)"
  type        = string
  default     = ""
}

variable "jwt_key" {
  description = "JWT key for the identity microservice"
  type        = string
  default     = ""
}

variable "rabbitmq_username" {
  description = "RabbitMQ username"
  type        = string
}

variable "rabbitmq_password" {
  description = "RabbitMQ password"
  type        = string
  sensitive   = true
}

variable "redis_password" {
  description = "Redis password"
  type        = string
  sensitive   = true
}
