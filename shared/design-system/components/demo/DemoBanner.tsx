"use client";

import { useLocale } from "@shared/lib/i18n-messages";
import { DEMO_BANNER_CONFIG } from "@config/demo-banner.config";

/**
 * DemoBanner — non-dismissible disclaimer shown on every demo page.
 *
 * Displays in the visitor's locale (LT/EN/RU). Includes a "Make it mine" CTA
 * linking to the assessment funnel.
 *
 * Requirements (content-policy.md §2):
 * - Visible without scrolling
 * - Not dismissible
 * - Includes "Make it mine" CTA
 */
export function DemoBanner() {
  const { locale } = useLocale();

  return (
    <div
      role="banner"
      aria-label="Demo disclaimer"
      className="sticky top-0 z-50 border-b bg-demo-banner px-4 py-2 text-sm text-demo-banner-foreground"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <p>{DEMO_BANNER_CONFIG.disclaimer[locale]}</p>
        <a
          href={DEMO_BANNER_CONFIG.ctaUrl}
          className="shrink-0 rounded bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
        >
          {DEMO_BANNER_CONFIG.ctaText[locale]}
        </a>
      </div>
    </div>
  );
}
