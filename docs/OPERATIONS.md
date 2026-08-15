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
