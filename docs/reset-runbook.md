# Reset Runbook — viavitae-demos

This document describes the nightly reset mechanism, how to verify it, and how
to escalate when it fails.

---

## Overview

Every demo at `demo.viavitae.com/<template>` is reset nightly to a known-good
state. The reset ensures:

- All user-entered data (form submissions, cart contents, etc.) is wiped.
- Seed data is restored byte-for-byte from `templates/<template>/seed/`.
- No live API keys or personal data persist in the demo environment.

## Reset schedule

| Time (UTC) | Action |
|------------|--------|
| 03:00 | K8s CronJob triggers `reset/reset.sh` via `viavitae-api` worker |
| 03:05 | Reset completes; seed hashes verified against `reset.manifest.json` |
| 03:10 | Stripe key assertion runs (no `sk_live_*` or `pk_live_*` in seed/) |
| 04:00 | `demo-reset-smoke.yml` Playwright smoke test begins |
| 04:15 | Smoke test results available in GitHub Actions |

## Reset mechanics

### What reset does

1. **Wipe generated state.** Deletes all database rows, uploaded files, session
   data, and cache entries created since the last reset.
2. **Restore seed data.** Copies `templates/<template>/seed/data/` and
   `templates/<template>/seed/media/` into the running application's data
   directory.
3. **Verify hashes.** Computes SHA-256 digests of every file in `seed/` and
   compares against `reset.manifest.json`. Mismatch = failure.
4. **Assert no live keys.** Scans all `seed/` directories for patterns matching
   `sk_live_*` or `pk_live_*`. Match = security incident.
5. **Smoke test.** Playwright navigates to the demo homepage and verifies the
   page loads, the disclaimer banner is visible, and key routes respond.

### What reset does NOT do

- Reset does not redeploy the application code. Code changes are deployed via
  the normal CI/CD pipeline.
- Reset does not update seed data. Seed changes require a PR and merge to `main`.
- Reset does not rotate credentials. Credential rotation is a separate process.

## Failure escalation

### Seed hash mismatch

**Symptom:** `seed-hash.ts` reports digest mismatch for one or more files.

**Cause:** Seed data was modified outside the PR process (manual database edit,
file upload, or incomplete reset from a previous night).

**Resolution:**

1. Check which files have mismatched digests.
2. If the files are genuinely modified seed data, update `reset.manifest.json`
   by running `pnpm verify:seed-hashes --update` and commit the result.
3. If the files should not have changed, re-run `reset.sh` manually:
   ```bash
   ./reset/reset.sh --template <name> --force
   ```
4. If the problem persists, check the K8s CronJob logs for errors.

### Live Stripe key found

**Symptom:** `reset.sh` reports `sk_live_*` or `pk_live_*` in seed data.

**Severity:** **CRITICAL — security incident.**

**Resolution:**

1. **Rotate the key immediately** in the Stripe dashboard.
2. Identify how the live key entered seed data (check git history, CI logs).
3. Remove the key from all seed files and commit the fix.
4. Record the incident as an ADR in `docs/architecture.md`.
5. Notify `security@viavitae.com`.

### Smoke test failure

**Symptom:** Playwright smoke test fails for one or more templates.

**Resolution:**

1. Check the Playwright report artifact in GitHub Actions.
2. Verify the demo is accessible at `demo.viavitae.com/<template>`.
3. If the demo is down, check the K8s pod status and application logs.
4. If the demo loads but the smoke test fails, check for:
   - Missing disclaimer banner (content-policy.md violation).
   - Broken route (check `templates/<template>/app/` for recent changes).
   - JavaScript error on the page (check browser console in the report).

## Manual reset

To trigger a manual reset outside the nightly schedule:

```bash
# Reset a specific template
./reset/reset.sh --template basilica

# Reset all templates
./reset/reset.sh --all

# Force reset (skip hash verification of current state)
./reset/reset.sh --template basilica --force

# Dry run (show what would be reset without making changes)
./reset/reset.sh --template basilica --dry-run
```

## CronJob specification

The K8s CronJob spec lives in `viavitae-infra/k8s/` (not in this repository).
The CronJob runs as a Kubernetes Job using the `viavitae-api` worker image,
with access to the demo database and file storage.
