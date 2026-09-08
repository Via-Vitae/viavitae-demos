import { AssessmentCTA } from "@shared/design-system/components/demo";
import { TierTeaser } from "@shared/design-system/components/demo";

export default function ParishChurchHomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-4xl font-bold tracking-tight">Parish of St. Casimir</h1>
      <p className="mt-4 text-lg text-muted-foreground">Vilnius (demo) — Economy tier showcase</p>
      <div className="mt-8">
        <AssessmentCTA templateSlug="parish-church" />
      </div>
      <div className="mt-8">
        <TierTeaser currentTier="economy" />
      </div>
    </div>
  );
}
