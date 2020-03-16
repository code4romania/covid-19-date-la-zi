resource "aws_alb" "front-end" {
  name               = "${var.prefix}-front-end"
  load_balancer_type = "application"
  subnets            = aws_subnet.public.*.id

  security_groups = [
    aws_security_group.intra.id,
    aws_security_group.public.id
  ]

  tags = {
    Name = "${var.prefix}_front-end"
  }
}

output "Front-End_DNS" {
  value = aws_alb.front-end.dns_name
}

resource "aws_alb_target_group" "front-end" {
  name     = "${var.prefix}-front-end"
  vpc_id   = aws_vpc.main.id
  port     = 80
  protocol = "HTTP"

  target_type = "ip"

  tags = {
    Name = "${var.prefix}_front-end"
  }
}

resource "aws_alb_listener" "front-end" {
  load_balancer_arn = aws_alb.front-end.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_alb_target_group.front-end.id
  }
}
