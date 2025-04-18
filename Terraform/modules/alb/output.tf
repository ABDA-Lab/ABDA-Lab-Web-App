output "load_balancer_dns_name" {
  description = "DNS name of the ALB"
  value       = aws_lb.this.dns_name
}

output "target_group_arn" {
  description = "ARN of the target group"
  value       = aws_lb_target_group.this.arn
}

output "alb_sg_id" {
  description = "ID of the security group for the ALB"
  value       = aws_security_group.alb_sg.id
}
