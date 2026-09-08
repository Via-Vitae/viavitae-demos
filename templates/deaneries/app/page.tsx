import { AssessmentCTA } from "@shared/design-system/components/demo";

export default function DeaneriesHomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-4xl font-bold tracking-tight">Vilnius I Deanery</h1>
      <p className="mt-4 text-lg text-muted-foreground">(demo) — Deanery showcase</p>
      <div className="mt-8">
        <AssessmentCTA templateSlug="deaneries" />
      </div>
    </div>
  );
}
