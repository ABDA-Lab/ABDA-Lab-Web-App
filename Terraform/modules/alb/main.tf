resource "aws_security_group" "alb_sg" {
  name        = "${var.load_balancer_name}-sg"
  description = "Security group for the ALB (allows inbound HTTP/HTTPS)"
  vpc_id      = var.vpc_id


  ingress {
    description = "Allow inbound HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Allow traffic from anywhere
  }

  # Allow inbound HTTPS (port 443)
  ingress {
    description = "Allow inbound HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Allow traffic from anywhere
  }

  dynamic "egress" {
    for_each = var.exposed_containers
    content {
      description = "Allow outbound to backend targets for container ${egress.key}"
      from_port   = egress.value.container_port
      to_port     = egress.value.container_port
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    }
  }

  tags = {
    Name = "${var.load_balancer_name}-sg"
  }
}

resource "aws_lb" "this" {
  name               = var.load_balancer_name
  load_balancer_type = "application"
  subnets            = var.subnet_ids
  security_groups    = [aws_security_group.alb_sg.id]

  tags = {
    Name = var.load_balancer_name
  }
}

resource "aws_lb_target_group" "this" {
  for_each = var.exposed_containers

  name        = "${var.load_balancer_name}-tg-${each.key}"
  port        = each.value.container_port
  protocol    = "HTTP"
  vpc_id      = var.vpc_id
  target_type = "ip"

  health_check {
    path                = var.health_check_path
    protocol            = "HTTP"
    healthy_threshold   = 2
    unhealthy_threshold = 2
    interval            = 30
    timeout             = 5
  }

  tags = {
    Name = "${var.load_balancer_name}-tg-${each.key}"
  }
}

# Next, define a listener (HTTP or HTTPS) with a default action.
resource "aws_lb_listener" "http" {
  count             = var.certificate_arn == "" ? 1 : 0
  load_balancer_arn = aws_lb.this.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type = "fixed-response"
    fixed_response {
      content_type = "text/plain"
      message_body = "Not found"
      status_code  = 404
    }
  }
}

resource "aws_lb_listener" "https" {
  count             = var.certificate_arn != "" ? 1 : 0
  load_balancer_arn = aws_lb.this.arn
  port              = 443
  protocol          = "HTTPS"
  certificate_arn   = var.certificate_arn
  ssl_policy        = "ELBSecurityPolicy-2016-08"

  default_action {
    type = "fixed-response"
    fixed_response {
      content_type = "text/plain"
      message_body = "Not found"
      status_code  = 404
    }
  }
}

# Then, create one or more listener rules that map specific paths (or hosts) to each target group.
# For example, path-based:
resource "aws_lb_listener_rule" "http_rules" {
  # Only if you have an http listener:
  count = var.certificate_arn == "" ? length(var.exposed_containers) : 0

  listener_arn = aws_lb_listener.http[0].arn
  priority     = 100 + count.index

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.this[
      element(keys(var.exposed_containers), count.index)
    ].arn
  }

  condition {
    path_pattern {
      # e.g. /redis/* -> the redis container, /rabbitmq/* -> the rabbitmq container
      values = ["/${element(keys(var.exposed_containers), count.index)}/*"]
    }
  }
}
