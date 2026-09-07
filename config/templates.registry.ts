/**
 * Template Registry — single source of truth for all 9 demo templates.
 *
 * Every template slug, tier availability, demo URL, and seed version is defined
 * here. CI, provisioning, and the reset mechanism all consume this file.
 *
 * @packageDocumentation
 */

export type Tier = "economy" | "normal" | "vip";

export interface TemplateEntry {
  /** Unique slug used in URLs and directory names. */
  slug: string;

  /** Human-readable display name. */
  displayName: string;

  /** Tiers on which this template is available. */
  tiers: Tier[];

  /** Demo URL path (appended to DEMO_BASE_URL). */
  demoUrl: string;

  /** Current seed data version (bump when seed changes). */
  seedVersion: string;

  /** Whether this template is the default for its primary tier. */
  isDefault: boolean;

  /** Vertical category: "tier" for the tier ladder, "vertical" for specialised demos. */
  category: "tier" | "vertical";

  /** Short description shown in the template selector. */
  description: string;
}

export const TEMPLATES: readonly TemplateEntry[] = [
  // ── Tier ladder ──────────────────────────────────────────────────────
  {
    slug: "basilica",
    displayName: "Basilica",
    tiers: ["vip"],
    demoUrl: "/basilica",
    seedVersion: "1.0.0",
    isDefault: true,
    category: "tier",
    description: "VIP flagship demo — full page tree, shop, CRM, AI pastoral.",
  },
  {
    slug: "cathedral",
    displayName: "Cathedral",
    tiers: ["normal"],
    demoUrl: "/cathedral",
    seedVersion: "1.0.0",
    isDefault: true,
    category: "tier",
    description: "Normal tier default — ~15 pages with gallery, news, events.",
  },
  {
    slug: "diocese",
    displayName: "Diocese",
    tiers: ["normal", "vip"],
    demoUrl: "/diocese",
    seedVersion: "1.0.0",
    isDefault: false,
    category: "tier",
    description: "Diocese-wide demo — curia structure, parish directory, documents.",
  },
  {
    slug: "deaneries",
    displayName: "Deaneries",
    tiers: ["economy", "normal"],
    demoUrl: "/deaneries",
    seedVersion: "1.0.0",
    isDefault: false,
    category: "tier",
    description: "Deanery demo — economy ~10 pages, dean info, parish list.",
  },
  {
    slug: "parish-church",
    displayName: "Parish Church",
    tiers: ["economy"],
    demoUrl: "/parish-church",
    seedVersion: "1.0.0",
    isDefault: true,
    category: "tier",
    description: "Economy default — the volume seller, ~10 pages.",
  },

  // ── Vertical demos ───────────────────────────────────────────────────
  {
    slug: "funeral-services",
    displayName: "Funeral Services",
    tiers: ["economy", "normal"],
    demoUrl: "/funeral-services",
    seedVersion: "1.0.0",
    isDefault: false,
    category: "vertical",
    description: "Funeral home vertical — services, pricing, obituary, chapel.",
  },
  {
    slug: "cemetery-services",
    displayName: "Cemetery Services",
    tiers: ["normal"],
    demoUrl: "/cemetery-services",
    seedVersion: "1.0.0",
    isDefault: false,
    category: "vertical",
    description: "Cemetery landing + GIS showcase — GPS map, plots, burial records.",
  },
  {
    slug: "online-store",
    displayName: "Online Store",
    tiers: ["normal"],
    demoUrl: "/online-store",
    seedVersion: "1.0.0",
    isDefault: false,
    category: "vertical",
    description: "€1,900 flat package — Stripe test-mode checkout, product catalogue.",
  },
  {
    slug: "vendor-dashboard",
    displayName: "Vendor Dashboard",
    tiers: ["normal"],
    demoUrl: "/vendor-dashboard",
    seedVersion: "1.0.0",
    isDefault: false,
    category: "vertical",
    description: "jolarca marketplace vendor side — products, orders, payouts, KYC.",
  },
] as const;

/** Look up a template by slug. Throws if not found. */
export function getTemplate(slug: string): TemplateEntry {
  const entry = TEMPLATES.find((t) => t.slug === slug);
  if (!entry) {
    throw new Error(`Unknown template slug: ${slug}`);
  }
  return entry;
}

/** Get all templates available on a given tier. */
export function getTemplatesByTier(tier: Tier): TemplateEntry[] {
  return TEMPLATES.filter((t) => t.tiers.includes(tier));
}

/** Get the default template for a tier. */
export function getDefaultTemplate(tier: Tier): TemplateEntry {
  const defaults = TEMPLATES.filter((t) => t.isDefault && t.tiers.includes(tier));
  if (defaults.length === 0) {
    throw new Error(`No default template for tier: ${tier}`);
  }
  return defaults[0];
}
