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

resource "aws_iam_role_policy_attachment" "use_ssm_parameter" {
  role       = aws_iam_role.ecs_execution.name
  policy_arn = aws_iam_policy.use_ssm_parameter.arn
}

resource "aws_iam_policy" "use_ssm_parameter" {
  name   = "${local.name}_use-ssm-parameter"
  policy = data.aws_iam_policy_document.use_ssm_parameter.json
}

data "aws_iam_policy_document" "use_ssm_parameter" {
  statement {
    actions = [
      "ssm:DescribeParameters"
    ]
    resources = ["*"]
    effect    = "Allow"
  }
  statement {
    actions = [
      "ssm:GetParameter*"
    ]
    resources = [
      aws_ssm_parameter.parser_access_key_id.arn,
      aws_ssm_parameter.parser_secret_access_key.arn
    ]
    effect = "Allow"
  }
  statement {
    actions = [
      "kms:Decrypt"
    ]
    resources = [
      aws_kms_key.ssm_key.arn
    ]
    effect = "Allow"
  }
}

#################################################
# Services
#################################################

module "front-end" {
  source = "./service"

  name = "front-end"

  cluster         = aws_ecs_cluster.app.id
  vpc_id          = aws_vpc.main.id
  subnets         = aws_subnet.private.*.id
  lb-subnets      = aws_subnet.public.*.id
  security_groups = [aws_security_group.intra.id]
  lb-security_groups = [
    aws_security_group.intra.id,
    aws_security_group.public.id
  ]
  certificate_arn = aws_acm_certificate.cert.arn

  container_port        = 80
  execution_role_arn    = aws_iam_role.ecs_execution.arn
  image                 = var.IMAGE_FRONTEND
  prefix                = local.name
  environment_variables = <<ENV
  [
    {
      "name" : "REACT_APP_API_URL",
      "value" : "https://${module.api_dns.fqdn}/api/v2"
    }
  ]
ENV
}

module "api" {
  source = "./service"

  name = "api"

  cluster         = aws_ecs_cluster.app.id
  vpc_id          = aws_vpc.main.id
  subnets         = aws_subnet.private.*.id
  lb-subnets      = aws_subnet.public.*.id
  security_groups = [aws_security_group.intra.id]
  lb-security_groups = [
    aws_security_group.intra.id,
    aws_security_group.public.id
  ]
  certificate_arn = aws_acm_certificate.cert.arn

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

module "parser" {
  source = "./service"

  name = "parser"

  cluster         = aws_ecs_cluster.app.id
  vpc_id          = aws_vpc.main.id
  subnets         = aws_subnet.private.*.id
  lb-subnets      = aws_subnet.public.*.id
  security_groups = [aws_security_group.intra.id]
  lb-security_groups = [
    aws_security_group.intra.id,
    aws_security_group.public.id
  ]
  certificate_arn = aws_acm_certificate.parser.arn

  container_port        = 8080
  task_role_arn         = aws_iam_role.ecs_instance.arn
  execution_role_arn    = aws_iam_role.ecs_execution.arn
  image                 = var.IMAGE_PARSER
  prefix                = local.name
  environment_variables = <<ENV
  [
    {
      "name" : "AWS__BUCKETNAME",
      "value" : "${aws_s3_bucket.storage.bucket}"
    },
    {
      "name" : "AWS__REGION",
      "value" : "${aws_s3_bucket.storage.region}"
    }
  ]
ENV
  secrets               = <<SECRETS
  [
    { "name": "AWS__APIKEY", "valueFrom": "${aws_ssm_parameter.parser_access_key_id.arn}" },
    { "name": "AWS__SECRET", "valueFrom": "${aws_ssm_parameter.parser_secret_access_key.arn}" }
  ]
SECRETS
}
