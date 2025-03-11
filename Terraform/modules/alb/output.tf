
output "load_balancer_dns_name" {
  description = "DNS name of the ALB"
  value       = aws_lb.this.dns_name
}

output "target_group_arns" {
  description = "ARNs of the target groups (indexed by container name)"
  value = {
    for container_name, tg in aws_lb_target_group.this :
    container_name => tg.arn
  }
}

output "alb_sg_id" {
  description = "ID of the security group for the ALB"
  value       = aws_security_group.alb_sg.id
}
