resource "aws_ecs_cluster" "app" {
  name = var.prefix

  tags = {
    Name = var.prefix
  }
}

#################################################
# Execution Role
#################################################

resource "aws_iam_role_policy_attachment" "ecr_and_logs" {
  role       = aws_iam_role.ecs_execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_iam_role" "ecs_execution" {
  name = "${var.prefix}-ecs_execution"

  assume_role_policy = <<DOCUMENT
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": [
          "ecs-tasks.amazonaws.com"
        ]
      }
    }
  ]
}
DOCUMENT
}

#################################################
# Services
#################################################

resource "aws_ecs_service" "front-end" {
  name            = "${var.prefix}_front-end"
  cluster         = aws_ecs_cluster.app.id
  task_definition = aws_ecs_task_definition.front-end.id
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = aws_subnet.private.*.id
    security_groups  = [aws_security_group.intra.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_alb_target_group.front-end.id
    container_name   = "front_end"
    container_port   = 80
  }

  depends_on = [
    aws_alb_listener.front-end
  ]
}

resource "aws_ecs_service" "api" {
  name            = "${var.prefix}-api"
  cluster         = aws_ecs_cluster.app.id
  task_definition = aws_ecs_task_definition.api.id
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = aws_subnet.private.*.id
    security_groups  = [aws_security_group.intra.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_alb_target_group.api.id
    container_name   = "api"
    container_port   = 80
  }

  depends_on = [
    aws_alb_listener.api
  ]
}

#################################################
# Task Definitions
#################################################

resource "aws_ecs_task_definition" "front-end" {
  family                   = "${var.prefix}_front-end"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]

  cpu                = 256
  memory             = 512
  execution_role_arn = aws_iam_role.ecs_execution.arn
  # task_role_arn         = aws_iam_role.ecs_execution.id
  container_definitions = <<DEFINITION
[
  {
    "name": "front_end",
    "image": "${var.IMAGE_FRONTEND}",
    "cpu": 256,
    "memory": 512,
    "networkMode": "awsvpc",
    "portMappings": [
      {
        "protocol": "tcp",
        "containerPort": 80
      }
    ],
    "essential": true,
    "logConfiguration": {
      "logDriver": "awslogs",
      "secretOptions": null,
      "options": {
        "awslogs-group": "${aws_cloudwatch_log_group.front-end.name}",
        "awslogs-region": "eu-central-1",
        "awslogs-stream-prefix": "ecs"
      }
    }
  }
]
DEFINITION
}

resource "aws_ecs_task_definition" "api" {
  family                   = "${var.prefix}-api"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]

  cpu                = 512
  memory             = 1024
  execution_role_arn = aws_iam_role.ecs_execution.arn
  # task_role_arn         = aws_iam_role.ecs_execution.id
  container_definitions = <<DEFINITION
[
  {
    "name": "api",
    "image": "${var.IMAGE_API}",
    "cpu": 256,
    "memory": 512,
    "networkMode": "awsvpc",
    "portMappings": [
      {
        "protocol": "tcp",
        "containerPort": 80
      }
    ],
    "essential": true,
    "logConfiguration": {
      "logDriver": "awslogs",
      "secretOptions": null,
      "options": {
        "awslogs-group": "${aws_cloudwatch_log_group.api.name}",
        "awslogs-region": "eu-central-1",
        "awslogs-stream-prefix": "ecs"
      }
    }
  },
  {
    "name": "parser",
    "image": "${var.IMAGE_PARSER}",
    "cpu": 256,
    "memory": 512,
    "networkMode": "awsvpc",
    "portMappings": [
      {
        "protocol": "tcp",
        "containerPort": 8080
      }
    ],
    "logConfiguration": {
      "logDriver": "awslogs",
      "secretOptions": null,
      "options": {
        "awslogs-group": "${aws_cloudwatch_log_group.parser.name}",
        "awslogs-region": "eu-central-1",
        "awslogs-stream-prefix": "ecs"
      }
    }
  }
]
DEFINITION
}

#################################################
# Log Groups
#################################################

resource "aws_cloudwatch_log_group" "front-end" {
  name = "/ecs/${var.prefix}/front-end"

  retention_in_days = 5
}

resource "aws_cloudwatch_log_group" "api" {
  name = "/ecs/${var.prefix}/api"

  retention_in_days = 5
}

resource "aws_cloudwatch_log_group" "parser" {
  name = "/ecs/${var.prefix}/parser"

  retention_in_days = 5
}
