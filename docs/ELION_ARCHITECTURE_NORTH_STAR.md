# ELION — Architecture North Star & Provider-Neutral Contracts

**Version:** 0.1 (draft for review)
**Status:** Design north star. Nothing here is built yet. This document exists so
that what we build *today* on free infrastructure cannot become a dead end for the
intelligent platform ELION is meant to become.

---

## 1. The two truths

**Today.** ELION's public site is live on Cloudflare Pages. Its contribution
backbone will be a GitHub organization. Contribution is manual: people browse,
pick up issues, open pull requests.

**Destination.** ELION is a global, intelligent engineering network that
continuously turns human capability into coordinated technical work — that can say
to a capable person, anywhere, at any hour, *"here are three things you can
meaningfully contribute to right now,"* and can turn a problem into people → work →
review → verification → knowledge → the next problem, as a continuous loop.

GitHub is **Phase 1 infrastructure**. ELION Core is the **destination**. This
document is the bridge that guarantees the first does not constrain the second.

## 2. The design law: substrate independence

> **Everything ELION builds implements ELION's own contracts. No ELION concept is
> defined in terms of a vendor's data model. GitHub (and Cloudflare, and every
> future provider) is an *implementation* of a contract, never the contract
> itself.**

Concretely, three rules bind every decision:

1. **Model in ELION terms first.** Identity, work, capability, knowledge, and
   contribution are ELION entities with ELION IDs. GitHub is one *adapter* that
   backs them today.
2. **Own the data.** Anything that accrues value — contributor records, work units,
   decisions, contribution history — must be continuously exportable to
   ELION-controlled storage (provider API → structured JSON). No value lives only
   inside a vendor.
3. **Replace, don't rewrite.** Each contract can later be served by an ELION-native
   service *behind the same contract*, so the substrate is swapped out one piece at
   a time with no rewrite of the whole.

If a proposed step would violate any of these, it is the wrong step — however
convenient the vendor makes it.

## 3. The provider-neutral entity model (the contracts)

These are the long-lived ELION entities. For each: what it is, its minimal data
contract, how GitHub backs it *today*, and the ELION-native *target*. The contract
is stable; the backing changes.

### 3.1 ELION ID — identity
- **What.** A stable, provider-independent subject identity for every contributor.
- **Contract.** `elion_id` (internal, permanent) ↔ one or more external identities
  (`github`, later generic OIDC). Never expose or key on the vendor's user id.
- **Today.** People authenticate with their GitHub account; we record the mapping
  `elion_id → github_login` in our own export, not the reverse.
- **Target.** An OIDC/OAuth-2.1 identity boundary; GitHub becomes one login provider
  among several. *Rule: a hosting/vendor account is never ELION's identity.*

### 3.2 Capability Graph — what a person can actually do
- **What.** Evidence-based skills, demonstrated work, interests, learning goals,
  availability, time zone, and trust level — the substrate for matching.
- **Contract.** `capability { elion_id, skill, level, evidence[] }` where every
  claim links to *evidence* (a merged PR, a reviewed design, a paper), never a
  self-assertion alone.
- **Today.** Seeded from the *Contributor interest* intake (declared) and from
  GitHub activity (demonstrated), captured into our export.
- **Target.** A verified capability/trust graph. *Rule: capability is earned from
  evidence, not claimed in a profile.*

### 3.3 Work Unit — a meaningful, reviewable piece of work
- **What.** The atomic unit the matching engine reasons over — e.g. the SKYBRIDGE
  `THM-042` thermal problem.
- **Contract.** `work_unit { id, title, project, needs[] (skills), effort_estimate,
  dependencies[], status, verification_criteria, safety/permission_level }`.
- **Today.** A GitHub Issue authored via a *structured* template + labels that carry
  these fields; a requirement ID (`SKY-THM-042`) in the title.
- **Target.** A Work Engine that decomposes projects into work units and tracks
  their graph. *Rule: work is structured data from day one, not only free text.*

### 3.4 Project — a coordinated body of work
- **Contract.** `project { id, mission_fit, peaceful_purpose, work_units[],
  maintainers[], status }`.
- **Today.** A repository (created only when mature) + its issues/PRs.
- **Target.** An ELION project system spanning multiple substrates.

### 3.5 Knowledge Graph — how everything relates
- **What.** The relationships between requirements, designs, research, code, tests,
  and decisions — so context is navigable, not buried.
- **Contract.** Typed, ID-addressed nodes (`REQ-…`, `ADR-…`, `TEST-…`, `DESIGN-…`)
  with typed links (`implements`, `verifies`, `depends-on`, `decided-by`).
- **Today.** Requirement IDs, **Architecture Decision Records (ADRs)** as markdown,
  and disciplined cross-linking in issues/PRs/docs.
