resource "aws_ecs_cluster" "app" {
  name = var.prefix

  tags = {
    Name = var.prefix
  }
}

resource "aws_ecs_service" "app" {
  name            = var.prefix
  cluster         = aws_ecs_cluster.app.id
  task_definition = aws_ecs_task_definition.app.id
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = aws_subnet.private.*.id
    security_groups  = [aws_security_group.intra.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_alb_target_group.main.id
    container_name   = "front_end"
    container_port   = 80
  }

  depends_on = [
    aws_alb_listener.main
  ]
}

resource "aws_ecs_task_definition" "app" {
  family                   = var.prefix
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]

  cpu                   = 1024
  memory                = 2048
  container_definitions = data.template_file.task-def.rendered
  # execution_role_arn    = aws_iam_role.ecs_execution.id
  # task_role_arn         = aws_iam_role.ecs_execution.id
}

data "template_file" "task-def" {
  template = file("task-def_template.json")
  vars = {
    IMAGE_FRONTEND = var.IMAGE_FRONTEND
    IMAGE_API      = var.IMAGE_API
    IMAGE_PARSER   = var.IMAGE_PARSER
  }
}

# resource "aws_iam_role" "ecs_execution" {
#   name = "${local.prefix}-ecs_execution"

#   assume_role_policy = <<DOCUMENT
# {
#   "Version": "2012-10-17",
#   "Statement": [
#     {
#       "Effect": "Allow",
#       "Action": "sts:AssumeRole",
#       "Principal": {
#         "Service": [
#           "ecs-tasks.amazonaws.com"
#         ]
#       }
#     }
#   ]
# }
# DOCUMENT
# }

# resource "aws_iam_role_policy_attachment" "ecr_and_logs" {
#   role       = aws_iam_role.ecs_execution.name
#   policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
# }
