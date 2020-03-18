variable "name" {
  type = string
}

variable "cluster" {
  type = string
}

variable "vpc_id" {
  type = string
}

variable "subnets" {
  type = list
}

variable "lb-subnets" {
  type = list
}

variable "security_groups" {
  type = list
}

variable "lb-security_groups" {
  type = list
}

variable "container_port" {
  type = number
}

variable "execution_role_arn" {
  type = string
}

variable "image" {
  type = string
}

variable "prefix" {
  type = string
}

variable "environment_variables" {
  type    = string
  default = "[]"
}

variable "secrets" {
  type    = string
  default = "[]"
}
