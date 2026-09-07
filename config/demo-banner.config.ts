/**
 * Demo Banner Configuration — wording and behaviour for the disclaimer banner
 * displayed on every demo page.
 *
 * The banner is NOT dismissible (it is not a cookie banner). It must be visible
 * on every page without scrolling, in the visitor's locale (LT/EN/RU).
 *
 * @packageDocumentation
 */

export interface DemoBannerConfig {
  /** Disclaimer text shown in the banner (per locale). */
  disclaimer: {
    lt: string;
    en: string;
    ru: string;
  };

  /** "Make it mine" CTA text (per locale). */
  ctaText: {
    lt: string;
    en: string;
    ru: string;
  };

  /** URL for the "Make it mine" CTA (assessment funnel entry point). */
  ctaUrl: string;

  /** Stripe test-mode banner text (shown on checkout/donation pages). */
  testModeBanner: {
    lt: string;
    en: string;
    ru: string;
  };

  /** Whether the tier upgrade teaser is shown (controlled per-tier). */
  showTierTeaser: boolean;

  /** Reset clock text — shown near the banner to indicate nightly reset. */
  resetClock: {
    lt: string;
    en: string;
    ru: string;
  };
}

export const DEMO_BANNER_CONFIG: DemoBannerConfig = {
  disclaimer: {
    lt: "Tai demonstracinė svetainė. Visos organizacijos, asmenys ir duomenys yra fiktyvūs. Tai nėra tikra organizacija.",
    en: "This is a demonstration website. All entities, persons, and data shown are fictional. This is not a real organisation.",
    ru: "Это демонстрационный сайт. Все организации, лица и данные являются вымышленными. Это не настоящая организация.",
  },

  ctaText: {
    lt: "Sukurkite savo svetainę",
    en: "Make it mine",
    ru: "Создайте свой сайт",
  },

  ctaUrl: "https://viavitae.com/assessment",

  testModeBanner: {
    lt: "⚠️ TESTINIS REŽIMAS — mokėjimai neapmokestinami",
    en: "⚠️ TEST MODE — no real charges will be made",
    ru: "⚠️ ТЕСТОВЫЙ РЕЖИМ — реальные списания не производятся",
  },

  showTierTeaser: true,

  resetClock: {
    lt: "Svetainė atnaujinama kasnakt (03:00 UTC).",
    en: "This demo resets nightly at 03:00 UTC.",
    ru: "Эта демо-версия сбрасывается каждую ночь в 03:00 UTC.",
  },
};