- **Target.** A queryable knowledge graph feeding the AI engineering layer. *Rule:
  capture relationships as structured IDs/links now, even by convention.*

### 3.6 Contribution Record — the durable ledger
- **Contract.** `contribution { elion_id, work_unit, artifact, reviewed_by,
  verified, timestamp }`.
- **Today.** git history + issue/PR history, exported to ELION storage.
- **Target.** A portable, permanent record of what humanity built through ELION —
  independent of any vendor that might change terms.

### 3.7 Review & Verification — how contribution becomes trustworthy engineering
- **What.** The hard core of the whole vision: evidence that work is *correct*, not
  merely submitted.
- **Contract.** `verification { work_unit, method, evidence, reviewer_capability,
  outcome }`.
- **Today.** PR review + CI checks + required approvals.
- **Target.** Verification workflows (test, simulation, independent review) sized to
  the work's risk. *This is where engineering trust — and dual-use safety — lives.*

### 3.8 Intelligence / Matching — the crown jewel, built last
- **What.** The engine that connects `person ↔ work`, `person ↔ person`, `work ↔
  work` and surfaces *"three things you can contribute now."*
- **Contract.** A recommender over the Capability Graph × Work Unit graph, returning
  ranked matches with *reasons* grounded in evidence.
- **Today.** Nothing. Deliberately. Its inputs (structured work + verified
  capability + volume) do not exist yet.
- **Target.** An ELION-native matching service. *Rule: it earns its value only at
  data volume; we build the data first, the matcher when there is something real to
  match.*

### 3.9 AI Engineering Layer — help understand context and navigate
- **Contract.** `caller → authorization/policy → AI gateway → permission-aware
  retrieval → cited answer → audit`. Provider-neutral adapters (OpenAI, Anthropic,
  Gemini, local/open models).
- **Rule (from ELION principles).** Retrieval permissions are evaluated **before**
  anything reaches a model. **The model is never the authorization layer.** Answers
  cite sources. Provider keys stay server-side.

## 4. What this changes about what we do *today*

Using GitHub without being captured by it means adopting a few disciplines now, so
the right data accumulates from the first contribution:

- **Requirement IDs.** Give real requirements stable IDs (`SKY-THM-042`) and use them
  in issue titles, so work units are addressable later.
- **Structured work-unit fields.** Keep issue templates field-driven (needs, effort,
  dependencies, verification), so an issue is a Work Unit record, not just prose.
- **ADRs.** Record significant decisions as `docs/adr/ADR-000N-*.md`. Cheap now,
  invaluable to the future knowledge graph.
- **Evidence links.** Encourage every capability claim and contribution to link to
  evidence (a PR, a test, a design).
- **Data escrow.** Plan a simple periodic export (GitHub API → JSON in an
  ELION-controlled store) so the future graphs seed from real history — no cold
  start, no lock-in.

None of this slows the backbone down. It is mostly *conventions*, adopted early.

## 5. Maturity phases (each gated on real need, not fashion)

1. **Substrate (now).** Cloudflare front door + GitHub org backbone. Manual
   contribution. Adopt the conventions in §4.
2. **Structured data + read models.** Work units, capability signals, and knowledge
   links accumulate and are exported. Simple dashboards read the export.
3. **ELION-native services replace substrate pieces.** ELION ID, Work Engine,
   Knowledge Graph — introduced *behind the contracts*, one at a time, when volume
   justifies each.
4. **Intelligence & matching.** The recommender and AI engineering layer, once there
   is verified capability and structured work to reason over.
5. **The loop.** Problem → People → Work → Review → Verification → Knowledge → next
   Problem, running continuously.

We do **not** skip ahead. Building the matcher before there is data, or ELION ID
before there are contributors, would be premature — exactly the failure mode ELION's
own principles warn against ("build only what the current workload requires").

## 6. Honest constraints

- **Cold start.** Intelligent matching is worthless with a handful of contributors
  and issues; it becomes powerful at scale. The near-term job is generating
  structured, verified data and a real community — not building the AI first.
- **Verification is the hard part.** Turning contribution into *trustworthy*
  engineering (and enforcing peaceful-use safety in dual-use domains) is harder than
  matching, and more important. It deserves the most design care.
- **Cost.** The substrate is free. ELION-native services (identity, databases,
  storage, compute, AI inference) will cost real money — introduced only when a real
  capability needs them, funded deliberately.
- **This is a north star, not a build order for tomorrow.** It exists to keep every
  small step pointed at the destination.

---

*GitHub is how ELION collaborates today. This document is how ELION stays free to
become something GitHub is not: an intelligent engine that turns human capability,
anywhere in the world, into coordinated, verified, production engineering.*
