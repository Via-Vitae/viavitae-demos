# Reset Mechanism — viavitae-demos

This directory contains the nightly reset mechanism for all demo templates.

## What it does

Every night at 03:00 UTC, a K8s CronJob triggers `reset.sh` which:

1. **Wipes generated state** — all database rows, uploaded files, session data,
   and cache entries created since the last reset.
2. **Restores seed data** — copies `templates/<template>/seed/` into the running
   application's data directory, byte-for-byte.
3. **Verifies hashes** — computes SHA-256 digests of every seed file and compares
   against `reset.manifest.json`. Mismatch = failure.
4. **Asserts no live keys** — scans all `seed/` directories for `sk_live_*` or
   `pk_live_*` patterns. Match = security incident.

## CronJob specification

The K8s CronJob spec lives in **`viavitae-infra/k8s/`** (not in this repository).
The CronJob runs as a Kubernetes Job using the `viavitae-api` worker image,
with access to the demo database and file storage.

## Manual reset

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

## Failure escalation

See `docs/reset-runbook.md` for detailed escalation procedures.

## Files

| File           | Purpose                                              |
| -------------- | ---------------------------------------------------- |
| `reset.sh`     | Main reset script — idempotent, safe to re-run       |
| `seed-hash.ts` | SHA-256 digest computation and manifest verification |
| `README.md`    | This file                                            |
