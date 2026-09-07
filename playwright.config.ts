import { defineConfig, devices } from "@playwright/test";

const TEMPLATES = [
  "basilica", "cathedral", "diocese", "deaneries", "parish-church",
  "funeral-services", "cemetery-services", "online-store", "vendor-dashboard",
];

const BASE_URL = process.env.DEMO_BASE_URL ?? "http://localhost:3000";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
  },

  projects: [
    // Per-template smoke tests
    ...TEMPLATES.map((template) => ({
      name: template,
      use: { ...devices["Desktop Chrome"] },
      testMatch: /smoke\.spec\.ts/,
    })),

    // Reset smoke test (nightly)
    {
      name: "reset-smoke",
      use: { ...devices["Desktop Chrome"] },
      testMatch: /reset-smoke\.spec\.ts/,
    },

    // Accessibility audit
    {
      name: "a11y",
      use: { ...devices["Desktop Chrome"] },
      testMatch: /a11y\.spec\.ts/,
    },
  ],
});
