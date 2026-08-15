# Cost controls

Phase 1 chooses managed services where they remove material operational risk, but it deliberately avoids paid bot management, databases, multi-region active-active hosting, and unbounded logging.

| Component | Main cost driver | Required now? | Control |
| --- | --- | --- | --- |
| CloudFront | Requests and data transfer | Yes | Cache static assets, compress responses, review traffic anomalies. |
| AWS WAF | Web ACL, rules, requests, logs | Yes | Start with AWS-managed baseline; do not enable paid Bot Control without evidence. |
| ALB | Hourly capacity and processed bytes | Yes | One ALB per environment; monitor traffic. |
| Fargate | Requested vCPU/memory and task-hours | Yes | Staging 1 task; production baseline 2 tasks; small 0.5 vCPU/1 GiB tasks; autoscaling cap. |
| NAT gateways | Hourly cost and processed bytes | Yes for private Fargate tasks | 1 in staging, 2 in production; assess VPC endpoints later if egress costs justify them. |
| CloudWatch/SNS | Log ingestion/storage, metrics, alarms, notifications | Yes | 30-day default retention; alert only on actionable conditions. |
| Route 53 health check | Check frequency | After launch | Enable only after canonical HTTPS works. |
| ECR/S3/DynamoDB | Image/state storage and requests | Yes | ECR retains 30 releases; state storage is small and versioned. |

Set AWS Budgets and Cost Anomaly Detection at account level before public launch. The finance owner must set monthly alerts and an escalation contact because actual regional price, transfer, request, and traffic patterns determine cost. Review AWS’s current pricing pages during approval; no price figure is hard-coded here because it would age quickly.
