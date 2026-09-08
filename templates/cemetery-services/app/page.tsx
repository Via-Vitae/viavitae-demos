import { AssessmentCTA } from "@shared/design-system/components/demo";

export default function CemeteryServicesHomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-4xl font-bold tracking-tight">Rasos Cemetery Services</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        (demo) — GIS map, digitisation, maintenance
      </p>
      <div className="mt-8">
        <AssessmentCTA templateSlug="cemetery-services" />
      </div>
    </div>
  );
}
