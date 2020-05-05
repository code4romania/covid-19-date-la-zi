locals {
  mime_types = {
    htm   = "text/html"
    html  = "text/html"
    css   = "text/css"
    txt   = "text/plain"
    xml   = "application/xml"
    ttf   = "font/ttf"
    woff2 = "application/x-font-woff"
    js    = "application/javascript"
    map   = "application/javascript"
    json  = "application/json"
    svg   = "image/svg+xml"
    jpg   = "image/jpeg"
    png   = "image/png"
    ico   = "image/x-icon"
  }
}

resource "aws_s3_bucket_object" "frontend" {
  for_each = fileset("${path.root}/fe_build", "**/*.*")

  bucket = aws_s3_bucket.storage.bucket
  key    = each.value
  source = "${path.root}/fe_build/${each.value}"
  etag   = filemd5("${path.root}/fe_build/${each.value}")

  acl = "public-read"

  content_type = lookup(local.mime_types, split(".", each.value)[length(split(".", each.value)) - 1], "application/octet-stream")
}
