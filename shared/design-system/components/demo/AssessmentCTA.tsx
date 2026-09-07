"use client";

import { useLocale } from "@shared/lib/i18n-messages";
import { Button } from "../ui/Button";

/**
 * AssessmentCTA — call-to-action button that initiates the assessment funnel.
 *
 * Used in page heroes and mid-page positions. Posts template slug + tier to
 * viavitae-api /v1/assessment, then redirects to Cal.com booking.
 */
export function AssessmentCTA({ templateSlug }: { templateSlug: string }) {
  const { locale } = useLocale();

  const labels = {
    lt: "Pradėkite savo svetainę",
    en: "Start your website",
    ru: "Начните свой сайт",
  };

  return (
    <Button
      variant="primary"
      size="lg"
      data-template={templateSlug}
      onClick={() => {
        window.location.href = `https://viavitae.com/assessment?template=${templateSlug}`;
      }}
    >
      {labels[locale]}
    </Button>
  );
}
