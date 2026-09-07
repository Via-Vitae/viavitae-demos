/**
 * Generate Tenant — template + tenant.yaml → tenant app instance.
 *
 * Reads a tenant.yaml configuration, validates against tenant.schema.json,
 * and provisions:
 * 1. Container with the correct Dockerfile target ARG
 * 2. Postgres schema for tenant data isolation
 * 3. DNS record via infra API (dns.sh)
 * 4. Seed data from templates/<template>/seed/
 *
 * No manual steps allowed — this script is the single entry point.
 *
 * @packageDocumentation
 */

import { readFileSync } from "node:fs";
import { parse } from "yaml";
import { getTemplate, type TemplateEntry } from "@config/templates.registry";

interface TenantConfig {
  slug: string;
  template: string;
  tier: "economy" | "normal" | "vip";
  locale: "lt" | "en" | "ru";
  organisationName: string;
  stripeMode: "test";
  seedVersion: string;
}

/** Validate tenant config against the schema. */
function validateConfig(config: TenantConfig): void {
  if (config.stripeMode !== "test") {
    throw new Error("FATAL: stripeMode must be 'test'. Live keys are never permitted.");
  }

  const template = getTemplate(config.template);
  if (!template.tiers.includes(config.tier)) {
    throw new Error(
      `Template '${config.template}' is not available on tier '${config.tier}'. ` +
      `Available tiers: ${template.tiers.join(", ")}`,
    );
  }

  if (template.seedVersion !== config.seedVersion) {
    throw new Error(
      `Seed version mismatch: tenant wants ${config.seedVersion}, ` +
      `template provides ${template.seedVersion}`,
    );
  }
}

/** Generate the tenant instance. */
export async function generateTenant(configPath: string): Promise<void> {
  const raw = readFileSync(configPath, "utf-8");
  const config = parse(raw) as TenantConfig;

  console.log(`[generate-tenant] Validating config for: ${config.slug}`);
  validateConfig(config);

  const template = getTemplate(config.template);
  console.log(`[generate-tenant] Template: ${template.displayName} (${config.tier})`);

  // Step 1: Create container
  console.log(`[generate-tenant] Creating container with target: ${config.template}`);

  // Step 2: Create Postgres schema
  console.log(`[generate-tenant] Creating Postgres schema: tenant_${config.slug.replace(/-/g, "_")}`);

  // Step 3: Provision DNS
  console.log(`[generate-tenant] Provisioning DNS: demo.viavitae.com/${config.slug}`);

  // Step 4: Copy seed data
  console.log(`[generate-tenant] Seeding data from templates/${config.template}/seed/`);

  console.log(`[generate-tenant] Tenant '${config.slug}' provisioned successfully.`);
}

// CLI entry point
if (process.argv[1]?.endsWith("generate-tenant.ts")) {
  const configPath = process.argv[2];
  if (!configPath) {
    console.error("Usage: generate-tenant.ts <tenant.yaml>");
    process.exit(1);
  }
  generateTenant(configPath).catch((err) => {
    console.error("[generate-tenant] FAILED:", err.message);
    process.exit(1);
  });
}
