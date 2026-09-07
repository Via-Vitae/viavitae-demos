"use client";

import { useLocale } from "@shared/lib/i18n-messages";
import { DEMO_BANNER_CONFIG } from "@config/demo-banner.config";

/**
 * CheckoutDemoBanner — prominent TEST MODE banner on checkout pages.
 *
 * Must be visible on all checkout and donation pages (content-policy.md §4).
 */
export function CheckoutDemoBanner() {
  const { locale } = useLocale();

  return (
    <div
      role="alert"
      className="rounded-lg border-2 border-yellow-400 bg-yellow-50 p-4 text-center text-sm font-semibold text-yellow-800"
    >
      {DEMO_BANNER_CONFIG.testModeBanner[locale]}
    </div>
  );
}
