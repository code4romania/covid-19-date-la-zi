resource "aws_alb" "main" {
  name               = var.name
  load_balancer_type = "application"
  subnets            = var.subnets

  security_groups = var.security_groups

  tags = {
    Name = var.name
  }
}

output "dns" {
  value = aws_alb.main.dns_name
}

resource "aws_alb_target_group" "main" {
  name     = var.name
  vpc_id   = var.vpc_id
  port     = 80
  protocol = "HTTP"

  target_type = "ip"

  tags = {
    Name = var.name
  }
}

output "target_group_arn" {
  value = aws_alb_target_group.main.id
}

resource "aws_alb_listener" "main" {
  load_balancer_arn = aws_alb.main.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_alb_target_group.main.id
  }
}

output "aws_alb_listener" {
  value      = {}
  depends_on = [aws_alb_listener.main]
}
