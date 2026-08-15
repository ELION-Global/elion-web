# Disaster recovery

## Recovery objectives

Phase 1 target: restore a failed application release in under 30 minutes (RTO) by deploying the last known-good immutable SHA. The public site has no database or user content in this phase, so application-data RPO is effectively zero; infrastructure configuration RPO is the latest versioned Terraform state plus Git history.

## Recovery assets

- Git repository and protected release SHA are the application source of truth.
- ECR retains the 30 most recent immutable `sha-*` images; do not expire the active or rollback candidate.
- Terraform state is versioned, encrypted S3 data with DynamoDB locking. Bucket versioning is recovery protection, not a substitute for restricted access.
- The Terraform configuration rebuilds the regional stack; certificates, domains, AWS account access, and GitHub Environment configuration remain human-controlled prerequisites.

## Scenarios

| Scenario | Recovery |
| --- | --- |
| Bad release | Run controlled deployment for the previous known-good Git SHA; verify public HTTPS health and core routes. |
| Task/AZ failure | ECS/ALB replace unhealthy tasks across AZs; investigate only if capacity does not recover. |
| Regional origin outage | CloudFront may serve cached public content; declare incident, assess AWS regional status, and rebuild in an approved alternate region from Terraform. This is manual in Phase 1. |
| Terraform state issue | Stop applies, restore the specifically reviewed prior S3 object version, then run a plan before any change. |
| Credential compromise | Revoke/disable affected human or OIDC role access, rotate the origin header and other affected secrets, review CloudTrail/account logs, then redeploy. |

Run a staging rollback exercise quarterly. A multi-region automated failover plan is a Phase 1.1 decision because it requires a second regional stack, replicated configuration, tested DNS/CloudFront routing, ownership, and budget.
