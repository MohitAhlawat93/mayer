import "server-only";
import { getGoogleAccessToken } from "@/lib/growth/google-auth";
import { growthConfig } from "@/content/growth-config";

type GaRow = {
  dimensionValues?: Array<{ value?: string }>;
  metricValues?: Array<{ value?: string }>;
};

type GaResponse = { rows?: GaRow[] };

async function runReport(body: Record<string, unknown>) {
  const propertyId = process.env.GOOGLE_ANALYTICS_PROPERTY_ID?.trim();
  if (!propertyId) {
    throw new Error("GOOGLE_ANALYTICS_PROPERTY_ID is not configured.");
  }

  const token = await getGoogleAccessToken();
  const response = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(
      `GA4 Data API request failed (${response.status}): ${detail.slice(0, 240)}`,
    );
  }

  return (await response.json()) as GaResponse;
}

function numberAt(row: GaRow | undefined, index: number) {
  return Number(row?.metricValues?.[index]?.value ?? 0);
}

export async function getAnalyticsSnapshot() {
  const [traffic, events] = await Promise.all([
    runReport({
      dateRanges: [{ startDate: "28daysAgo", endDate: "yesterday" }],
      metrics: [
        { name: "sessions" },
        { name: "totalUsers" },
        { name: "screenPageViews" },
      ],
    }),
    runReport({
      dateRanges: [{ startDate: "28daysAgo", endDate: "yesterday" }],
      dimensions: [{ name: "eventName" }],
      metrics: [{ name: "eventCount" }],
      dimensionFilter: {
        filter: {
          fieldName: "eventName",
          inListFilter: { values: [...growthConfig.trackedEvents] },
        },
      },
      limit: 50,
    }),
  ]);

  const trafficRow = traffic.rows?.[0];
  const conversionEvents = (events.rows ?? []).map((row) => ({
    eventName: row.dimensionValues?.[0]?.value ?? "(unknown)",
    count: numberAt(row, 0),
  }));
  const conversions = conversionEvents.reduce((sum, row) => sum + row.count, 0);

  return {
    range: { startDate: "28daysAgo", endDate: "yesterday" },
    sessions: numberAt(trafficRow, 0),
    users: numberAt(trafficRow, 1),
    pageViews: numberAt(trafficRow, 2),
    conversions,
    conversionEvents,
  };
}
