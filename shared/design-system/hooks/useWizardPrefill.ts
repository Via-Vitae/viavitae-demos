"use client";

import { useState, useEffect } from "react";

interface WizardPrefill {
  templateSlug: string;
  tier: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

/**
 * useWizardPrefill — hook that extracts prefill data from URL params.
 *
 * Reads template slug, tier, and UTM parameters from the URL to prefill
 * the MakeItMineWizard. UTM params are forwarded to Bitrix24 via bitrix24-utm.ts.
 */
export function useWizardPrefill(): WizardPrefill {
  const [prefill, setPrefill] = useState<WizardPrefill>({
    templateSlug: "",
    tier: "economy",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setPrefill({
      templateSlug: params.get("template") ?? "",
      tier: params.get("tier") ?? "economy",
      utmSource: params.get("utm_source") ?? undefined,
      utmMedium: params.get("utm_medium") ?? undefined,
      utmCampaign: params.get("utm_campaign") ?? undefined,
    });
  }, []);

  return prefill;
}
