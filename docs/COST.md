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

## Phase 1.1 monthly planning estimate

These are planning estimates in USD, not a quote. They use 730 hours/month and public US East reference rates checked on 2026-08-15: Fargate Linux/x86 `0.5 vCPU + 1 GiB` is approximately `$18` per task-month, NAT gateway is `$0.045` per hour plus `$0.045/GB`, and a low-usage ALB is roughly `$18–22` per month. The current example region is `ap-south-1`; its actual rates, taxes, edge geography and data-transfer price can differ, so an approved AWS Pricing Calculator estimate is required before spend approval.

| Scenario | Assumptions | Estimated production/month | Important exclusions / uncertainty |
| --- | --- | ---: | --- |
| Low traffic | 2 tasks, 2 NAT gateways, 1M requests, 50 GB edge transfer, 1 GB application logs, 2 GB ECR. | **$130–150** | CloudFront is within its current 1 TB / 10M-request monthly free allowance; assumes low ALB LCU use. |
| Moderate early-stage | 2 tasks, 2 NAT gateways, 10M requests, 500 GB edge transfer, 5 GB logs, 10 GB ECR. | **$145–175** | Still may fit CloudFront free usage; WAF request charges and regional pricing vary. |
| Higher early-stage | 4 tasks during sustained load, 50M requests, 2 TB edge transfer, 20 GB logs, 30 GB ECR. | **$280–380** | Includes a planning allowance for CloudFront/data-transfer and higher WAF/ALB use; global visitor mix can raise it materially. |

The staging environment adds approximately **$80–95/month** while continuously running (one task, one NAT gateway and one ALB), before traffic and regional differences. Running staging and low-traffic production together is therefore likely **$210–245/month**.

| Cost driver | Low-traffic planning amount | What can spike it |
| --- | ---: | --- |
| NAT gateways | `$66` production / `$33` staging before data | Each gateway is billed hourly and per GB; cross-AZ routing and image/log egress add cost. |
| Fargate | `$36` for two production tasks | Autoscaling, larger CPU/memory requests, or always-on staging. |
| ALB | `$18–28` | LCUs are driven by bytes, connections and rules. |
| WAF | `$10–40` | Web ACL/rule base charges, request volume and optional paid managed products. |
| CloudFront / data transfer | `$0` within allowance; highly variable above it | Global transfer geography, cache misses, invalidations and traffic bursts. |
| Logs, Route 53, ECR, state | `$3–15` at low volume | Log ingestion/querying, health-check options and retained images. |

AWS confirms that Fargate bills requested vCPU/memory duration, NAT gateways bill both hourly and processed GB, WAF bills ACL/rules/requests, and CloudFront usage is request/data-transfer based. Use the current [ECS pricing](https://aws.amazon.com/ecs/pricing/), [VPC pricing](https://aws.amazon.com/vpc/pricing/), [WAF pricing](https://aws.amazon.com/waf/pricing/), and [CloudFront pricing](https://aws.amazon.com/cloudfront/pricing/) pages for final regional inputs.

## Cost optimization decisions

| Option | Save / loss | Recommendation |
| --- | --- | --- |
| Keep one NAT gateway in staging | Saves roughly one NAT gateway-month compared with two; staging loses AZ-resilient egress. | **Recommended for staging only.** |
| Use one NAT gateway in production | Saves roughly `$33+/month`; introduces a production egress single point of failure and possible cross-AZ charges. | **Do not use.** |
| Give Fargate public IPs and remove NAT | Saves NAT fixed and per-GB cost; removes private-subnet egress isolation and changes the reviewed model. | **Do not use.** |
| Disable staging when no launch test is active | Saves task-hours but ALB/NAT continue to cost unless the full stack is intentionally torn down; staging stops being continuously testable. | **Consider after staging acceptance, with an explicit teardown/recreate runbook.** |
| Replace enhanced Container Insights | Can reduce observability volume; reduces operational signal quality before real traffic is understood. | **Do not change before the first monthly review.** |
| Add interface VPC endpoints | May reduce NAT data processing but adds per-endpoint hourly charges across AZs. | **Not cost-effective at current expected volume.** |
