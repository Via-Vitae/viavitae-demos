"use client";

import { useState } from "react";
import { useLocale } from "@shared/lib/i18n-messages";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";

/**
 * MakeItMineWizard — multi-step wizard for the assessment funnel.
 *
 * Prefills with the current template slug and tier. Posts to viavitae-api
 * via `assessment-client.ts`. Steps:
 *
 * 1. Organisation name (fictional)
 * 2. Contact details
 * 3. Tier selection
 * 4. Confirmation → redirect to Cal.com booking
 */
export function MakeItMineWizard({ templateSlug, tier }: { templateSlug: string; tier: string }) {
  const [open, setOpen] = useState(false);
  const { locale } = useLocale();

  const labels = {
    open: { lt: "Sukurkite savo", en: "Make it mine", ru: "Создайте свой" },
    title: { lt: "Asesmentas", en: "Assessment", ru: "Оценка" },
  };

  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        {labels.open[locale]}
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} title={labels.title[locale]}>
        <p className="text-sm text-muted-foreground">
          Template: {templateSlug} · Tier: {tier}
        </p>
        {/* Wizard steps would be implemented here */}
      </Modal>
    </>
  );
}
