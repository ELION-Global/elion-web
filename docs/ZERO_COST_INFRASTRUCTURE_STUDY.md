# Zero-cost / near-zero-cost advanced infrastructure study

**Decision status:** architecture research only. No provider account, DNS record, deployment, credential, or cloud resource is created by this study.

**Research date:** 2026-08-15. Pricing and free-tier terms change frequently; re-check the linked primary sources before adopting a service.

## Executive decision

**ELION can run its current public platform at near-zero recurring hosting cost without creating a technical dead end.** The chosen direction is **Architecture E: portable edge-first public delivery**:

`DNS and edge security → Cloudflare Pages static site → optional, narrow Cloudflare Worker APIs`

The public site is currently a mostly static Next.js application. It does not need a permanently running container, load balancer, NAT gateways, database, or private network to deliver its present functionality. Retire none of the existing AWS Terraform: preserve it as the reviewed paid-origin reference and use it when authenticated, stateful, or regulated workloads make its controls proportionate.

This is not a claim that a future global engineering platform can remain free. It is a decision to avoid paying for idle compute before ELION has a workload that needs it.

### The one unavoidable early cost

A public custom domain is normally a paid annual registration. This is not hosting and cannot reliably be made zero-cost. Budget roughly `$10–25/year`, depending on TLD, registrar, privacy service, and tax. Keep the registrar separate from the hosting provider, enable registrar MFA, registry lock where available, and use a distinct break-glass recovery process.

## What “free” means

| Category | Meaning | ELION position |
| --- | --- | --- |
| Open-source software | The software license permits use, modification, and self-hosting. It does not supply servers, support, backups, or an SLA. | Next.js, Docker, PostgreSQL, OpenTelemetry, Terraform, OpenAPI and GitHub Actions workflows remain portable building blocks. |
| Free hosting | A provider serves a workload at no monthly charge within terms and quotas. It can be paused, throttled, changed, or withdrawn. | Suitable for the anonymous public site only while its limits and availability are actively monitored. |
| Free cloud credits | Temporary promotional spending allowance. | Never treat as production architecture or recurring budget. |
| Free-tier infrastructure | Metered service with an included allowance and a paid path above it. | Use only with a hard quota/alert and a documented failure behavior. |
| Genuine zero-cost infrastructure | No paid service or domain is required. | Not realistic for a branded public organization: DNS ownership, people, support, and continuity have costs even if hosting is free. |

## Current AWS assessment

The existing AWS design is technically sound for a production-shaped, anonymous public service: global edge, WAF, private multi-AZ container origin, controlled release path, immutable images, and an explicit recovery model. It is a good **later** design for a dynamic service.

It is not a good cost/capability match for the current public site. Two NAT gateways, an ALB, two always-on Fargate tasks, logging, WAF and staging create roughly `$210–245/month` for continuously running low-traffic staging plus production under the existing planning model. That cost occurs at zero visitors. CloudFront's free allowance does not remove the private-origin fixed costs. The architecture should therefore remain a reviewed migration target, not the first public launch target.

## Evaluation assumptions

“Users” means monthly unique visitors, not authenticated accounts. The estimates are planning bands, not service quotes. They assume an anonymous, cacheable public site, 10 page views per visitor per month, approximately 1.5 MB transferred per page view, and no file uploads, AI inference, database queries, email, or paid monitoring. A non-cacheable API, attack traffic, large assets, or AI usage changes the result immediately.

| Users/month | Approximate page views | Approximate transfer |
| ---: | ---: | ---: |
| 0 | 0 | 0 GB |
| 100 | 1,000 | 1.5 GB |
| 1,000 | 10,000 | 15 GB |
| 10,000 | 100,000 | 150 GB |
| 100,000 | 1,000,000 | 1.5 TB |

## Architecture comparison

Scores are relative for ELION's **current** public platform: 5 is strongest. A high score is not a promise of a provider SLA.

