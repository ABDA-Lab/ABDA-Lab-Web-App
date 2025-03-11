output "service_name" {
  description = "The name of the created ECS service"
  value       = aws_ecs_service.this.name
}

output "task_definition_arn" {
  description = "ARN of the task definition"
  value       = aws_ecs_task_definition.this.arn
}

output "cloudmap_service_dns" {
  description = "DNS name for the Cloud Map service"
  value       = "${aws_service_discovery_private_dns_namespace.this.name}"
}



