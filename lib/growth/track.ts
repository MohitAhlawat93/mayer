import type { GrowthEventName } from "@/content/growth-config";

type GrowthEventParams = Record<
  string,
  string | number | boolean | undefined
>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackGrowthEvent(
  eventName: GrowthEventName,
  params: GrowthEventParams = {},
) {
  if (typeof window === "undefined") return;

  window.gtag?.("event", eventName, {
    ...params,
    page_path: window.location.pathname,
  });

  window.dispatchEvent(
    new CustomEvent("growth:event", {
      detail: { eventName, params, timestamp: new Date().toISOString() },
    }),
  );
}
