#################################################
# Storage
#################################################

resource "aws_s3_bucket" "storage" {
  bucket        = local.name
  force_destroy = true

  acl = "public-read"

  website {
    index_document = "index.html"
    error_document = "index.html"
  }

  tags = {
    Name = local.name
  }
}
