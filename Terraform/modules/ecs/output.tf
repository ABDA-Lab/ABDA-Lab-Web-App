output "ecs_cluster_id" {
  description = "ID of the ECS cluster"
  value       = aws_ecs_cluster.this.id
}

output "asg_id" {
  description = "ID of the Auto Scaling Group for ECS instances"
  value       = aws_autoscaling_group.ecs_asg.id
}