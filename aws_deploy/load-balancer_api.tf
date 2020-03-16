resource "aws_alb" "api" {
  name               = "${var.prefix}-api"
  load_balancer_type = "application"
  subnets            = aws_subnet.public.*.id

  security_groups = [
    aws_security_group.intra.id,
    aws_security_group.public.id
  ]

  tags = {
    Name = "${var.prefix}-api"
  }
}

output "API_DNS" {
  value = aws_alb.api.dns_name
}

resource "aws_alb_target_group" "api" {
  name     = "${var.prefix}-api"
  vpc_id   = aws_vpc.main.id
  port     = 80
  protocol = "HTTP"

  target_type = "ip"

  tags = {
    Name = "${var.prefix}-api"
  }
}

resource "aws_alb_listener" "api" {
  load_balancer_arn = aws_alb.api.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_alb_target_group.api.id
  }
}
