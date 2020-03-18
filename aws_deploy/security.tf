resource "aws_security_group" "public" {
  name        = "${local.name}-public"
  description = "LoadBalancer access"
  vpc_id      = aws_vpc.main.id

  ingress {
    protocol    = "tcp"
    from_port   = 80
    to_port     = 80
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${local.name}-lb"
  }
}

resource "aws_security_group" "intra" {
  name        = "${local.name}-intra"
  description = "Intra-service access (lb - app - db)"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"
    self      = true
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${local.name}-intra"
  }
}

resource "aws_kms_key" "ssm_key" {
  description         = "${local.name} key for SSM parameters"
  enable_key_rotation = true
}

resource "aws_ssm_parameter" "parser_access_key_id" {
  name   = "/${local.name}/parser_access_key_id"
  value  = aws_iam_access_key.parser.id
  type   = "SecureString"
  key_id = aws_kms_key.ssm_key.id
}

resource "aws_ssm_parameter" "parser_secret_access_key" {
  name   = "/${local.name}/parser_secret_access_key"
  value  = aws_iam_access_key.parser.secret
  type   = "SecureString"
  key_id = aws_kms_key.ssm_key.id
}
