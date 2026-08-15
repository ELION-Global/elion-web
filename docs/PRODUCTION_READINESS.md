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
