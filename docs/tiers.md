# Tier System — ViaVitae Demo Templates

This document is the human-readable reference for the tier system. The runtime
source of truth is `config/tiers.config.ts`.

---

## Tier overview

| Tier | Pages | Price | Default template | Key features |
|------|-------|-------|------------------|--------------|
| **Economy** | ~10 | €900 | `parish-church` | Core pages, donation flow, mass schedule |
| **Normal** | ~15 | €1,900 | `cathedral` | Economy + gallery, news, events, calendar |
| **VIP** | ~20 + E-commerce | €2,900 | `basilica` | Normal + shop, CRM dashboard, AI pastoral |

## What changes per tier

### Economy (€900)

- Homepage with hero and call-to-action
- Mass schedule (with ICS export)
- Sacrament information pages
- Gallery (static images)
- Donation flow (Stripe test mode)
- News / announcements listing
- Contact page with map
- About / legal pages
- **Tier upgrade teaser** visible (upsell to Normal/VIP)

### Normal (€1,900)

Everything in Economy, plus:

- Extended gallery with lightbox and trilingual alt-text
- Liturgical calendar with feast days and liturgical colors
- News with article detail pages
- Events listing
- Clergy / staff directory
- Visit information (parking, accessibility)
- **Tier upgrade teaser** visible (upsell to VIP)

### VIP (€2,900)

Everything in Normal, plus:

- Full E-commerce shop (product catalogue, cart, Stripe checkout)
- CRM dashboard embed (Bitrix24, masked fictional data)
- AI Pastoral Assistant demo (with citations)
- Virtual tour component
- Extended sacrament booking forms
- Priority support tier

## Vertical demos

In addition to the tier ladder, ViaVitae offers specialised vertical demos:

| Vertical | Template | Pages | Price range |
|----------|----------|-------|-------------|
| Funeral services | `funeral-services` | ~12 | €900–€1,900 |
| Cemetery services | `cemetery-services` | ~10 + GIS | €1,900 |
| Online store | `online-store` | ~10 | €1,900 (flat) |
| Vendor dashboard | `vendor-dashboard` | ~8 | Part of jolarca |

## Pricing changes

Pricing updates go through the normal PR flow:

1. Update `config/tiers.config.ts` (runtime source of truth).
2. Update this document (`docs/tiers.md`) to match.
3. Update `config/demo-banner.config.ts` if teaser copy references prices.
4. Record the change in `CHANGELOG.md`.
