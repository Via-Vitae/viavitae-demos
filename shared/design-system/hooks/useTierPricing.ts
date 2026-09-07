"use client";

import { useMemo } from "react";
import { TIER_CONFIG, formatPrice } from "@config/tiers.config";
import type { Tier } from "@config/templates.registry";

/**
 * useTierPricing — hook that provides formatted pricing for a tier.
 *
 * Returns the price, feature list, and upsell teaser for the given tier.
 */
export function useTierPricing(tier: Tier) {
  return useMemo(() => {
    const config = TIER_CONFIG[tier];
    return {
      priceCents: config.priceCents,
      formattedPrice: formatPrice(config.priceCents),
      pageCount: config.pageCount,
      features: config.features,
      pages: config.pages,
      upsellTeaser: config.upsellTeaser,
    };
  }, [tier]);
}
