output "DNS_FrontEnd" {
  value = module.front-end.dns
}

output "DNS_API" {
  value = module.api.dns
}

output "DNS_Parser" {
  value = module.parser.dns
}

output "NAT_Egress_Elastic_IP" {
  value = aws_eip.private.*.public_ip
}
