module "load-balancer" {
  source = "../load-balancer"

  name            = var.name
  prefix          = var.prefix
  subnets         = var.lb-subnets
  security_groups = var.lb-security_groups
  vpc_id          = var.vpc_id
}

resource "aws_ecs_service" "main" {
  name            = var.name
  cluster         = var.cluster
  task_definition = aws_ecs_task_definition.main.id
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = var.subnets
    security_groups  = var.security_groups
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = module.load-balancer.target_group_arn
    container_name   = var.name
    container_port   = var.container_port
  }

  depends_on = [
    module.load-balancer.aws_alb_listener
  ]
}

resource "aws_ecs_task_definition" "main" {
  family                   = "${var.prefix}_${var.name}"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]

  cpu                   = 256
  memory                = 512
  execution_role_arn    = var.execution_role_arn
  container_definitions = <<DEFINITION
[
  {
    "name": "${var.name}",
    "image": "${var.image}",
    "cpu": 256,
    "memory": 512,
    "networkMode": "awsvpc",
    "portMappings": [
      {
        "protocol": "tcp",
        "containerPort": ${var.container_port}
      }
    ],
    "essential": true,
    "logConfiguration": {
      "logDriver": "awslogs",
      "secretOptions": null,
      "options": {
        "awslogs-group": "${aws_cloudwatch_log_group.main.name}",
        "awslogs-region": "eu-central-1",
        "awslogs-stream-prefix": "ecs"
      }
    }
  }
]
DEFINITION
}

resource "aws_cloudwatch_log_group" "main" {
  name = "/ecs/${var.prefix}/${var.name}"

  retention_in_days = 5
}
