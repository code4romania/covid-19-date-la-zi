data "aws_availability_zones" "available" {
  state = "available"
}

resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"

  tags = {
    Name = var.prefix
  }
}

output "VPC_CIDR" {
  value = aws_vpc.main.cidr_block
}

#################################################
# Subnets
#################################################

resource "aws_subnet" "public" {
  count             = var.az_count
  vpc_id            = aws_vpc.main.id
  cidr_block        = cidrsubnet(aws_vpc.main.cidr_block, 8, count.index)
  availability_zone = data.aws_availability_zones.available.names[count.index]

  tags = {
    Name = "${var.prefix}-public"
  }
}

output "Subnet_Public_CIDR" {
  value = aws_subnet.public.*.cidr_block
}

resource "aws_subnet" "private" {
  count             = var.az_count
  vpc_id            = aws_vpc.main.id
  cidr_block        = cidrsubnet(aws_vpc.main.cidr_block, 8, var.az_count + count.index)
  availability_zone = data.aws_availability_zones.available.names[count.index]

  tags = {
    Name = "${var.prefix}-private"
  }
}

output "Subnet_Private_App_CIDR" {
  value = aws_subnet.private.*.cidr_block
}

#################################################
# Gateways
#################################################

resource "aws_internet_gateway" "public" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "${var.prefix}-public"
  }
}

resource "aws_eip" "private" {
  count = var.az_count
  vpc   = true

  tags = {
    Name = "${var.prefix}-private"
  }
}

output "NAT_Egress_Elastic_IP" {
  value = aws_eip.private.*.public_ip
}

resource "aws_nat_gateway" "private" {
  count         = var.az_count
  allocation_id = element(aws_eip.private.*.id, count.index)
  subnet_id     = element(aws_subnet.public.*.id, count.index)

  tags = {
    Name = "${var.prefix}-private"
  }
}

#################################################
# Routes
#################################################

# Route the public subnet traffic through the IGW
resource "aws_route" "internet_access" {
  route_table_id         = aws_vpc.main.main_route_table_id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id             = aws_internet_gateway.public.id
}

resource "aws_route_table" "private" {
  count  = var.az_count
  vpc_id = aws_vpc.main.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = element(aws_nat_gateway.private.*.id, count.index)
  }

  tags = {
    Name = "${var.prefix}-private"
  }
}

resource "aws_route_table_association" "private" {
  count          = var.az_count
  route_table_id = element(aws_route_table.private.*.id, count.index)
  subnet_id      = element(aws_subnet.private.*.id, count.index)
}
