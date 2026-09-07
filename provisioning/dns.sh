#!/usr/bin/env bash
# dns.sh — Create/update DNS record for a demo tenant.
#
# Usage: ./provisioning/dns.sh <slug> <action>
#   action: create | delete | verify
#
# Credentials: INFRA_API_TOKEN from GitHub Environment secret.
# This token is rotated quarterly and NEVER committed to the repository.
#
set -euo pipefail

SLUG="${1:?Usage: dns.sh <slug> <action>}"
ACTION="${2:?Usage: dns.sh <slug> <action>}"
DOMAIN="demo.viavitae.com"

if [ -z "${INFRA_API_TOKEN:-}" ]; then
  echo "ERROR: INFRA_API_TOKEN is not set." >&2
  echo "Set it from the GitHub Environment secret (rotated quarterly)." >&2
  exit 1
fi

API_URL="https://infra.viavitae.com/api/v1/dns"

case "${ACTION}" in
  create)
    echo "[dns] Creating record: ${SLUG}.${DOMAIN} → demo cluster"
    curl -sf -X POST "${API_URL}" \
      -H "Authorization: Bearer ${INFRA_API_TOKEN}" \
      -H "Content-Type: application/json" \
      -d "{\"subdomain\": \"${SLUG}\", \"domain\": \"${DOMAIN}\", \"type\": \"CNAME\", \"ttl\": 300}"
    echo ""
    echo "[dns] Record created: ${SLUG}.${DOMAIN}"
    ;;
  delete)
    echo "[dns] Deleting record: ${SLUG}.${DOMAIN}"
    curl -sf -X DELETE "${API_URL}/${SLUG}" \
      -H "Authorization: Bearer ${INFRA_API_TOKEN}"
    echo ""
    echo "[dns] Record deleted: ${SLUG}.${DOMAIN}"
    ;;
  verify)
    echo "[dns] Verifying record: ${SLUG}.${DOMAIN}"
    dig +short "${SLUG}.${DOMAIN}" || echo "[dns] WARNING: DNS record not yet propagated"
    ;;
  *)
    echo "ERROR: Unknown action '${ACTION}'. Use: create | delete | verify" >&2
    exit 1
    ;;
esac
