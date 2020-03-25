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

  depends_on = [
    aws_alb.main
  ]
}

resource "aws_alb_listener" "main" {
  load_balancer_arn = aws_alb.main.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      port        = 443
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

resource "aws_alb_listener" "secure" {
  load_balancer_arn = aws_alb.main.arn
  port              = 443
  protocol          = "HTTPS"
  certificate_arn   = var.certificate_arn

  default_action {
    type             = "forward"
    target_group_arn = aws_alb_target_group.main.id
  }
}
