data "aws_route53_zone" "main" {
  name         = local.domain_root
  private_zone = false
}

resource "aws_route53_record" "root" {
  count   = terraform.workspace == "production" ? 1 : 0
  zone_id = data.aws_route53_zone.main.id
  name    = local.domain_root
  type    = "CNAME"

  ttl     = 60
  records = [aws_cloudfront_distribution.main.domain_name]
}

module "frontend_dns" {
  source      = "./dns"
  zone_id     = data.aws_route53_zone.main.zone_id
  domain      = local.domain_frontend
  destination = [aws_cloudfront_distribution.main.domain_name]
}

module "api_dns" {
  source      = "./dns"
  zone_id     = data.aws_route53_zone.main.zone_id
  domain      = local.domain_api
  destination = [module.api.dns]
}

module "parser_dns" {
  source      = "./dns"
  zone_id     = data.aws_route53_zone.main.zone_id
  domain      = local.domain_parser
  destination = [module.parser.dns]
}

locals {
  alt_certs = terraform.workspace == "production" ? [local.domain_frontend] : []
}

resource "aws_acm_certificate" "cert" {
  domain_name               = terraform.workspace == "production" ? local.domain_root : local.domain_frontend
  subject_alternative_names = local.alt_certs

  provider = aws.us-east-1

  validation_method = "DNS"
  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate" "api" {
  domain_name               = module.api_dns.fqdn
  subject_alternative_names = [module.parser_dns.fqdn]

  validation_method = "DNS"
  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "cert_validation" {
  provider = aws.us-east-1

  count   = length(local.alt_certs) + 1
  name    = aws_acm_certificate.cert.domain_validation_options[count.index].resource_record_name
  type    = aws_acm_certificate.cert.domain_validation_options[count.index].resource_record_type
  zone_id = data.aws_route53_zone.main.zone_id
  records = [aws_acm_certificate.cert.domain_validation_options[count.index].resource_record_value]
  ttl     = 60

  depends_on = [
    aws_acm_certificate.cert
  ]
}

resource "aws_route53_record" "cert_validation-api" {
  count   = 2
  name    = aws_acm_certificate.api.domain_validation_options[count.index].resource_record_name
  type    = aws_acm_certificate.api.domain_validation_options[count.index].resource_record_type
  zone_id = data.aws_route53_zone.main.zone_id
  records = [aws_acm_certificate.api.domain_validation_options[count.index].resource_record_value]
  ttl     = 60
}

resource "aws_acm_certificate_validation" "cert" {
  provider = aws.us-east-1

  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = aws_route53_record.cert_validation.*.fqdn
}

resource "aws_acm_certificate_validation" "cert-api" {
  certificate_arn         = aws_acm_certificate.api.arn
  validation_record_fqdns = aws_route53_record.cert_validation-api.*.fqdn
}
