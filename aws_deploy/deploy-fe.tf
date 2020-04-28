resource "aws_s3_bucket_object" "frontend" {
  for_each = fileset("${path.module}/fe_build", "*")

  bucket = aws_s3_bucket.storage.bucket
  key    = "frontend/${each.value}"
  source = "${path.module}/${each.value}"
}
