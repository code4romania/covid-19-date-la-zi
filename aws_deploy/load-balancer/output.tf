output "dns" {
  value = aws_alb.main.dns_name
}

output "target_group_arn" {
  value = aws_alb_target_group.main.id
}

output "aws_alb_listener" {
  value      = {}
  depends_on = [aws_alb_listener.main]
}

output "zone_id" {
  value = aws_alb.main.zone_id
}
