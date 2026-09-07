"use client";

/**
 * DemoRibbon — corner ribbon indicating this is a demo site.
 *
 * Fixed position in the top-right corner. Provides a secondary visual
 * indicator alongside the DemoBanner.
 */
export function DemoRibbon() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed right-0 top-0 z-40 rotate-45 translate-x-[30%] translate-y-[-10%] rounded bg-demo-ribbon px-6 py-1 text-xs font-bold text-white shadow-md"
    >
      DEMO
    </div>
  );
}
