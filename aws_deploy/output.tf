output "DNS_FrontEnd" {
  value = "https://${local.domain_frontend}"
}

output "DNS_API" {
  value = "https://${module.api_dns.fqdn}"
}

output "LB_API" {
  value = module.api.dns
}
