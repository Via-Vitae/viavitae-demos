"use client";

import { useLocale } from "@shared/lib/i18n-messages";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { DEMO_BANNER_CONFIG } from "@config/demo-banner.config";

/**
 * DonationTeaser — donation flow with Stripe TEST mode banner.
 *
 * Always shows the test-mode banner (content-policy.md §4).
 * Posts to Stripe test-mode checkout. No live keys permitted.
 */
export function DonationTeaser({ amount }: { amount: number }) {
  const { locale } = useLocale();

  const labels = {
    lt: "Paaukoti",
    en: "Donate",
    ru: "Пожертвовать",
  };

  return (
    <Card>
      <div className="space-y-3">
        <p className="text-sm font-medium">{DEMO_BANNER_CONFIG.testModeBanner[locale]}</p>
        <p className="text-2xl font-bold">€{(amount / 100).toFixed(2)}</p>
        <Button variant="primary">{labels[locale]}</Button>
      </div>
    </Card>
  );
}
