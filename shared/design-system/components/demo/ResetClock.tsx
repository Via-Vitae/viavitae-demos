"use client";

import { useLocale } from "@shared/lib/i18n-messages";
import { DEMO_BANNER_CONFIG } from "@config/demo-banner.config";

/**
 * ResetClock — small indicator showing the nightly reset schedule.
 *
 * Displayed near the demo banner to reassure visitors that any data they
 * enter will be wiped on the next reset cycle.
 */
export function ResetClock() {
  const { locale } = useLocale();

  return (
    <div
      aria-label="Reset schedule"
      className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
    >
      <span className="h-1.5 w-1.5 animate-reset-pulse rounded-full bg-green-500" />
      {DEMO_BANNER_CONFIG.resetClock[locale]}
    </div>
  );
}
