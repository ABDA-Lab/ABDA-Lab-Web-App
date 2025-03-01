variable "name" {
  description = "Name of the service"
  type        = string
}

variable "ecr_repository_name" {
  description = "ECR repository name"
  type        = string
}

variable "image_tag" {
  description = "Image tag to deploy"
  type        = string
  default     = "latest"
}

variable "cpu" {
  description = "CPU units to allocate"
  type        = number
  default     = 256
}

variable "memory" {
  description = "Memory in MB to allocate"
  type        = number
  default     = 512
}

variable "desired_count" {
  description = "Number of tasks to run"
  type        = number
  default     = 1
}

variable "container_port" {
  description = "Container port to expose"
  type        = number
  default     = 80
}

variable "expose_port" {
  description = "Whether to expose the port to ALB"
  type        = bool
  default     = true
}

variable "ecs_cluster_id" {
  description = "ECS cluster ID"
  type        = string
}

variable "alb_target_group_arn" {
  description = "ALB Target Group ARN"
  type        = string
}

variable "subnet_ids" {
  description = "List of subnets for the service"
  type        = list(string)
}

variable "security_group_id" {
  description = "Security Group ID for ECS tasks"
  type        = string
}

variable "autoscaling_group_id" {
  description = "Autoscaling group ID that ECS service depends on"
  type        = string
}

variable "env_vars" {
  description = "Map of environment variables for the container"
  type        = map(string)
  default     = {}
}

variable "volumes" {
  description = "List of volumes for the container"
  type = list(object({
    name           = string
    container_path = string
    host_path      = optional(string)
    read_only      = optional(bool, false)
  }))
  default = []
}

variable "ecs_instance_tag" {
  description = "The instance tag for ECS instances"
  type        = string
}

variable "region" {
  description = "The AWS region where the ECS cluster is deployed"
  type        = string
}

variable "ecs_task_execution_role_name" {
  description = "The name of the IAM role used by ECS task execution"
  type        = string
}