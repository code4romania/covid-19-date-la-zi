resource "aws_cloudfront_distribution" "main" {

  depends_on = [
    aws_acm_certificate_validation.cert
  ]

  enabled         = true
  is_ipv6_enabled = true
  price_class     = "PriceClass_100"
  aliases         = terraform.workspace == "production" ? [local.domain_root, local.domain_frontend] : [local.domain_frontend]
  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.cert.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.1_2016"
  }

  origin {
    domain_name = aws_s3_bucket.storage.website_endpoint
    origin_id   = aws_s3_bucket.storage.bucket

    custom_origin_config {
      http_port                = 80
      https_port               = 443
      origin_keepalive_timeout = 5
      origin_protocol_policy   = "http-only"
      origin_read_timeout      = 30
      origin_ssl_protocols = [
        "TLSv1",
        "TLSv1.1",
        "TLSv1.2",
      ]
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  default_cache_behavior {
    target_origin_id = aws_s3_bucket.storage.bucket

    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 43200

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
  }
}
