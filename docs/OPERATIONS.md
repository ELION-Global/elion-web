# Operations runbook

## Normal signals

| Signal | Source | Action |
| --- | --- | --- |
| Service down / health failure | Route 53 HTTPS check and ALB unhealthy-target alarm | Check CloudFront, ALB target health, then ECS service events and `/elion/<environment>/web` logs. Roll back if the release caused it. |
| Elevated 5xx | CloudFront and ALB alarms | Determine whether errors originate at the edge or task; inspect WAF matches before changing rules. |
| Elevated latency or saturation | ALB target response time dashboard, ECS CPU alarm | Check task capacity, deployment status and request patterns; scale within the approved maximum before changing infrastructure. |
| Deployment failure | GitHub workflow and ECS deployment circuit breaker | Keep the previous release; read task stopped reasons and container logs, correct the issue, then redeploy or roll back by SHA. |
| Certificate issue | ACM console/Events and external health check | Confirm DNS validation and certificate attachment. Renew/replace before expiry; do not disable HTTPS or HSTS. |
| Suspicious traffic | WAF metrics/log group | Start in sampled/log review, identify false positives, then tune exclusions narrowly. Do not add broad geographic blocks by default. |

Configure SNS email recipients and confirm subscriptions before relying on alarms. Alarm thresholds are starting points, not proof of an incident; review after the first month of actual traffic.

## Incident procedure

1. Record time, environment, deployed SHA, symptom, user impact, and current alarm state.
2. Check the public `GET /api/health` endpoint, CloudFront 5xx metric, ALB target health, ECS events, and recent application logs.
3. If a release is implicated, use the controlled workflow to redeploy the last known-good SHA. ECS circuit breaking may already have rolled the failed revision back.
4. Verify homepage, all public routes, security headers, and `/api/health` after recovery. Close the incident only after alarms normalize.
5. Preserve relevant logs and create a short corrective-action record. Never paste request headers, state files, credentials, or the origin-verification value into tickets.

## Routine operations

- Weekly: review Dependabot PRs, ECR scan findings, failed workflow runs, WAF samples, and cost anomalies.
- Monthly: review WAF rate threshold/false positives, alarms, log retention, actual availability, and the previous-known-good rollback SHA.
- Quarterly: test a staging rollback, verify GitHub Environment reviewers and AWS role trust policies, and review least-privilege permissions.
- Before every production release: confirm the source SHA passed the quality workflow, staging has passed, and an accountable reviewer approves promotion.

## Phase 1.1 failure-mode review

| Failure | Detection | Recovery / realistic time |
| --- | --- | --- |
| ECS task or container-health failure | ALB target health, ECS events, container logs, circuit breaker. | ECS replaces the task; a failed deployment rolls back only after a prior completed revision exists. Usually minutes; the first-ever deployment has no rollback target. |
| ALB listener, target group or origin certificate fault | CloudFront 5xx, Route 53 health check after enablement, ALB metrics. | Correct Terraform/certificate configuration or deploy the prior SHA; typically 15–60 minutes with an authorized operator. |
| CloudFront behavior/distribution fault | Public smoke check, CloudFront 5xx and deployment output. | Revert reviewed Terraform/change and invalidate cache; distribution propagation can take minutes. |
| WAF false positive | WAF logs/sampled requests and user reports. | Narrowly exclude the verified rule/path; do not disable the Web ACL broadly. 15–60 minutes after review. |
| Failed deployment or bad image | GitHub workflow, ECS circuit breaker, health endpoint. | Redeploy last completed immutable SHA. This requires the prior image and an approved operator; minutes after diagnosis. |
| GitHub Actions/OIDC outage or denied role | Workflow logs; no production traffic impact until a release is needed. | Use the documented break-glass human role only after approval and audit; wait for provider recovery where possible. |
| Certificate/DNS failure | ACM events, public HTTPS check, browser errors. | Restore DNS validation/aliases or certificate attachment. DNS propagation makes recovery minutes to hours. |
| AWS regional outage | AWS Health, origin errors, public health check. | CloudFront may serve cached public content; there is no automatic second-region failover. Manual recovery is hours to days. |

Single-region origin, single CloudFront distribution, domain registrar/DNS ownership, GitHub Actions availability, alert-recipient confirmation, and human approval remain dependencies. The architecture protects task and AZ failures in production; it does not yet protect a regional outage or a compromised/misconfigured account.
