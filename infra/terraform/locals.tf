locals {
  name = "${var.project_name}-${var.environment}"
  azs  = { for index, az in var.availability_zones : index => az }

  tags = {
    Application = var.project_name
    Environment = var.environment
    ManagedBy   = "terraform"
    Repository  = "ELION"
  }
}
