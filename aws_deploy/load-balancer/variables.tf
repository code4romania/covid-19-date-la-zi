variable "name" {
  type = string
}

variable "prefix" {
  type = string
}

variable "subnets" {
  type = list
}

variable "security_groups" {
  type = list
}

variable "vpc_id" {
  type = string
}

variable "certificate_arn" {
  type = string
}