| Architecture | Global performance | Security | Scale path | Portability | Operational load | Best use | Recommendation |
| --- | ---: | ---: | ---: | ---: | ---: | --- | --- |
| A. Current AWS enterprise origin | 5 | 5 | 5 | 4 | 3 | Stateful, always-on service with paid operating budget | Retain as later reference; do not launch it first. |
| B. Cloudflare OpenNext on Workers | 5 | 4 | 4 | 3 | 4 | Full Next.js SSR/API at the edge | Viable, but not necessary for the current static surface. |
| C. Static Pages plus serverless backend | 5 | 4 | 4 | 4 | 5 | Cacheable public site with a few dynamic APIs | Strong foundation. |
| D. Open-source portable multi-provider | 3 | 3 | 5 | 5 | 2 | Deliberate self-managed/sovereign platform later | Design principles only; do not operate this now. |
| E. Portable edge-first public delivery | 5 | 4 | 5 | 4 | 5 | Current site, with staged migration to C/A/D | **Choose this.** |
| F. Oracle Always Free container origin | 2 | 2 | 3 | 3 | 2 | Lab, continuity exercise, or noncritical tool | Do not make the public origin depend on it. |

### A. Current AWS enterprise design

`CloudFront + WAF → ALB → private ECS/Fargate in two AZs → ECR/CloudWatch/SNS`

- **Strengths:** closest fit to mature stateful workloads; predictable network isolation; two-AZ task recovery; established Terraform and GitHub OIDC design; Docker portability.
- **Limits:** high idle cost, staging duplicates most fixed cost, more IAM/network operations, and single-region origin remains below multi-region availability.
- **Future compatibility:** excellent for APIs, PostgreSQL, background jobs, object storage, and eventually ML integrations. Kubernetes is still not justified merely because it is portable.
- **Cost band:** `$130–150` at 0–1,000 users; `$145–175` at 10,000; `$280–380+` at 100,000 under the existing model. This excludes a database and external services.

### B. Cloudflare edge-first full Next.js

`Cloudflare DNS/WAF/CDN → Next.js on Workers through OpenNext`

Cloudflare documents support for the App Router, route handlers, SSR, ISR, Server Actions and streaming through its OpenNext adapter. This preserves the current application model, including the dynamic health route, but introduces an adapter and Worker runtime constraints.

- **Strengths:** global execution without origin servers; cache and application code colocated; no cold-start-oriented container fleet; existing Next.js routes can remain dynamic.
- **Limits:** Workers Free is limited to 100,000 requests/day, 10 ms CPU per request, 128 MB memory, 50 subrequests per request, five cron triggers, 3 MB Worker size and 20,000 static assets. The Paid plan starts at `$5/month`; its limits and billing must be accepted before workloads exceed free quotas.
- **Security:** Cloudflare Free includes automatic DDoS protection, Bot Fight Mode, five custom WAF rules, one rate-limiting rule, and a free managed ruleset. It is not equivalent to enterprise bot management, central audit logs, private network isolation, or an SLA.
- **Cost band:** `$0` at 0–10,000 users if request/CPU limits hold; `$0–5` at 100,000 users, but the free cap is daily rather than monthly. Treat the `$5` paid plan as the safe first expansion point, not a guarantee of all future usage being `$5`.
- **Portability:** application code remains TypeScript/Next.js, but runtime bindings, cache behavior and the OpenNext adapter require contract tests before a provider move.

### C. Static edge-first plus serverless backend

`Cloudflare Pages static output → separate Workers only for /api/* → standards-based data services when needed`

The public pages, metadata, images, sitemap and robots output can be static. The only current route that requires execution is `/api/health`; host it as a tiny Worker/Pages Function or replace it with a separately monitored static availability document. A static health document proves delivery, not dynamic-origin health, so use the Worker when a live API contract is required.

- **Strengths:** zero origin runtime for the normal visitor path; fastest cacheable delivery; easy rollback through immutable deploys; the public presentation can survive a backend outage; fewer attackable application components.
- **Limits:** no server-rendered personalisation, user sessions, writes, long jobs, WebSockets, or private file processing in the static deployment. Those capabilities must be separate services with separate security boundaries.
- **Cost band:** `$0` at 0–100,000 users for a cacheable site if Pages fair-use limits hold; `$0–5` when the narrow Worker needs the paid plan. This is a quota-bound operational assumption, not an SLA.
- **Migration:** move dynamic capabilities one route family at a time behind stable `/api/v1` contracts. Do not turn the public Pages project into a general backend.

### D. Open-source portable multi-provider architecture

`CDN/edge → container or function API → PostgreSQL → S3-compatible objects → queue/workers → OpenTelemetry`

