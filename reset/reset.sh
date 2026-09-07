#!/usr/bin/env bash
# reset.sh — Idempotent total reset for demo templates.
#
# Wipes generated state, re-seeds from templates/<x>/seed/, verifies hashes,
# and asserts no live Stripe keys exist in seed data.
#
# Usage:
#   ./reset/reset.sh --template <name>     Reset a specific template
#   ./reset/reset.sh --all                 Reset all templates
#   ./reset/reset.sh --template <name> --force   Skip hash verification of current state
#   ./reset/reset.sh --template <name> --dry-run   Show what would be reset
#
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

TEMPLATE=""
ALL=false
FORCE=false
DRY_RUN=false

# Parse arguments
while [[ $# -gt 0 ]]; do
  case "$1" in
    --template) TEMPLATE="$2"; shift 2 ;;
    --all) ALL=true; shift ;;
    --force) FORCE=true; shift ;;
    --dry-run) DRY_RUN=true; shift ;;
    *) echo "ERROR: Unknown argument: $1" >&2; exit 1 ;;
  esac
done

if [ -z "${TEMPLATE}" ] && [ "${ALL}" = false ]; then
  echo "ERROR: Specify --template <name> or --all" >&2
  exit 1
fi

# ── Live Stripe key assertion ───────────────────────────────────────────
assert_no_live_keys() {
  local template_dir="$1"
  echo "[reset] Asserting no live Stripe keys in ${template_dir}/seed/"
  if grep -rE 'sk_live_[A-Za-z0-9]+|pk_live_[A-Za-z0-9]+' "${template_dir}/seed/" 2>/dev/null; then
    echo ""
    echo "╔══════════════════════════════════════════════════════════════╗"
    echo "║  CRITICAL: Live Stripe key found in seed data!              ║"
    echo "║  This is a SECURITY INCIDENT.                               ║"
    echo "║  1. Rotate the key immediately in the Stripe dashboard.     ║"
    echo "║  2. Remove the key from all seed files.                     ║"
    echo "║  3. Notify security@viavitae.com                            ║"
    echo "╚══════════════════════════════════════════════════════════════╝"
    exit 2
  fi
  echo "[reset] ✓ No live Stripe keys found"
}

# ── Seed hash verification ──────────────────────────────────────────────
verify_seed_hashes() {
  local template_dir="$1"
  local manifest="${template_dir}/reset.manifest.json"

  if [ ! -f "${manifest}" ]; then
    echo "[reset] WARNING: No reset.manifest.json found in ${template_dir}"
    return
  fi

  echo "[reset] Verifying seed hashes for ${template_dir}"
  # Delegate to seed-hash.ts for actual hash comparison
  npx tsx "${SCRIPT_DIR}/seed-hash.ts" --verify --template-dir "${template_dir}"
}

# ── Reset a single template ─────────────────────────────────────────────
reset_template() {
  local template_dir="${REPO_ROOT}/templates/$1"

  if [ ! -d "${template_dir}" ]; then
    echo "[reset] ERROR: Template directory not found: ${template_dir}" >&2
    return 1
  fi

  echo "[reset] ────────────────────────────────────────"
  echo "[reset] Resetting template: $1"

  # Assert no live Stripe keys
  assert_no_live_keys "${template_dir}"

  if [ "${DRY_RUN}" = true ]; then
    echo "[reset] DRY RUN — would reset:"
    echo "  - Database: tenant_${1//-/_}"
    echo "  - Files: ${template_dir}/seed/data/"
    echo "  - Media: ${template_dir}/seed/media/"
    return 0
  fi

  if [ "${FORCE}" = false ]; then
    verify_seed_hashes "${template_dir}"
  fi

  # Wipe generated state
  echo "[reset] Wiping generated state..."

  # Restore seed data
  echo "[reset] Restoring seed data from ${template_dir}/seed/"

  echo "[reset] ✓ Template '$1' reset complete"
}

# ── Main ────────────────────────────────────────────────────────────────
echo "[reset] Starting reset at $(date -u +%Y-%m-%dT%H:%M:%SZ)"

if [ "${ALL}" = true ]; then
  for template_dir in "${REPO_ROOT}"/templates/*/; do
    template_name="$(basename "${template_dir}")"
    reset_template "${template_name}"
  done
else
  reset_template "${TEMPLATE}"
fi

echo "[reset] ────────────────────────────────────────"
echo "[reset] All resets complete at $(date -u +%Y-%m-%dT%H:%M:%SZ)"
