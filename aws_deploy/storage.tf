#################################################
# Permissions
#################################################
resource "aws_iam_user" "parser" {
  name = "${local.name}-parser-s3"

  tags = {
    Name = local.name
  }
}

resource "aws_iam_access_key" "parser" {
  user = aws_iam_user.parser.name
}

resource "aws_iam_user_policy" "parser_rw" {
  name = "${local.name}-parser-s3-write"
  user = aws_iam_user.parser.name

  policy = data.aws_iam_policy_document.s3access.json
}

resource "aws_iam_role" "ecs_instance" {
  name = "${local.name}_ecs-instance"

  assume_role_policy = <<POLICY
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": ["sts:AssumeRole"],
            "Principal": {
              "Service": [
                "ecs-tasks.amazonaws.com"
              ]
            }
        }
    ]
}
POLICY
}

resource "aws_iam_role_policy_attachment" "ecs_s3access" {
  role       = aws_iam_role.ecs_instance.name
  policy_arn = aws_iam_policy.s3access.arn
}


resource "aws_iam_policy" "s3access" {
  name   = "${local.name}_s3access"
  policy = data.aws_iam_policy_document.s3access.json
}

data "aws_iam_policy_document" "s3access" {
  statement {
    actions = [
      "s3:*"
    ]
    resources = [
      aws_s3_bucket.storage.arn,
      "${aws_s3_bucket.storage.arn}/*"
    ]
    effect = "Allow"
  }
}

data "aws_canonical_user_id" "current_user" {}

#################################################
# Storage
#################################################

resource "aws_s3_bucket" "storage" {
  bucket        = local.name
  force_destroy = true

  acl = "public-read"
  #   policy = <<POLICY
  # {
  #     "Version": "2012-10-17",
  #     "Statement": [
  #         {
  #             "Effect": "Allow",
  #             "Principal": "*",
  #             "Action": "s3:GetObject",
  #             "Resource": [
  #               "arn:aws:s3:::${local.name}",
  #               "arn:aws:s3:::${local.name}/*"
  #             ]
  #         },
  #         {
  #             "Effect": "Allow",
  #             "Principal": "*",
  #             "Action": "s3:ListBucket",
  #             "Resource": [
  #               "arn:aws:s3:::${local.name}"
  #             ]
  #         }
  #     ]
  # }
  #   POLICY

  website {
    index_document = "index.html"
    error_document = "index.html"
  }

  tags = {
    Name = local.name
  }
}