This architecture uses Docker, PostgreSQL, S3-compatible objects, OpenAPI, OIDC, OpenTelemetry, Terraform and GitHub Actions. It can run on AWS, OCI, a European provider, a university/research cluster, or later Kubernetes. It is the correct **target shape**, but operating it at multiple providers today creates split IAM, backup, incident, compliance and data-consistency responsibilities without user value.

- **Strengths:** maximum exit capability; avoids database and observability lock-in; supports CAD file storage, simulation workers, source integration, research and governance modules.
- **Limits:** multi-provider is not high availability by default. It is an operations program with replication, key management, tested recovery, data residency and people costs.
- **Cost band:** `$0–10` only while every component fits independent free quotas; `$25–100+` by 10,000 users if a reliable PostgreSQL service, backups and observability are needed; no credible fixed estimate at 100,000 users without workload measurements.
- **Decision:** establish the interfaces now; defer the platform operation until requirements justify it.

### E. Portable edge-first public delivery — selected

This combines C's static delivery with D's portability discipline and keeps A as an escalation path.

```text
GitHub repository
  ├─ quality workflow: type-check, lint, tests, build, audit, Docker build
  ├─ Cloudflare Pages: immutable static public release
  └─ Cloudflare Worker: /api/health and future narrow anonymous APIs

Cloudflare DNS / CDN / WAF
  └─ globally cached public documents and assets

Future private platform boundary
  └─ /api/v1 → provider-neutral service → PostgreSQL / S3-compatible objects / queue
```

- **Current cost band:** hosting `$0` from 0 through 100,000 cacheable visitors if quotas/fair use hold; `$0–5` for dynamic Worker expansion; domain renewal remains separate.
- **Security posture:** HTTPS, CSP and the existing response-header policy are reproduced at the edge; DDoS/Bot Fight Mode, a restricted custom-rule set and one rate-limit rule protect the public surface. GitHub remains the source of truth; use a Cloudflare API token limited to the exact Pages/Worker project and protected GitHub Environments if API deployment is selected.
- **Observability:** retain build/test evidence in GitHub; use Cloudflare security/analytics views for edge signal; add a single external public HTTPS monitor only after a named operations owner accepts its terms and alert channel. This has less retention and control than CloudWatch and no free-tier SLA.
- **Future compatibility:** no public identity or database is created prematurely. Docker continues to validate deployability. The future backend is defined by contracts, not by an edge binding.

### F. Oracle Always Free origin — considered and rejected

OCI Always Free supplies up to two Arm OCPUs/12 GB RAM total, 200 GB block storage, one flexible load balancer, 10 TB outbound transfer/month, and a set of monitoring/notification allowances. This is technically capable of hosting a small Docker origin at `$0`.

It is not selected because capacity can be unavailable at provisioning, resources are limited to the home region, idle Always Free instances can be reclaimed, and it turns ELION into operator of an internet-facing VM. It is useful for a reproducibility lab or a noncritical self-hosted tool, not the sole public platform origin.

## Provider capability and restriction review

