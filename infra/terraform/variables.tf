variable "aws_region" {
  description = "AWS Region for the regional origin stack."
  type        = string
}

variable "environment" {
  description = "Deployment environment name: staging or production."
  type        = string

  validation {
    condition     = contains(["staging", "production"], var.environment)
    error_message = "environment must be staging or production."
  }
}

variable "project_name" {
  description = "Short, DNS-safe project identifier."
  type        = string
  default     = "elion"
}

variable "domain_name" {
  description = "Canonical HTTPS hostname, for example elion.example.org."
  type        = string
}

variable "cloudfront_certificate_arn" {
  description = "Validated ACM certificate ARN in us-east-1 for the viewer hostname."
  type        = string
}

variable "origin_certificate_arn" {
  description = "Validated ACM certificate ARN in the origin region for the ALB hostname."
  type        = string
}

variable "origin_header_value" {
  description = "High-entropy CloudFront-to-ALB verification value. Supply through CI secret storage; it is stored in encrypted Terraform state."
  type        = string
  sensitive   = true
}

variable "vpc_cidr" {
  description = "CIDR for the isolated application VPC."
  type        = string
  default     = "10.32.0.0/16"
}

variable "availability_zones" {
  description = "Exactly two distinct AZs in aws_region."
  type        = list(string)

  validation {
    condition     = length(var.availability_zones) == 2 && length(distinct(var.availability_zones)) == 2
    error_message = "Provide exactly two distinct availability zones."
  }
}

variable "nat_gateway_count" {
  description = "Use 1 for cost-conscious staging and 2 for production AZ resilience."
  type        = number
  default     = 1

  validation {
    condition     = contains([1, 2], var.nat_gateway_count)
    error_message = "nat_gateway_count must be 1 or 2."
  }
}

variable "desired_count" {
  description = "Initial ECS task count. Use at least 2 in production."
  type        = number
  default     = 1
}

variable "minimum_task_count" {
  description = "Minimum ECS task count for autoscaling."
  type        = number
  default     = 1
}

variable "maximum_task_count" {
  description = "Maximum ECS task count for autoscaling."
  type        = number
  default     = 4
}

variable "container_image" {
  description = "Immutable ECR image URI, normally a Git commit digest or SHA tag."
  type        = string
}

variable "alert_email" {
  description = "Optional operations email. The recipient must confirm the SNS subscription."
  type        = string
  default     = ""
}

variable "manage_dns" {
  description = "Set true only after explicit approval to manage the Route 53 A/AAAA aliases."
  type        = bool
  default     = false
}

variable "route53_zone_id" {
  description = "Existing Route 53 hosted-zone ID, required only when manage_dns is true."
  type        = string
  default     = ""
}

variable "enable_route53_health_check" {
  description = "Enable after the canonical DNS name is publicly serving HTTPS."
  type        = bool
  default     = false
}

variable "log_retention_days" {
  description = "CloudWatch log retention period."
  type        = number
  default     = 30
}
