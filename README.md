# ELION

ELION is a global engineering initiative for peaceful technologies that improve human life.

This repository contains the foundational project structure, public-facing documentation, and operating guidance for the ELION ecosystem.

## Structure

- `docs/` — mission, vision, platform, brand, principles, and roadmap
- `public/branding/` — brand assets and logo artifacts
- `src/` — application source code
- `tests/` — automated tests

## Documentation

See the docs folder for the governing project statements and strategic direction.

## Local verification

Use `npm run dev` for local development. Before submitting a change, run `npm run type-check`, `npm run lint`, `npm run test`, and `npm run build`. After a build, `npm run test:performance` and `npm run test:smoke` validate the production output.

Deployment and operational guidance is in `docs/DEPLOYMENT.md`; quality checks and the performance budget are documented in `docs/QUALITY.md`.