| Provider / service | Real capability | Important restriction or cost truth | ELION decision |
| --- | --- | --- | --- |
| Cloudflare Pages + Workers | Global static delivery, edge functions, CDN, DNS, DDoS controls, WAF primitives, R2/D1/KV/DO ecosystem. | Workers Free is 100k requests/day with strict CPU/memory limits; free plans lack an SLA and advanced bot/security controls. | Primary public delivery candidate. |
| AWS | Complete enterprise platform and strongest current Terraform path. CloudFront includes an always-free allowance. | ALB, NAT, Fargate and WAF create paid idle baseline; free trials/allowances do not make the proposed origin free. | Deferred dynamic-platform target. |
| GitHub | Source control, protected environments, Dependabot and CI/CD; standard runners are free for public repositories. | Private repositories receive a finite plan allowance (GitHub Free: 2,000 minutes and 500 MB artifact storage); Actions are not runtime hosting. | Keep as source and quality plane. |
| Vercel | Excellent Next.js developer experience, CDN, functions, WAF and previews. | Hobby is personal/non-commercial only; it pauses at free limits and private-repository collaboration is restricted. | Not eligible for ELION production on the Hobby plan. |
| Netlify | Static/edge hosting, functions, custom domains, basic WAF/rate limits and global CDN. | Free has a hard 300-credit monthly cap; reaching it pauses all projects in the account, and only one free member administers it. | Viable backup proof-of-concept, not primary. |
| Google Cloud / Firebase | Useful mobile/auth/analytics ecosystem; Spark has no payment method requirement. | Spark disables a product for the rest of the month when quota is exceeded and cannot access paid Google Cloud features. | Do not make it an ELION core backend. |
| Azure | Broad enterprise services and some always-free monthly amounts. | Some offers expire after 12 months; no coherent zero-cost production architecture follows from the catalogue. | Later enterprise evaluation only. |
| Oracle Cloud | Always Free compute, block/object storage, load balancing, monitoring and autonomous database options. | Home-region restriction, provisioning capacity risk, idle reclamation and VM operations. | Lab/secondary exercise only. |
| Render | Static sites and Docker-friendly services/datastores. | Render explicitly says not to use free instances for production; free web services spin down after 15 minutes and cold start in about a minute. | Not suitable for public production. |
| Railway | Docker deployment, managed services, health checks and global regions on paid plans. | Free is a trial; production Hobby starts at `$5` and global regions are not on its free plan. | Useful paid fallback, not zero-cost. |
| Fly.io | Portable container deployment close to users. | Current free allowances are legacy-only; new usage is paid/trial based. | Not a zero-cost baseline. |
| Supabase | Managed Postgres, auth, storage, realtime and APIs. | Free: 500 MB DB, 1 GB files, 5 GB egress and projects pause after one week of inactivity; no SLA. | Prototype data layer only, not ELION ID. |
| Neon | Serverless Postgres, branching, autoscaling and optional Auth. | Free: 0.5 GB/project and 100 CU-hours/month; no private network/SLA at this tier. | Strong development database, not production system of record. |
| Turso | Edge-oriented SQLite/libSQL; good for read-heavy replicated metadata. | SQLite semantics are not a substitute for ELION's future relational system of record; current plan/limit terms must be verified before selection. | Optional read model later, not core database. |

## Security comparison and hard rules

| Control | Selected early architecture | Paid-platform escalation |
| --- | --- | --- |
| Edge DDoS and bot filtering | Cloudflare automatic DDoS, Bot Fight Mode, limited WAF custom/rate rules. | Managed WAF/bot controls after traffic evidence or security need. |
| Deployment identity | GitHub protected Environment plus least-privilege, project-scoped Cloudflare token; no personal token or account-wide token. | GitHub OIDC to distinct cloud roles when deploying AWS. |
| Supply chain | Lockfile, audit, Dependabot, Docker build verification, pin Actions to reviewed SHAs. | Add signed artifacts/SBOM and image admission policy before dynamic services. |
| Secrets | No secrets in static output. Store deploy token only in protected environment; rotate and audit it. | Use cloud secret manager, workload identity and break-glass access process. |
| Data and identity | No public account, PII, uploads, or user data at this stage. | Separate identity service and data perimeter before ELION ID. |
| Backups and recovery | Git repository and immutable deployments; export configuration as code. | Encrypted database/object backups, restoration drills, audit-log retention and RTO/RPO. |

Do not present a free edge plan as a security equivalent of the current AWS model. The early public service is safer because it has no accounts, writes, database, origin server, or privileged application role—not because free hosting removes risk.

## Future platform compatibility

The following interfaces are mandatory before adding stateful modules. They prevent a rewrite when hosting changes.

| Concern | Required boundary | Do not do |
| --- | --- | --- |
| APIs | Versioned REST/OpenAPI or explicitly versioned RPC contract under `/api/v1`; schema validation at boundary. | Bind browser code directly to a database/provider SDK. |
| Identity | OIDC/OAuth 2.1 capable identity boundary; internal subject IDs independent of provider IDs; RBAC/ABAC policy service. | Make a hosting-provider account the ELION identity. |
| Data | PostgreSQL as system of record; migrations in source; backups and restore test. | Use a free database as a permanent undocumented source of truth. |
| Objects | S3-compatible object contract, content hash, malware scan, retention/classification metadata. | Store CAD/research files on ephemeral disks or in Git history. |
| Events/jobs | Idempotent job interface, durable queue selection later, retry/dead-letter semantics. | Run engineering/simulation work in request handlers or free cron assumptions. |
| Telemetry | OpenTelemetry traces/metrics/logs, structured correlation IDs and exportable sink. | Couple observability to one dashboard with no export path. |
| Compute | OCI/Docker images and declared resource limits; event/API interfaces. | Introduce Kubernetes before there are multi-service scheduling needs. |

