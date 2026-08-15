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
