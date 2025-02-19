output "vpc_id" {
  description = "ID of the created VPC"
  value       = aws_vpc.this.id
}

output "public_rt_id" {
  description = "ID of the public route table"
  value       = aws_route_table.public.id
}