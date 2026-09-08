import { AssessmentCTA } from "@shared/design-system/components/demo";

export default function CathedralHomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-4xl font-bold tracking-tight">Cathedral of the Holy Cross</h1>
      <p className="mt-4 text-lg text-muted-foreground">Kaunas (demo) — Normal tier showcase</p>
      <div className="mt-8">
        <AssessmentCTA templateSlug="cathedral" />
      </div>
    </div>
  );
}
