/**
 * Tailwind CSS Preset — ViaVitae Demo Design System.
 *
 * Imports brand tokens from `@via-vitae/brand` and applies demo-specific
 * overrides. All 9 templates consume this preset to ensure visual consistency.
 *
 * @packageDocumentation
 */

import type { Config } from "tailwindcss";

/**
 * Demo colour palette overrides.
 * These extend (not replace) the brand tokens from `@via-vitae/brand`.
 */
const demoColors = {
  "demo-banner": "var(--color-demo-banner, #fbbf24)",
  "demo-ribbon": "var(--color-demo-ribbon, #ef4444)",
  "demo-bg": "var(--color-demo-bg, #fffbeb)",
  "tier-teaser": "var(--color-tier-teaser, #8b5cf6)",
};

/**
 * Typography overrides for demo content.
 * Liturgical text uses serif; UI chrome uses sans.
 */
const demoFontFamily = {
  serif: ["var(--font-serif)", "Georgia", "serif"],
  sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
  mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
};

const preset: Partial<Config> = {
  theme: {
    extend: {
      colors: demoColors,
      fontFamily: demoFontFamily,
      animation: {
        "reset-pulse": "reset-pulse 2s ease-in-out infinite",
        "fade-in": "fade-in 0.3s ease-out",
      },
      keyframes: {
        "reset-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
};

export default preset;
