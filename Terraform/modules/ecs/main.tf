# Create ECS Cluster
resource "aws_ecs_cluster" "this" {
  name = var.cluster_name
}

# IAM Role for ECS Container Instances
resource "aws_iam_role" "ecs_instance_role" {
  name = "${var.cluster_name}-instance-role"
  assume_role_policy = jsonencode({
    Version   = "2012-10-17",
    Statement = [{
      Effect    = "Allow",
      Principal = { Service = "ec2.amazonaws.com" },
      Action    = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_instance_policy" {
  role       = aws_iam_role.ecs_instance_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceforEC2Role"
}

resource "aws_iam_instance_profile" "ecs_instance_profile" {
  name = "${var.cluster_name}-instance-profile"
  role = aws_iam_role.ecs_instance_role.name
}

# Create a Security Group for ECS Container Instances
resource "aws_security_group" "ecs_instance_sg" {
  name        = "${var.cluster_name}-ecs-instance-sg"
  description = "Security group for ECS container instances"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.cluster_name}-ecs-instance-sg"
  }
}

# Launch Configuration for ECS Container Instances
resource "aws_launch_configuration" "ecs_instance" {
  name_prefix          = "${var.cluster_name}-instance-"
  image_id             = var.ecs_ami_id
  instance_type        = var.instance_type
  security_groups      = [aws_security_group.ecs_instance_sg.id]
  iam_instance_profile = aws_iam_instance_profile.ecs_instance_profile.name

  user_data = <<EOF
#!/bin/bash
echo ECS_CLUSTER=${aws_ecs_cluster.this.name} >> /etc/ecs/ecs.config
EOF

  lifecycle {
    create_before_destroy = true
  }
}

# Auto Scaling Group for ECS Container Instances
resource "aws_autoscaling_group" "ecs_asg" {
  name                 = "${var.cluster_name}-asg"
  launch_configuration = aws_launch_configuration.ecs_instance.id
  vpc_zone_identifier  = var.subnet_ids
  desired_capacity     = var.desired_capacity
  max_size             = var.max_size
  min_size             = var.min_size
  health_check_type    = "EC2"

  tag {
    key                 = "Name"
    value               = "${var.cluster_name}-instance"
    propagate_at_launch = true
  }
}
