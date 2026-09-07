"use client";

import { useState, useEffect, useCallback } from "react";

interface ResetStatus {
  lastReset: Date | null;
  nextReset: Date | null;
  isResetting: boolean;
}

/**
 * useDemoReset — hook that tracks the nightly reset status.
 *
 * Polls the reset endpoint to display the ResetClock component.
 * Shows a visual indicator when a reset is in progress.
 */
export function useDemoReset(templateSlug: string): ResetStatus & { refetch: () => void } {
  const [status, setStatus] = useState<ResetStatus>({
    lastReset: null,
    nextReset: null,
    isResetting: false,
  });

  const refetch = useCallback(async () => {
    try {
      const res = await fetch(`/api/reset-status?template=${templateSlug}`);
      if (res.ok) {
        const data = await res.json();
        setStatus({
          lastReset: data.lastReset ? new Date(data.lastReset) : null,
          nextReset: data.nextReset ? new Date(data.nextReset) : null,
          isResetting: data.isResetting ?? false,
        });
      }
    } catch {
      // Silently fail — reset status is non-critical
    }
  }, [templateSlug]);

  useEffect(() => {
    refetch();
    const interval = setInterval(refetch, 60_000);
    return () => clearInterval(interval);
  }, [refetch]);

  return { ...status, refetch };
}
