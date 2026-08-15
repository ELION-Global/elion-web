# ELION infrastructure as code

Terraform is the sole infrastructure-as-code system for Phase 1. It is selected over CDK to keep the public platform independent of a second application language/runtime and over hand-managed CloudFormation to keep plans, state, review, and environment parity explicit. Terraform is used only to describe infrastructure; no configuration here is applied automatically.

## Layout

- `bootstrap/` creates the encrypted, versioned Terraform-state bucket, lock table, and immutable ECR repository. Apply it once with a short-lived administrator session.
- `terraform/` creates one isolated regional origin stack plus the CloudFront/WAF edge configuration. Keep a separate state key and GitHub Environment for `staging` and `production`.

## Safe validation

Run this locally only after installing Terraform 1.15.x:

```powershell
terraform -chdir=infra/bootstrap init -backend=false
terraform -chdir=infra/bootstrap validate
terraform -chdir=infra/terraform init -backend=false
terraform -chdir=infra/terraform validate
```

The GitHub workflow performs equivalent validation. A `plan` or `apply` requires an approved AWS role and environment-specific inputs; neither is attempted locally by this repository.

## State and credentials

Use `backend.hcl` files kept outside Git. Each should specify an encrypted S3 state bucket, the DynamoDB lock table, region, and a distinct key such as `elion/staging/terraform.tfstate`. State contains sensitive infrastructure metadata, including the CloudFront origin-verification value, so access is limited to the deployment role and designated operators.

Use GitHub Actions OIDC to obtain short-lived AWS credentials. Do not create long-lived AWS access keys or place them in GitHub secrets. The account administrator must create a least-privilege role scoped to the specific environment and configure its trust policy for the ELION repository, protected GitHub Environment, and approved branch/ref.

## Important inputs

The primary stack requires a canonical hostname, viewer certificate ARN in `us-east-1`, origin-region ALB certificate ARN, high-entropy origin header, image URI, and two AZs. `terraform.tfvars.example` documents only safe example values. Supply sensitive values through protected environment secrets and the rest through protected environment variables.

`manage_dns` and `enable_route53_health_check` both default to `false`. They are explicit safeguards: do not turn them on until the domain owner has approved DNS changes and the CloudFront distribution serves the canonical HTTPS hostname.
