import "server-only";
import { getGoogleConnectionStatus } from "@/lib/growth/google-auth";
import { getSearchConsoleSnapshot } from "@/lib/growth/search-console";
import { getAnalyticsSnapshot } from "@/lib/growth/analytics-data";

export async function getGrowthSnapshot() {
  const status = getGoogleConnectionStatus();

  const searchConsole =
    status.credentialsConfigured && status.searchConsoleSiteConfigured
      ? await getSearchConsoleSnapshot().catch((error: unknown) => ({
          error: error instanceof Error ? error.message : "Search Console request failed.",
        }))
      : null;

  const analytics =
    status.credentialsConfigured && status.analyticsPropertyConfigured
      ? await getAnalyticsSnapshot().catch((error: unknown) => ({
          error: error instanceof Error ? error.message : "GA4 request failed.",
        }))
      : null;

  return {
    generatedAt: new Date().toISOString(),
    status,
    searchConsole,
    analytics,
  };
}

export type GrowthSnapshot = Awaited<ReturnType<typeof getGrowthSnapshot>>;
