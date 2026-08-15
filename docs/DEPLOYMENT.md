# Deployment guide

ELION Phase 1 uses a controlled path: a reviewed commit is validated, built as an immutable container image, promoted to staging, smoke-tested over HTTPS, and only then manually promoted to production through a protected GitHub Environment. A push to `main` never deploys production.

## Environments

| Environment | Purpose | Capacity baseline | Promotion |
| --- | --- | --- | --- |
| Development | Local work only | Docker or `next dev` | Never cloud-deployed automatically |
| Staging | HTTPS, configuration, route and visual verification | 1 task, 1 NAT gateway | Manual workflow dispatch |
| Production | Public service | 2 tasks across 2 AZs, 2 NAT gateways | Manual workflow dispatch plus required GitHub Environment approval |

## One-time account bootstrap

1. Select the AWS account, regional origin location, canonical hostname, availability zones, recovery owner, and monthly cost ceiling.
2. Create an administrator-approved Terraform bootstrap session; run `terraform -chdir=infra/bootstrap init`, review `terraform -chdir=infra/bootstrap plan`, then apply it. Record the ECR URL, state bucket, and lock table securely.
3. Create separate `staging` and `production` GitHub Environments. Require production reviewers; restrict deployment branches to reviewed `main` commits.
4. Create one AWS OIDC role per environment, trusted only by the ELION repository’s protected deployment workflow. Grant each only the Terraform, ECR, ECS, CloudFront invalidation, and CloudWatch permissions needed for its environment. Do not issue AWS access keys.
5. Request DNS-validated ACM certificates: the CloudFront viewer certificate in `us-east-1` and the ALB origin certificate in the origin region. DNS validation records require domain-owner approval.
6. Add the protected GitHub Environment variables listed below. Add `ORIGIN_HEADER_VALUE` as a secret; generate it with an approved password manager and never print it.
7. Build a staging release with the **Controlled deployment** workflow. Set `manage_dns=false` until the domain owner approves the Route 53 aliases. Verify staging, then approve the equivalent production deployment.

### Required GitHub Environment variables

`AWS_DEPLOY_ROLE_ARN`, `AWS_REGION`, `ECR_REPOSITORY`, `NEXT_PUBLIC_SITE_URL`, `CANONICAL_DOMAIN`, `CLOUDFRONT_CERTIFICATE_ARN`, `ORIGIN_CERTIFICATE_ARN`, `AVAILABILITY_ZONES_JSON`, `NAT_GATEWAY_COUNT`, `DESIRED_TASK_COUNT`, `MINIMUM_TASK_COUNT`, `MAXIMUM_TASK_COUNT`, `ALERT_EMAIL`, `TF_STATE_BUCKET`, and `TF_LOCK_TABLE`.

`ORIGIN_HEADER_VALUE` is the one required GitHub Environment secret. Certificate ARNs and domain names are identifiers, not secrets, but belong in protected environment variables to avoid accidental cross-environment use.

## Release and rollback

The controlled workflow tags every ECR image with the exact checked-out commit SHA, waits for ECS steady state, invalidates CloudFront after success, and checks `https://<canonical-domain>/api/health`. ECS deployment circuit breaking automatically rolls back failed replacement tasks. For a confirmed bad release, dispatch the same workflow with the previous known-good Git SHA; it builds (or reuses an immutable tag if already present), updates the task definition, invalidates CloudFront, and performs the health check again.

Do not use `latest`, manually edit an ECS task definition, or delete an ECR image that is the current or previous known-good production release.
