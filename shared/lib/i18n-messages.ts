"use client";

import { useState, useCallback, createContext, useContext } from "react";

export type Locale = "lt" | "en" | "ru" | "pl" | "de";

export type LocaleMessages = Record<string, Record<Locale, string>>;

/**
 * Shared i18n message catalogue for demo strings.
 *
 * LT/EN/RU are fully translated. PL and DE are stub locales that fall back
 * to English until content is translated (content-policy.md §7).
 */

const DEFAULT_MESSAGES: LocaleMessages = {
  "demo.disclaimer": {
    lt: "Tai demonstracinė svetainė. Visi duomenys yra fiktyvūs.",
    en: "This is a demonstration website. All data is fictional.",
    ru: "Это демонстрационный сайт. Все данные вымышлены.",
    pl: "This is a demonstration website. All data is fictional.",
    de: "This is a demonstration website. All data is fictional.",
  },
  "demo.makeItMine": {
    lt: "Sukurkite savo",
    en: "Make it mine",
    ru: "Создайте свой",
    pl: "Make it mine",
    de: "Make it mine",
  },
  "nav.home": {
    lt: "Pradžia",
    en: "Home",
    ru: "Главная",
    pl: "Home",
    de: "Home",
  },
  "nav.contact": {
    lt: "Kontaktai",
    en: "Contact",
    ru: "Контакты",
    pl: "Contact",
    de: "Contact",
  },
};

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue>({
  locale: "lt",
  setLocale: () => {},
  t: (key: string) => key,
});

/** Hook to access locale and translation function. */
export function useLocale() {
  return useContext(I18nContext);
}

/** Provider component for i18n context. */
export function I18nProvider({ children, messages = DEFAULT_MESSAGES }: {
  children: React.ReactNode;
  messages?: LocaleMessages;
}) {
  const [locale, setLocale] = useState<Locale>("lt");

  const t = useCallback(
    (key: string): string => {
      const entry = messages[key];
      if (!entry) return key;
      return entry[locale] ?? entry.en ?? key;
    },
    [locale, messages],
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}
