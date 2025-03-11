output "container_definitions" {
  description = "Map of container definitions for services"
  value       = local.container_definitions
}

output "exposed_containers" {
  description = "Map of containers that expose ports with their container ports"
  value       = local.exposed_containers
}
