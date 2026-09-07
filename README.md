# viavitae-demos

[![CI](https://github.com/Via-Vitae/viavitae-demos/actions/workflows/ci.yml/badge.svg)](https://github.com/Via-Vitae/viavitae-demos/actions/workflows/ci.yml)
[![Compliance](https://github.com/Via-Vitae/viavitae-demos/actions/workflows/compliance-check.yml/badge.svg)](https://github.com/Via-Vitae/viavitae-demos/actions/workflows/compliance-check.yml)
[![CodeQL](https://github.com/Via-Vitae/viavitae-demos/actions/workflows/codeql.yml/badge.svg)](https://github.com/Via-Vitae/viavitae-demos/actions/workflows/codeql.yml)
[![Licence](https://img.shields.io/badge/licence-Proprietary-0E1B3D?labelColor=F7F4EC)](LICENSE)
[![EU hosted](https://img.shields.io/badge/hosted-EU-0E1B3D?labelColor=F7F4EC)](SECURITY.md)

> Sandboxed live demo templates — ViaVitae's primary sales channel.
> Nine vertical demos generated from `viavitae-template`, deployed to
> `demo.viavitae.com/<type>`, with a nightly self-healing reset.

`viavitae-demos` holds every customer-facing demo template as a pnpm/Turborepo
monorepo. Each template is a standalone Next.js application that shares a common
design system, seed data layer and reset mechanism. All content uses fictional
entities and real liturgical imagery (CC0 / own photography) with trilingual
alt-text (LT/EN/RU).

---

## Table of Contents

- [Templates](#templates)
- [Tier system](#tier-system)
- [Repository layout](#repository-layout)
- [Development workflow](#development-workflow)
- [Reset mechanics](#reset-mechanics)
- [Quality gates](#quality-gates)
- [Security and compliance](#security-and-compliance)
- [Documentation](#documentation)
- [Licence](#licence)

---

## Templates

| # | Template | Tier | Pages | Demo URL |
|---|----------|------|-------|----------|
| 1 | `basilica` | VIP flagship | ~20 | `demo.viavitae.com/basilica` |
| 2 | `cathedral` | Normal default | ~15 | `demo.viavitae.com/cathedral` |
| 3 | `diocese` | Diocese-wide | ~15 | `demo.viavitae.com/diocese` |
| 4 | `deaneries` | Economy | ~10 | `demo.viavitae.com/deaneries` |
| 5 | `parish-church` | Economy default | ~10 | `demo.viavitae.com/parish-church` |
| 6 | `funeral-services` | Vertical | ~12 | `demo.viavitae.com/funeral-services` |
| 7 | `cemetery-services` | Vertical + GIS | ~10 | `demo.viavitae.com/cemetery-services` |
| 8 | `online-store` | E-commerce | ~10 | `demo.viavitae.com/online-store` |
| 9 | `vendor-dashboard` | Marketplace | ~8 | `demo.viavitae.com/vendor-dashboard` |

## Tier system

| Tier | Pages | Price | Default template | Includes |
|------|-------|-------|------------------|----------|
| Economy | ~10 | €900 | `parish-church` | Core pages, donation flow |
| Normal | ~15 | €1,900 | `cathedral` | Economy + gallery, news, events |
| VIP | ~20 + E-commerce | €2,900 | `basilica` | Normal + shop, CRM dashboard, AI pastoral |

Runtime source of truth: `config/tiers.config.ts`. Human-readable reference:
`docs/tiers.md`. Tier upgrade teasers are baked into Economy and Normal templates.

## Repository layout

```text
viavitae-demos/
├── README.md                         # This file
├── LICENSE                           # Proprietary — All Rights Reserved
├── SECURITY.md                       # Disclosure policy, SLA, safe harbour
├── QODER.md                          # AI pair-programming guardrails
├── CONTRIBUTING.md                   # Contribution workflow, PR rules
├── CHANGELOG.md                      # Keep a Changelog, Conventional Commits
├── .gitignore                        # Node + secrets + state superset
├── .editorconfig                     # Deterministic formatting
├── .npmrc                            # @via-vitae scope → GitHub Packages
├── .github/
│   ├── CODEOWNERS                    # * @JourneyOfLife @IterVitae
│   ├── dependabot.yml                # Weekly grouped updates
│   ├── PULL_REQUEST_TEMPLATE.md      # Compliance checklist + demo-specific
│   ├── ISSUE_TEMPLATE/               # Bug, feature, new-demo forms
│   └── workflows/
│       ├── ci.yml                    # Lint, typecheck, Vitest, Playwright,
│       │                             # Lighthouse, axe, Semgrep, Trivy
│       ├── compliance-check.yml      # TruffleHog, licences, governance, SHA pin
│       ├── codeql.yml                # CodeQL javascript-typescript
│       └── demo-reset-smoke.yml      # Nightly reset + Playwright verify
├── docs/
│   ├── architecture.md               # ADR template + decisions
│   ├── DPIA-template.md              # GDPR Article 35 assessments
│   ├── content-policy.md             # Fictional entities, imagery rules
│   ├── tiers.md                      # Tier pricing reference
│   └── reset-runbook.md              # Reset mechanics, escalation
├── config/                           # Template registry, tiers, banners, budgets
├── shared/                           # Zero-duplication: design system, lib, seed
├── provisioning/                     # Tenant scaffolding, DNS, smoke tests
├── reset/                            # Idempotent reset, seed hash verification
├── templates/                        # 9 demo templates (basilica..vendor-dashboard)
├── package.json                      # pnpm workspace root
├── pnpm-workspace.yaml               # Workspace packages
├── pnpm-lock.yaml                    # Committed lockfile
├── turbo.json                        # Turborepo pipelines
├── tsconfig.base.json                # Strict, shared path aliases
├── playwright.config.ts              # Per-template + reset-smoke projects
├── lighthouserc.json                 # CI performance budgets
├── Dockerfile                        # Multi-stage, template target ARG
├── docker-compose.yml                # 9 demos + api-mock + tileserver-mock
└── .env.example                      # Non-secret config only
```

## Development workflow

```bash
# Clone
git clone git@github.com:Via-Vitae/viavitae-demos.git
cd viavitae-demos

# Install (requires @via-vitae/brand published to GitHub Packages)
pnpm install

# Run a specific demo
pnpm --filter @via-vitae/demo-basilica dev

# Run all quality gates
pnpm lint && pnpm typecheck && pnpm test

# Run E2E tests for a template
pnpm exec playwright test --project=basilica
```

Branch from `main` using conventional prefixes (`feat/`, `fix/`, `chore/`, `docs/`).
Commit with Conventional Commits. Keep PRs under 400 changed lines.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full workflow.

## Reset mechanics

Every demo resets nightly at 03:00 UTC via a K8s CronJob (spec in
`viavitae-infra/k8s/`). The reset:

1. Wipes all generated state (user input, form data, cart contents).
2. Restores seed data from `templates/<name>/seed/` using byte-identical digests.
3. Verifies hashes against `reset.manifest.json`.
4. Asserts no live Stripe keys exist in any seed directory.
5. Runs a Playwright smoke test to confirm the demo is functional.

See [docs/reset-runbook.md](docs/reset-runbook.md) for failure escalation.

## Quality gates

Every pull request must pass:

| Gate | Tool | Threshold |
|------|------|-----------|
| Lint | ESLint | zero warnings |
| Format | Prettier | no diff |
| Types | `tsc --noEmit` | zero errors |
| Unit tests | Vitest | pass, coverage ≥ 80% |
| E2E | Playwright | pass per template |
| Performance | Lighthouse CI | LCP < 1.8s, CLS < 0.1, TBT < 200ms |
| Accessibility | axe | zero WCAG 2.2 AA violations |
| SAST | Semgrep, CodeQL | zero findings at failure severity |
| Dependencies | Trivy filesystem | fail on CRITICAL |
| Secrets | TruffleHog `--only-verified` | fail on any finding |
| Licences | allow-list scan | unknown licence fails |
| Media licences | manifest verification | every image has a licence |
| Governance | presence checks | CODEOWNERS, .editorconfig, .gitignore |

## Security and compliance

- To report a vulnerability, follow the private disclosure process in
  [SECURITY.md](SECURITY.md). Do **not** open a public issue.
- Personal-data processing requires a completed
  [DPIA](docs/DPIA-template.md) under GDPR Article 35 before processing starts.
- All demo content uses fictional entities. Real liturgical imagery is CC0 or
  own photography, registered in `shared/seed/media-manifest.json` with
  trilingual alt-text.
- Stripe checkout demos use TEST mode only. Live keys are never committed.
- Architectural decisions with security or privacy impact are recorded as an
  [ADR](docs/architecture.md).

## Documentation

| Document | Purpose |
|----------|---------|
| [SECURITY.md](SECURITY.md) | Disclosure policy, SLA, safe harbour, scope |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Workflow, PR rules, DCO sign-off |
| [CHANGELOG.md](CHANGELOG.md) | Release history, Keep a Changelog format |
| [QODER.md](QODER.md) | AI pair-programming guardrails |
| [docs/architecture.md](docs/architecture.md) | MADR decision records |
| [docs/DPIA-template.md](docs/DPIA-template.md) | GDPR Article 35 assessments |
| [docs/content-policy.md](docs/content-policy.md) | Fictional entities, imagery rules |
| [docs/tiers.md](docs/tiers.md) | Tier pricing reference |
| [docs/reset-runbook.md](docs/reset-runbook.md) | Reset mechanics, escalation |

## Cross-repo gates

| Dependency | Status | Notes |
|-----------|--------|-------|
| `@via-vitae/brand` | Required | Must be published to GitHub Packages first |
| `viavitae-api` | CI mock | `docker-compose.yml` provides `api-mock` service |
| `viavitae-infra` | K8s CronJob | Reset CronJob spec lives in `viavitae-infra/k8s/` |

## Licence

Proprietary — All Rights Reserved. © ViaVitae IT Technologies. No redistribution,
no derivative works and no commercial use by third parties without a written
agreement. Governed by the law of Lithuania (EU). See [LICENSE](LICENSE).
