import { AssessmentCTA } from "@shared/design-system/components/demo";

/**
 * Basilica Homepage — VIP flagship demo.
 *
 * Features: hero with sacred-geometry motif, tier teaser, assessment CTA.
 */
export default function BasilicaHomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Basilica of St. Vitus
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Vilnius (demo) — VIP template showcase
        </p>
        <div className="mt-8">
          <AssessmentCTA templateSlug="basilica" />
        </div>
      </section>

      <section className="grid gap-8 md:grid-cols-3">
        <div className="rounded-lg border p-6">
          <h2 className="text-lg font-semibold">E-Commerce Shop</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Candles, books, sacred art — Stripe test-mode checkout.
          </p>
        </div>
        <div className="rounded-lg border p-6">
          <h2 className="text-lg font-semibold">CRM Dashboard</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Bitrix24 embed with masked fictional data.
          </p>
        </div>
        <div className="rounded-lg border p-6">
          <h2 className="text-lg font-semibold">AI Pastoral Assistant</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            AI demo with citations and disclaimer.
          </p>
        </div>
      </section>
    </div>
  );
}
