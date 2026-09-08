#!/usr/bin/env bash
set -euo pipefail
# Verify every image in seed/media has a manifest entry with valid licence.
# TODO: implement full verification once seed content is populated.

IMAGE_COUNT=$(find templates/*/seed/media -type f 2>/dev/null | wc -l)

if [ "$IMAGE_COUNT" -eq 0 ]; then
  echo "No seed images to verify."
  exit 0
fi

echo "Found $IMAGE_COUNT seed image(s). Manifest validation pending."
