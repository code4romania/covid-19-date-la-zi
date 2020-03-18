resource "aws_alb" "main" {
  name               = "${var.prefix}-${var.name}"
  load_balancer_type = "application"
  subnets            = var.subnets

  security_groups = var.security_groups

  tags = {
    Name = "${var.prefix}_${var.name}"
  }
}

resource "aws_alb_target_group" "main" {
  name     = "${var.prefix}-${var.name}"
  vpc_id   = var.vpc_id
  port     = 80
  protocol = "HTTP"

  target_type = "ip"

  tags = {
    Name = "${var.prefix}_${var.name}"
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
