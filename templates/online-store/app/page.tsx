import { AssessmentCTA } from "@shared/design-system/components/demo";
import { CheckoutDemoBanner } from "@shared/design-system/components/commerce";

export default function OnlineStoreHomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-4xl font-bold tracking-tight">ViaVitae Shop</h1>
      <p className="mt-4 text-lg text-muted-foreground">(demo) — €1,900 flat package</p>
      <div className="mt-4">
        <CheckoutDemoBanner />
      </div>
      <div className="mt-8">
        <AssessmentCTA templateSlug="online-store" />
      </div>
    </div>
  );
}
