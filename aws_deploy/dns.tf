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

resource "aws_acm_certificate" "api" {
  domain_name = module.api_dns.fqdn

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

resource "aws_route53_record" "cert_validation-api" {
  name    = aws_acm_certificate.api.domain_validation_options[0].resource_record_name
  type    = aws_acm_certificate.api.domain_validation_options[0].resource_record_type
  zone_id = data.aws_route53_zone.main.zone_id
  records = [aws_acm_certificate.api.domain_validation_options[0].resource_record_value]
  ttl     = 60
}

resource "aws_route53_record" "cert_validation-parser" {
  name    = aws_acm_certificate.parser.domain_validation_options.0.resource_record_name
  type    = aws_acm_certificate.parser.domain_validation_options.0.resource_record_type
  zone_id = data.aws_route53_zone.main.zone_id
  records = [aws_acm_certificate.parser.domain_validation_options.0.resource_record_value]
  ttl     = 60
}

resource "aws_acm_certificate_validation" "cert" {
  certificate_arn         = aws_acm_certificate.api.arn
  validation_record_fqdns = [aws_route53_record.cert_validation-api.fqdn, aws_route53_record.cert_validation-parser.fqdn]
}
