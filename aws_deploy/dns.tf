data "aws_route53_zone" "main" {
  name         = local.domain_root
  private_zone = false
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
  alt_certs = terraform.workspace == "production" ? [local.domain_frontend, module.api_dns.fqdn] : [module.api_dns.fqdn]
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

resource "aws_acm_certificate" "parser" {
  domain_name = module.parser_dns.fqdn

  validation_method = "DNS"
  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "cert_validation" {
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

resource "aws_route53_record" "cert_validation-parser" {
  name    = aws_acm_certificate.parser.domain_validation_options.0.resource_record_name
  type    = aws_acm_certificate.parser.domain_validation_options.0.resource_record_type
  zone_id = data.aws_route53_zone.main.zone_id
  records = [aws_acm_certificate.parser.domain_validation_options.0.resource_record_value]
  ttl     = 60
}

resource "aws_acm_certificate_validation" "cert" {
  certificate_arn         = aws_acm_certificate.cert.arn
  validation_record_fqdns = concat(aws_route53_record.cert_validation.*.fqdn, [aws_route53_record.cert_validation-parser.fqdn])
}
