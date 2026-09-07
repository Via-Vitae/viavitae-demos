"use client";

import { useLocale } from "@shared/lib/i18n-messages";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { formatPrice, TIER_CONFIG } from "@config/tiers.config";
import type { Tier } from "@config/templates.registry";

/**
 * TierTeaser — upsell card shown in Economy and Normal demos.
 *
 * Displays the features available at the next tier with pricing.
 * Not shown on VIP (no higher tier to upsell).
 */
export function TierTeaser({ currentTier }: { currentTier: Tier }) {
  const { locale } = useLocale();

  if (currentTier === "vip") return null;

  const nextTier: Tier = currentTier === "economy" ? "normal" : "vip";
  const nextConfig = TIER_CONFIG[nextTier];
  const teaser = nextConfig.upsellTeaser[locale];

  return (
    <Card className="border-tier-teaser bg-tier-teaser/5">
      <div className="space-y-3">
        <Badge variant="info">{nextTier.toUpperCase()}</Badge>
        <p className="text-sm">{teaser}</p>
        <p className="text-lg font-bold">{formatPrice(nextConfig.priceCents)}</p>
      </div>
    </Card>
  );
}
