# Security architecture

Phase 1 applies defense in depth without introducing premature contributor identity systems.

- **Public/Private separation:** CloudFront is the only public entry. ALB access is limited to CloudFront’s managed prefix list and origin verification header; ECS tasks are private and accept traffic only from the ALB.
- **Transport:** CloudFront redirects viewers to HTTPS with TLS 1.2+; CloudFront-to-ALB traffic is HTTPS only. Enable application HSTS only in the production container after the canonical hostname is confirmed HTTPS-only.
- **Application:** Existing CSP, frame denial, MIME-sniffing protection, referrer policy, permissions policy, non-root container, and safe error boundaries remain enforced.
- **WAF:** AWS managed IP-reputation, known-bad-input and common-rule groups are enabled with a 2,000-requests-per-five-minute per-IP limit. WAF logs and sampled requests are reviewed before adding exclusions or stricter rules. Paid Bot Control is not required initially.
- **Identity and least privilege:** Human access uses the organization’s identity provider and MFA; CI uses GitHub OIDC short-lived credentials. There are separate AWS roles, Terraform states, GitHub Environments, and secrets for staging and production. The ECS application task role intentionally has no AWS permissions.
- **Secrets:** No AWS access keys, tokens, certificates, or origin header are committed or passed as Docker build arguments. The origin header is an environment secret and will appear in encrypted Terraform state; access to that state is tightly restricted and audited. Rotate the header with an overlap deployment procedure.
- **Supply chain:** `npm ci` uses the lockfile, the quality workflow runs audit, ECR scans pushed images, CI builds the actual Docker image, and Dependabot tracks npm and Actions updates. Third-party GitHub Actions are limited to official GitHub, AWS, and HashiCorp publishers; pin reviewed releases to full SHAs when the repository establishes an action-update approval process.
- **Future systems:** Any authenticated service must be isolated from the public distribution, use identity-based authorization and auditable access, and must not reuse the public task role, security groups, or secrets.

AWS WAF rate-based rules aggregate requests and limit groups that exceed the configured rate; AWS documents their behavior and tuning options in [Using rate-based rule statements](https://docs.aws.amazon.com/waf/latest/developerguide/waf-rule-statement-type-rate-based.html). AWS WAF logs are intentionally retained for investigation, subject to the selected retention period and privacy review.

## Phase 1.1 threat-model findings

No cloud account, role, secret or endpoint exists yet, so there is no live critical finding. The following gates must be evidenced before their stated environment is created.

| Severity | Finding and impact | Mitigation | Required before |
| --- | --- | --- | --- |
| HIGH | OIDC trust and permission policies do not yet exist; a broad future trust policy could let an arbitrary workflow obtain deployment permissions. | Separate roles per environment. Require `aud=sts.amazonaws.com`, exact repository ID/owner ID, exact `environment`, exact `job_workflow_ref`, and the appropriate `sub`; restrict production deployment branches and require GitHub Environment reviewers. | Staging (staging role), production (production role) |
| HIGH | The deployment workflow currently applies Terraform with `-auto-approve` after environment approval, but does not present a saved plan for a reviewer to inspect. A changed state/configuration could include an unexpected destructive or costly action. | Add a reviewed `terraform plan -out` step and promote only that plan artifact; reject any destroy/replacement before production. | Production; strongly recommended before staging |
| HIGH | ECR scan-on-push is enabled but scan findings are not a release gate. A vulnerable image could be deployed. | Define an approved severity policy, wait for scan completion, and block production on critical findings (with a documented exception process). | Production |
| MEDIUM | GitHub Actions use mutable major-version tags. A compromised publisher/tag update is a supply-chain risk. | Pin actions to reviewed full commit SHAs and let Dependabot propose updates. | Production |
| MEDIUM | Account-level CloudTrail, MFA/SSO, AWS Budgets and Cost Anomaly Detection are outside this repository and unverified. | Enable them in the AWS account; restrict human operators to named roles and record evidence. | Staging for CloudTrail/MFA; production for budgets/anomaly alerts |
| MEDIUM | Managed WAF rules block immediately and may false-positive against legitimate global traffic. | Review sampled requests in staging, use narrow exclusions only, and alert on unusual blocked-request rates. | Staging |
| MEDIUM | The CloudFront origin header is necessarily present in encrypted Terraform state. Broad state-bucket access exposes an origin-control secret. | Limit state read access to designated operators/deployment role, log access, rotate with an overlap procedure, and never print state. | Staging |
| LOW | WAF/application logs may contain IP addresses and request paths. | Keep retention at 30 days, restrict log readers, and complete a privacy review before adding user data. | Production |

### IAM and OIDC acceptance criteria

- Use separate `staging-deploy`, `production-deploy`, and read-only diagnostic roles; do not reuse the bootstrap administrator session or the application task role.
- Deployment roles may manage only their environment’s named Terraform resources, image repository, ECS service/task definition, CloudFront invalidation, and required CloudWatch/SNS actions. They must not administer IAM, Route 53 outside the approved zone, other environments, or account billing.
- The ECS task role remains permissionless until an application capability has an explicitly reviewed AWS API need.
- Production trust must require the protected `production` GitHub Environment and the exact deployment workflow. AWS recommends limiting GitHub OIDC trust with the `sub` condition and protecting GitHub Environments; the `repository_id`, `environment`, and `job_workflow_ref` claims provide stronger stable scoping. See [AWS GitHub OIDC guidance](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-idp_oidc.html) and [OIDC condition keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_iam-condition-keys.html).

### Container review

The image is multi-stage, Node 20 Alpine, has a non-root `nextjs` user, no application secrets, a standalone runtime, a health check, and only public URL/name build arguments. A local `--read-only` container health check passed. ECR basic scan-on-push is configured, but a scanner result is not currently a deployment gate; add that gate before production.
