resource "aws_ecs_cluster" "app" {
  name = local.name

  tags = {
    Name = local.name
  }
}

#################################################
# Execution Role
#################################################

resource "aws_iam_role" "ecs_execution" {
  name = "${local.name}-ecs_execution"

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

resource "aws_iam_role_policy_attachment" "ecr_and_logs" {
  role       = aws_iam_role.ecs_execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

#################################################
# Services
#################################################

module "api" {
  source = "./service"

  name         = "api"
  min_capacity = terraform.workspace == "production" ? 2 : 1
  max_capacity = terraform.workspace == "production" ? 50 : 1

  cluster_name    = aws_ecs_cluster.app.name
  cluster_arn     = aws_ecs_cluster.app.arn
  vpc_id          = aws_vpc.main.id
  subnets         = aws_subnet.private.*.id
  lb-subnets      = aws_subnet.public.*.id
  security_groups = [aws_security_group.intra.id]
  lb-security_groups = [
    aws_security_group.intra.id,
    aws_security_group.public.id
  ]
  certificate_arn = aws_acm_certificate.api.arn

  container_port        = 80
  execution_role_arn    = aws_iam_role.ecs_execution.arn
  image                 = var.IMAGE_API
  prefix                = local.name
  environment_variables = <<ENV
  [
    {
      "name" : "HTTPFILESERVICEOPTIONS__JSONFILEURL",
      "value" : "https://${aws_s3_bucket.storage.bucket_regional_domain_name}/latestData.json"
    }
  ]
ENV
}
