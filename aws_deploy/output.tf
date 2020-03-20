output "DNS_FrontEnd" {
  value = "https://${module.front-end_dns.fqdn}"
}

output "DNS_API" {
  value = "https://${module.api_dns.fqdn}"
}

output "DNS_Parser" {
  value = "https://${module.parser_dns.fqdn}"
}

output "LB_FrontEnd" {
  value = module.front-end.dns
}

output "LB_API" {
  value = module.api.dns
}

output "LB_Parser" {
  value = module.parser.dns
}

output "NAT_Egress_Elastic_IP" {
  value = aws_eip.private.*.public_ip
}
