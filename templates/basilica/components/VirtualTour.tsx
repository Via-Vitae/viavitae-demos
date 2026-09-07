"use client";

/**
 * VirtualTour — VIP-only virtual tour component.
 *
 * Provides an interactive 360° view of the basilica interior.
 * Only available on the VIP tier.
 */
export function VirtualTour() {
  return (
    <div className="aspect-video w-full rounded-lg border bg-muted flex items-center justify-center">
      <p className="text-muted-foreground">Virtual Tour — 360° view (placeholder)</p>
    </div>
  );
}
