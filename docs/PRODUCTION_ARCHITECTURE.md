# Production architecture

## Selected architecture

`DNS → CloudFront + AWS WAF → HTTPS Application Load Balancer → ECS on Fargate → ELION Next.js container`

The edge is global; the origin is a two-AZ VPC in a chosen AWS region. ECS tasks sit in private subnets and accept traffic only from the ALB. The ALB accepts HTTPS only from the AWS-managed CloudFront origin-facing prefix list and forwards only requests carrying a high-entropy CloudFront origin header. Direct origin access receives no application response.

| Service | Why it is selected now |
| --- | --- |
| Route 53 | Canonical A/AAAA aliases and optional external HTTPS health check after explicit DNS approval. |
| ACM | Managed certificate issuance and renewal; CloudFront’s viewer certificate must be in `us-east-1`, while the ALB certificate remains in the origin region. |
| CloudFront | Global edge delivery, compression, IPv6, HTTPS redirection, and immutable static-asset caching. |
| AWS WAF | Managed common-threat, bad-input and IP-reputation rules plus a deliberately moderate per-IP rate limit. |
| ALB | TLS termination at the origin, target health checks, and safe rolling deployment routing. |
| ECS/Fargate | Runs the existing non-root standalone container without server management; the production baseline is two tasks in separate AZs. |
| ECR | Immutable, scan-on-push container releases with lifecycle cleanup. |
| CloudWatch/SNS | Application logs, metrics, dashboards, alarms, and confirmed-email notifications. |
| S3/DynamoDB | Encrypted, versioned Terraform state with state locking. |

This design follows AWS guidance to use HTTPS from CloudFront to a custom origin and to restrict an internet-facing ALB with a CloudFront header and managed prefix list. See [CloudFront HTTPS to origin](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-https-cloudfront-to-custom-origin.html) and [restricting ALB access](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/restrict-access-to-load-balancer.html).

## Cache policy

Public `GET`/`HEAD` pages use CloudFront’s managed optimized cache policy; Next.js immutable build assets remain edge-cacheable and compressed. `/api/*`, including `/api/health`, uses the managed caching-disabled policy so health, deployment, and future dynamic responses are never served stale. A successful deployment invalidates `/*`, keeping document updates prompt. No personalized content exists in Phase 1; when it does, it must use a separate behavior with caching disabled unless explicitly designed for private caching.

## Availability scope

Initial production objective: 99.9% monthly availability for the public site, measured by the Route 53 HTTPS health check and CloudWatch metrics. CloudFront, WAF, ALB, multiple ECS tasks, and two AZs protect against individual task and single-AZ failures. The current design does not claim 99.99%: it remains single-region, depends on AWS control planes and DNS, and has no second regional origin. Phase 1.1 should add a second-region recovery design only after real traffic and budget justify it.

Staging is intentionally less redundant (one task and one NAT gateway). Production must use two NAT gateways, one per AZ; using one NAT in production creates an avoidable outbound-dependency single point of failure.
