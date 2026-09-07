import { AssessmentCTA } from "@shared/design-system/components/demo";

export default function DioceseHomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-4xl font-bold tracking-tight">Diocese of Vilnius</h1>
      <p className="mt-4 text-lg text-muted-foreground">(demo) — Diocese-wide showcase</p>
      <div className="mt-8"><AssessmentCTA templateSlug="diocese" /></div>
    </div>
  );
}
