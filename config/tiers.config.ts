/**
 * Tier Configuration — page sets and feature flags per tier.
 *
 * This is the runtime source of truth for what each tier includes.
 * The human-readable reference lives in `docs/tiers.md`.
 *
 * @packageDocumentation
 */

import type { Tier } from "./templates.registry";

export interface TierConfig {
  /** Approximate number of pages in this tier. */
  pageCount: number;

  /** Price in EUR (cents). */
  priceCents: number;

  /** Feature flags enabled at this tier. */
  features: TierFeatures;

  /** Pages included at this tier (route slugs). */
  pages: string[];

  /** Teaser copy shown to upsell to the next tier. */
  upsellTeaser: {
    lt: string;
    en: string;
    ru: string;
  };
}

export interface TierFeatures {
  /** Basic pages: home, about, contact, legal. */
  corePages: boolean;

  /** Mass schedule with ICS export. */
  massSchedule: boolean;

  /** Static image gallery. */
  gallery: boolean;

  /** Donation flow (Stripe test mode). */
  donations: boolean;

  /** News / announcements listing. */
  news: boolean;

  /** Extended gallery with lightbox and trilingual alt-text. */
  galleryExtended: boolean;

  /** Liturgical calendar with feast days and colours. */
  liturgicalCalendar: boolean;

  /** Events listing. */
  events: boolean;

  /** Clergy / staff directory. */
  clergyDirectory: boolean;

  /** E-commerce shop (product catalogue, cart, Stripe checkout). */
  shop: boolean;

  /** CRM dashboard embed (Bitrix24, masked fictional data). */
  crmDashboard: boolean;

  /** AI Pastoral Assistant demo (with citations). */
  aiPastoral: boolean;

  /** Virtual tour component. */
  virtualTour: boolean;

  /** Extended sacrament booking forms. */
  sacramentBooking: boolean;
}

export const TIER_CONFIG: Record<Tier, TierConfig> = {
  economy: {
    pageCount: 10,
    priceCents: 90000,
    features: {
      corePages: true,
      massSchedule: true,
      gallery: true,
      donations: true,
      news: true,
      galleryExtended: false,
      liturgicalCalendar: false,
      events: false,
      clergyDirectory: false,
      shop: false,
      crmDashboard: false,
      aiPastoral: false,
      virtualTour: false,
      sacramentBooking: false,
    },
    pages: [
      "/",
      "/mass-schedule",
      "/sacraments",
      "/gallery",
      "/donations",
      "/news",
      "/contact",
      "/about",
      "/visit",
      "/legal",
    ],
    upsellTeaser: {
      lt: "Atraskite daugiau su Normal planu — galerija, kalendorius ir dar daugiau!",
      en: "Unlock more with the Normal plan — gallery, calendar, and more!",
      ru: "Откройте больше с планом Normal — галерея, календарь и многое другое!",
    },
  },

  normal: {
    pageCount: 15,
    priceCents: 190000,
    features: {
      corePages: true,
      massSchedule: true,
      gallery: true,
      donations: true,
      news: true,
      galleryExtended: true,
      liturgicalCalendar: true,
      events: true,
      clergyDirectory: true,
      shop: false,
      crmDashboard: false,
      aiPastoral: false,
      virtualTour: false,
      sacramentBooking: false,
    },
    pages: [
      "/",
      "/mass-schedule",
      "/sacraments",
      "/gallery",
      "/donations",
      "/news",
      "/events",
      "/liturgical-calendar",
      "/clergy",
      "/contact",
      "/about",
      "/visit",
      "/history",
      "/legal",
    ],
    upsellTeaser: {
      lt: "Atraskite VIP planą — parduotuvė, CRM ir AI pastoralinis asistentas!",
      en: "Discover the VIP plan — shop, CRM, and AI Pastoral Assistant!",
      ru: "Откройте VIP-план — магазин, CRM и AI пасторальный помощник!",
    },
  },

  vip: {
    pageCount: 20,
    priceCents: 290000,
    features: {
      corePages: true,
      massSchedule: true,
      gallery: true,
      donations: true,
      news: true,
      galleryExtended: true,
      liturgicalCalendar: true,
      events: true,
      clergyDirectory: true,
      shop: true,
      crmDashboard: true,
      aiPastoral: true,
      virtualTour: true,
      sacramentBooking: true,
    },
    pages: [
      "/",
      "/mass-schedule",
      "/sacraments",
      "/gallery",
      "/donations",
      "/news",
      "/events",
      "/liturgical-calendar",
      "/clergy",
      "/shop",
      "/crm-dashboard",
      "/ai-pastoral",
      "/virtual-tour",
      "/contact",
      "/about",
      "/visit",
      "/history",
      "/legal",
    ],
    upsellTeaser: {
      lt: "",
      en: "",
      ru: "",
    },
  },
};

/** Format price in EUR for display. */
export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("lt-LT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  }).format(cents / 100);
}
