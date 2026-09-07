"use client";

import { useLocale } from "@shared/lib/i18n-messages";

const LOCALES = [
  { code: "lt" as const, label: "LT" },
  { code: "en" as const, label: "EN" },
  { code: "ru" as const, label: "RU" },
];

/**
 * LanguageSwitcher — locale selector for LT/EN/RU.
 *
 * PL and DE are stub locales (English fallback) per content-policy.md §7.
 */
export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div role="group" aria-label="Language selection" className="flex gap-1">
      {LOCALES.map((l) => (
        <button
          key={l.code}
          onClick={() => setLocale(l.code)}
          aria-pressed={locale === l.code}
          className={`rounded px-2 py-1 text-xs font-medium ${
            locale === l.code
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
