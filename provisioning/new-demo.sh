#!/usr/bin/env bash
# new-demo.sh — Scaffold a NEW template from shared/.
#
# Usage: ./provisioning/new-demo.sh <slug>
#
# Creates:
#   templates/<slug>/
#   templates/<slug>/template.yaml
#   templates/<slug>/app/page.tsx
#   templates/<slug>/app/layout.tsx
#   templates/<slug>/components/
#   templates/<slug>/seed/data/
#   templates/<slug>/seed/media/
#   templates/<slug>/reset.manifest.json
#
set -euo pipefail

SLUG="${1:?Usage: new-demo.sh <slug>}"
TEMPLATE_DIR="templates/${SLUG}"

if [ -d "${TEMPLATE_DIR}" ]; then
  echo "ERROR: Template directory already exists: ${TEMPLATE_DIR}" >&2
  exit 1
fi

echo "[new-demo] Scaffolding template: ${SLUG}"

mkdir -p "${TEMPLATE_DIR}"/{app,components,seed/data,seed/media}

# template.yaml
cat > "${TEMPLATE_DIR}/template.yaml" <<EOF
slug: ${SLUG}
displayName: "${SLUG}"
tiers:
  - economy
demoUrl: "/${SLUG}"
seedVersion: "1.0.0"
isDefault: false
category: "vertical"
description: "TODO: Add description"
EOF

# app/layout.tsx
cat > "${TEMPLATE_DIR}/app/layout.tsx" <<'EOF'
import { DemoBanner } from "@shared/design-system/components/demo";
import { Header } from "@shared/design-system/components/layout";
import { Footer } from "@shared/design-system/components/layout";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="lt">
      <body>
        <DemoBanner />
        <Header navLinks={[]} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
EOF

# app/page.tsx
cat > "${TEMPLATE_DIR}/app/page.tsx" <<EOF
export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold">${SLUG} (demo)</h1>
      <p className="mt-4 text-muted-foreground">TODO: Implement homepage</p>
    </div>
  );
}
EOF

# reset.manifest.json
cat > "${TEMPLATE_DIR}/reset.manifest.json" <<EOF
{
  "template": "${SLUG}",
  "version": "1.0.0",
  "files": {}
}
EOF

echo "[new-demo] Template scaffolded at: ${TEMPLATE_DIR}"
echo "[new-demo] Next steps:"
echo "  1. Update templates/${SLUG}/template.yaml with correct tiers and description"
echo "  2. Add pages to templates/${SLUG}/app/"
echo "  3. Add seed data to templates/${SLUG}/seed/"
echo "  4. Update config/templates.registry.ts to register the new template"
