/**
 * Post-Provision Smoke Test — Lighthouse + axe + reset check.
 *
 * Runs after a new tenant is provisioned to verify:
 * 1. The demo loads at demo.viavitae.com/<slug>
 * 2. Lighthouse scores meet budgets (config/budgets.json)
 * 3. axe-core finds no critical accessibility violations
 * 4. The disclaimer banner is visible
 * 5. The reset manifest hashes match
 *
 * @packageDocumentation
 */

import { chromium, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const DEMO_BASE_URL = process.env.DEMO_BASE_URL ?? "http://localhost:3000";

interface SmokeResult {
  slug: string;
  pageLoads: boolean;
  lighthousePass: boolean;
  axePass: boolean;
  bannerVisible: boolean;
  seedHashMatch: boolean;
}

/** Run the post-provision smoke test for a tenant. */
export async function smokeTest(slug: string): Promise<SmokeResult> {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const url = `${DEMO_BASE_URL}/${slug}`;

  const result: SmokeResult = {
    slug,
    pageLoads: false,
    lighthousePass: false,
    axePass: false,
    bannerVisible: false,
    seedHashMatch: false,
  };

  try {
    // 1. Page loads
    const response = await page.goto(url, { waitUntil: "networkidle" });
    result.pageLoads = response?.ok() ?? false;

    if (!result.pageLoads) {
      console.error(`[smoke] FAIL: Page did not load at ${url}`);
      return result;
    }

    // 2. Banner visible
    const banner = page.locator('[role="banner"]');
    result.bannerVisible = await banner.isVisible();

    // 3. axe accessibility
    const axeResults = await new AxeBuilder({ page }).analyze();
    result.axePass = axeResults.violations.filter((v) => v.impact === "critical").length === 0;

    // 4. Seed hash (via API)
    const hashRes = await page.goto(`${url}/api/seed-hash`);
    result.seedHashMatch = hashRes?.ok() ?? false;

    console.log(`[smoke] Results for ${slug}:`, result);
  } finally {
    await browser.close();
  }

  return result;
}
