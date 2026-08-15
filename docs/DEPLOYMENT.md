# Deployment architecture

The application produces a standalone Next.js server image and includes `/api/health` for load-balancer and container health checks. It has no runtime dependency on a third-party API, so the public experience remains available when optional future services are unavailable.

## Recommended AWS shape

For the initial public platform, deploy the container to a managed container runtime behind an Application Load Balancer, with CloudFront in front for global edge delivery. Use Route 53 for DNS, ACM for TLS certificates, CloudWatch for logs, metrics, alarms, and synthetic availability checks, and AWS WAF at the CloudFront edge. Store any future secret configuration in Secrets Manager or SSM Parameter Store; never put it in a build image or repository.

The deliberately small initial footprint is:

`Route 53 → CloudFront + WAF → ALB → container service → ELION image`

This keeps SSR, metadata routes, the Open Graph image, and the dynamic health endpoint available while allowing static assets to be cached at the edge. It can evolve into multi-AZ service capacity, deployment canaries, central logging, backups, and a separate API tier as the platform grows.

## Production checklist

- Set `NEXT_PUBLIC_SITE_URL` to the canonical HTTPS domain before deployment.
- Terminate TLS with ACM and redirect HTTP to HTTPS at CloudFront.
- Set `ENABLE_HSTS=true` only after every production subdomain covered by the header is HTTPS-ready.
- Configure the load balancer/container health check for `GET /api/health` and alert on failures.
- Inject secrets at runtime from AWS-managed secret storage; the current public app needs none.
- Restrict container task permissions to only the services it requires.
- Enable CloudFront and WAF logging, CloudWatch alarms, and a backup/rollback deployment procedure.
- Roll out first to a non-production domain and verify headers, canonical URL, sitemap, robots file, and social image.

This repository contains no cloud credentials or infrastructure provisioning. Availability targets, regional redundancy, recovery objectives, and cloud spend limits must be agreed before production infrastructure is created.
