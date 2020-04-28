resource "aws_cloudfront_distribution" "main" {
  enabled         = true
  is_ipv6_enabled = true
  price_class     = "PriceClass_100"
  aliases         = terraform.workspace == "production" ? [local.domain_root, local.domain_frontend] : [local.domain_frontend]
  viewer_certificate {
    cloudfront_default_certificate = true
  }

  default_root_object = "frontend/index.html"

  origin {
    # domain_name = module.api.dns
    domain_name = aws_s3_bucket.storage.bucket_domain_name
    origin_id   = local.name

    custom_origin_config {
      http_port                = 80
      https_port               = 443
      origin_keepalive_timeout = 5
      origin_protocol_policy   = "https-only"
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
    target_origin_id = local.name

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
