import { AssessmentCTA } from "@shared/design-system/components/demo";

export default function FuneralServicesHomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-4xl font-bold tracking-tight">Memorial Funeral Home</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        (demo) — Dignified services, 24/7 support
      </p>
      <div className="mt-8">
        <AssessmentCTA templateSlug="funeral-services" />
      </div>
    </div>
  );
}
