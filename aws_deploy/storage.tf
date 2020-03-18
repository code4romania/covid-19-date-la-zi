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

  policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::${aws_s3_bucket.storage.bucket}/*",
                "arn:aws:s3:::${aws_s3_bucket.storage.bucket}"
            ],
            "Condition": {
                "ForAnyValue:IpAddress": {
                    "aws:SourceIp": ["${join("\",\"", aws_subnet.private.*.cidr_block)}"]
                }
            }
        }
    ]
}
EOF
}

#################################################
# Storage
#################################################

resource "aws_s3_bucket" "storage" {
  bucket = local.name

  tags = {
    Name = local.name
  }
}
