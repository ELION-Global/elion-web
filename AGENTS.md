# ELION AI ENGINEERING RULES

1. Read `/docs` before making architectural decisions.
2. Never invent project facts.
3. Never modify the official logo without explicit instruction.
4. Never expose secrets.
5. Prefer accessible, performant implementations.
6. Do not add dependencies without justification.
7. Preserve modular architecture.
8. Run tests before declaring completion.
9. Never make destructive changes without confirmation.
10. Keep documentation synchronized with architecture changes.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
