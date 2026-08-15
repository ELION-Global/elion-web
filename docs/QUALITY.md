# Quality and delivery checks

The public site is verified through the following commands:

- `npm run type-check` verifies strict TypeScript compilation.
- `npm run lint` applies the Next.js ESLint rules through the ESLint CLI.
- `npm run test` checks public-content, accessibility-landmark, and security-header contracts.
- `npm run build` produces the optimized, standalone production output.
- `npm run test:performance` reports the aggregate JavaScript chunk size and fails above the 1 MB budget. Override the threshold with `PERFORMANCE_BUDGET_BYTES` only with a documented performance review.
- `npm run test:smoke` launches the standalone output and validates the homepage, health endpoint, and key response headers.
- `npm run audit` fails for high- or critical-severity dependency advisories.

GitHub Actions runs all of these checks on pull requests and updates to `main`. The current automated checks are intentionally dependency-light; a browser-based accessibility audit should be added when the delivery environment supplies a maintained browser test runner.
