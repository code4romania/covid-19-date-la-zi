provider "aws" {
  region = "eu-central-1"
}

terraform {
  required_version = ">=0.12.13"
  backend "s3" {
    bucket         = "code4ro-terraform-tfstate"
    key            = "date-la-zi/terraform.tfstate"
    region         = "eu-central-1"
    dynamodb_table = "terraform-locks"
    encrypt        = true
  }
}