### AI abstraction layer

No AI provider should be placed on the public request path yet. Add an internal `ai` capability only when there is an approved use case and cost owner:

```text
Caller → authorization/policy → AI gateway → provider adapter
                           ├─ retrieval service → cited source chunks
                           ├─ audit event store
                           ├─ rate/budget limiter
                           └─ OpenAI | Anthropic | Gemini | local/open model adapters
```

The gateway contract must carry: caller identity and permissions, purpose, model/provider selection policy, document classification, source citations, token/compute budget, retention rule, and immutable audit event. Retrieval must filter before model prompting, return source citations to the caller, and never use a provider as the authorization layer. Provider keys stay server-side; users never receive them. Local models are a future execution adapter, not an early-stage cost-free promise.

## Migration plan and gates

1. **Decision gate:** approve Architecture E and a domain/registrar owner. No provider setup occurs from this document.
2. **Static compatibility spike:** verify the existing Next.js routes can export static documents. Move the health contract into a small Worker only if a live `/api/health` response remains required. Reproduce CSP, HSTS decision, metadata, redirects, cache headers, and all current smoke checks.
3. **Non-production preview:** use a separate Cloudflare project/hostname. Test headers, accessibility, SEO, mobile performance, cache purge/rollback, WAF false positives, and the disabled/failed deployment path.
4. **Public launch gate:** document threshold alerts; confirm a named owner can restore the prior deployment and change DNS. Retain the AWS Terraform untouched. Do not publish user identity, form submissions, uploads, or paid integrations on the free surface.
5. **First dynamic module gate:** when ELION needs identity, writes, private data, background work, or an availability commitment, choose a paid provider and introduce the provider-neutral API, PostgreSQL, object-store, telemetry and backup contracts first.
6. **AWS escalation gate:** use the existing AWS design when the above workload needs private networking, always-on regional compute, comprehensive audit/monitoring, higher assurance, or measured Worker/database costs make its fixed baseline rational.

## Final recommendation

Adopt **Architecture E — portable edge-first public delivery** for the current public platform. It produces the best technical capability per dollar because it delivers globally cached content at the edge, preserves the current TypeScript/Next.js/Docker quality process, gives a narrow path for dynamic APIs, and refuses premature database, identity, Kubernetes, or multi-provider operations.

ELION can build a genuinely advanced public platform with near-zero recurring infrastructure cost at this stage. It cannot build the future authenticated, collaborative, AI-assisted engineering platform at zero cost without accepting material reliability, data-protection, observability, and operational risk. The correct trigger for paid infrastructure is a real stateful capability—not the desire to look enterprise before the workload exists.

## Primary research sources

- [Cloudflare Workers pricing](https://developers.cloudflare.com/workers/platform/pricing/), [limits](https://developers.cloudflare.com/workers/platform/limits/), [Next.js/OpenNext support](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/), [Pages limits](https://developers.cloudflare.com/pages/platform/limits/), [WAF availability](https://developers.cloudflare.com/waf/), and [R2 pricing](https://developers.cloudflare.com/r2/pricing/)
- [AWS CloudFront pricing FAQ](https://aws.amazon.com/cloudfront/faqs/) and [AWS Free networking offers](https://aws.amazon.com/free/networking/)
- [GitHub Actions billing and included usage](https://docs.github.com/en/billing/concepts/product-billing/github-actions) 
- [Vercel Hobby terms and limits](https://vercel.com/docs/plans/hobby) and [fair-use/commercial restriction](https://vercel.com/docs/limits/fair-use-guidelines)
- [Netlify pricing and credit limits](https://www.netlify.com/pricing/)
- [Firebase pricing plans](https://firebase.google.com/docs/projects/billing/firebase-pricing-plans)
- [Oracle Always Free resources](https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier_topic-Always_Free_Resources.htm)
- [Render free-instance limitations](https://render.com/docs/free), [Railway pricing](https://railway.com/pricing), and [Fly.io pricing](https://www.fly.io/docs/about/pricing/)
- [Supabase pricing](https://supabase.com/pricing) and [Neon pricing](https://neon.com/pricing)
