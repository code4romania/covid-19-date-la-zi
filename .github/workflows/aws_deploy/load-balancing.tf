resource "aws_alb" "main" {
  name               = var.prefix
  load_balancer_type = "application"
  subnets            = aws_subnet.public.*.id

  security_groups = [
    aws_security_group.intra.id,
    aws_security_group.public.id
  ]

  tags = {
    Name = var.prefix
  }
}

output "Load-Balancer_DNS" {
  value = aws_alb.main.dns_name
}

resource "aws_alb_target_group" "main" {
  name     = var.prefix
  vpc_id   = aws_vpc.main.id
  port     = 80
  protocol = "HTTP"

  target_type = "ip"

  tags = {
    Name = var.prefix
  }
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
