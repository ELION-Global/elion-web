# Production readiness checklist

| Area | Status | Launch condition |
| --- | --- | --- |
| Domain and canonical URL | BLOCKED | Domain owner selects hostname and sets `NEXT_PUBLIC_SITE_URL`. |
| DNS / Route 53 | BLOCKED | Hosted zone and approved A/AAAA aliases are configured. |
| TLS / ACM | BLOCKED | DNS-validated CloudFront and ALB certificates are issued in the required regions. |
| CDN / caching | READY | Terraform defines CloudFront HTTPS, compression, cache policies, and invalidation. |
| WAF | READY | Terraform defines managed rules, rate limit, metrics, and logs; tune after staging traffic. |
| Origin hosting | READY | Terraform defines private ECS/Fargate tasks, ALB health routing, autoscaling, and circuit-breaker rollback. |
| Secrets | PARTIALLY READY | Protected GitHub secret and encrypted state pattern are defined; OIDC roles and secret values need an owner. |
| Logging / monitoring | READY | CloudWatch logs, dashboard, alarms, and optional SNS target are defined. |
| Uptime monitoring | PARTIALLY READY | Route 53 HTTPS check is defined but remains disabled until live DNS is approved. |
| CI/CD | READY | Validation, image build, manual staging, and protected production workflow are in source. |
| Staging | PARTIALLY READY | Architecture/workflow exist; account, hostname, certificates and environment configuration remain. |
| Rollback | READY | Immutable SHA images, ECS circuit breaker, deployment-by-SHA and a runbook are defined. |
| Backup / recovery | READY | Versioned Terraform state, Git/ECR source of truth, RTO/RPO and recovery procedure are documented. |
| Security supply chain | PARTIALLY READY | Lockfile audit, ECR scan, CI Docker build, Dependabot and OIDC design exist; role policy review is pending. |
| Accessibility / performance / SEO | READY | Existing Phase 0 checks and production build verification remain required in CI. |
| Human approvals and budget | BLOCKED | Account owner must approve AWS account, region, domain, monthly ceiling, GitHub reviewers, and DNS changes. |

“READY” means repository work is complete, not that a live AWS account has been configured. Public launch is authorized only when every BLOCKED and PARTIALLY READY item has a named owner, evidence, and approval.

## Phase 1.1 formal gate

**Current status: NOT READY FOR STAGING.** Terraform validates, but there is no approved AWS account identity, state backend, staging domain/certificate, OIDC role, cost ceiling, or verified staging plan. No production conclusion is possible until staging has operated successfully.

### First staging environment checklist

| Requirement | Status | Evidence required |
| --- | --- | --- |
| AWS account and selected region | REQUIRES HUMAN INPUT | Account owner and approved region. |
| Monthly budget, Cost Anomaly Detection and escalation contact | MISSING | Budget threshold and alert recipient. |
| Staging hostname and hosted-zone approval | REQUIRES HUMAN INPUT | Domain owner approval. |
| Viewer (`us-east-1`) and origin-region ACM certificates | MISSING | Issued, DNS-validated ACM ARNs. |
| Bootstrap state bucket, lock table and ECR repository | MISSING | Reviewed bootstrap plan/apply record. |
| Staging OIDC deployment role | MISSING | Claim-restricted trust policy and least-privilege permission review. |
| Protected GitHub `staging` Environment | MISSING | Scoped variables/secret and approval policy. |
| High-entropy origin header secret | MISSING | Secret manager record and access owner; never disclose the value. |
| Immutable image and ECR scan result | MISSING | SHA tag and accepted scan finding report. |
| Terraform staging plan | MISSING | Saved plan with zero unexpected destroy/replacement actions. |
| Logs, dashboard, SNS confirmation and public health check | MISSING | Confirmed alert test and HTTPS `/api/health` result. |

### Production gate

**Current status: NOT READY FOR PRODUCTION.** Production requires every staging item plus: two production AZs/NAT gateways/tasks, protected `production` Environment reviewers, separate production OIDC role/state/secrets, a reviewable saved Terraform plan, ECR critical-findings gate, staging smoke/rollback evidence, WAF tuning evidence, confirmed alerts, budget owner approval, and written production promotion approval.

### Terraform-plan record

On 2026-08-15, placeholder-only `terraform plan -refresh=false` attempts were made for bootstrap, staging and production; no apply occurred. Bootstrap correctly stopped at STS because placeholder credentials were invalid. Staging and production correctly stopped because the S3 backend is intentionally uninitialized without the approved state bucket/lock table. Therefore no provider-backed create/modify/destroy plan exists yet and no claim of zero destroys can be made.

Static configuration review predicts only creates from an empty state: bootstrap **7** resources; main stack **40** resources for staging and **42** for production (production has one additional NAT gateway/EIP), plus four read-only data lookups. Enabling the optional DNS aliases, Route 53 health check, or SNS email subscription adds resources. The actual plan must be saved and reviewed for dependency changes, unknown values, replacement, and destroy actions before any apply.
