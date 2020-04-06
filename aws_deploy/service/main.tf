module "load-balancer" {
  source = "../load-balancer"

  name            = var.name
  prefix          = var.prefix
  subnets         = var.lb-subnets
  security_groups = var.lb-security_groups
  vpc_id          = var.vpc_id
  certificate_arn = var.certificate_arn
}

resource "aws_ecs_service" "main" {
  name            = var.name
  cluster         = var.cluster_arn
  task_definition = "${aws_ecs_task_definition.main.id}:${aws_ecs_task_definition.main.revision}"
  desired_count   = var.min_capacity
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

  lifecycle {
    ignore_changes = [desired_count]
  }
}

resource "aws_ecs_task_definition" "main" {
  family                   = "${var.prefix}_${var.name}"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]

  cpu                   = 256
  memory                = 512
  task_role_arn         = var.task_role_arn
  execution_role_arn    = var.execution_role_arn
  container_definitions = <<DEFINITION
[
  {
    "name": "${var.name}",
    "image": "${var.image}",
    "cpu": 256,
    "memory": 512,
    "portMappings": [
      {
        "protocol": "tcp",
        "containerPort": ${var.container_port}
      }
    ],
    "essential": true,
    "logConfiguration": {
      "logDriver": "awslogs",
      "options": {
        "awslogs-group": "${aws_cloudwatch_log_group.main.name}",
        "awslogs-region": "eu-central-1",
        "awslogs-stream-prefix": "ecs"
      }
    },
    "environment": ${var.environment_variables},
    "secrets": ${var.secrets}
  }
]
DEFINITION
}

resource "aws_cloudwatch_log_group" "main" {
  name = "/ecs/${var.prefix}/${var.name}"

  retention_in_days = 5
}

#################################################
# Autoscaling
#################################################

resource "aws_appautoscaling_target" "main" {
  max_capacity       = var.max_capacity
  min_capacity       = var.min_capacity
  resource_id        = "service/${var.cluster_name}/${var.name}"
  role_arn           = ""
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"
}

resource "aws_appautoscaling_policy" "main" {
  name               = "ScaleUpByCPU"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.main.resource_id
  scalable_dimension = aws_appautoscaling_target.main.scalable_dimension
  service_namespace  = aws_appautoscaling_target.main.service_namespace

  target_tracking_scaling_policy_configuration {
    target_value       = 70
    scale_out_cooldown = 180
    scale_in_cooldown  = 300
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageCPUUtilization"
    }
  }
}
