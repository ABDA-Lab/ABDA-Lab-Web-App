variable "name" {
  description = "Name of the service"
  type        = string
}

variable "cpu" {
  description = "CPU units to allocate to the task"
  type        = number
  default     = 256
}

variable "memory" {
  description = "Memory (in MB) to allocate to the task"
  type        = number
  default     = 512
}

variable "desired_count" {
  description = "Number of tasks to run"
  type        = number
  default     = 1
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



variable "ecs_instance_tag" {
  description = "The instance tag for ECS instances"
  type        = string
}

variable "region" {
  description = "The AWS region where the ECS cluster is deployed"
  type        = string
}

variable "container_definitions" {
  description = "List of container definitions to be merged into one ECS task."
  type = list(object({
    container_name       = string
    name                 = string       # image name
    use_dockerhub        = optional(bool, false)
    ecr_repository_name  = string
    image_tag            = string
    command              = optional(list(string), [])
    env_vars             = map(string)
    mount_points         = optional(list(object({
      name           = string
      container_path = string
      read_only      = optional(bool, false)
    })), [])
    expose_port          = bool
    container_port       = number
    health_check         = optional(object({
      command     = list(string)
      interval    = number
      timeout     = number
      retries     = number
      startPeriod = number
    }), null)
    depend_on = optional(list(object({
      containerName = string
      condition     = string
    })), [])
  }))
  default = []
}


variable "vpc_id" {
  description = "VPC ID where the ALB is deployed"
  type        = string
}

variable "ecs_task_execution_role_name" {
  description = "The name of the IAM role used by ECS task execution"
  type        = string
}
