import "server-only";
import { getGoogleAccessToken } from "@/lib/growth/google-auth";
import { getSiteUrl } from "@/content/site-content";

export type SearchConsoleRow = {
  key: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

type SearchConsoleApiResponse = {
  rows?: Array<{
    keys?: string[];
    clicks?: number;
    impressions?: number;
    ctr?: number;
    position?: number;
  }>;
};

function isoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function defaultRange() {
  const end = new Date();
  end.setUTCDate(end.getUTCDate() - 2);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - 27);
  return { startDate: isoDate(start), endDate: isoDate(end) };
}

async function querySearchConsole(dimension: "query" | "page" | "country" | "device") {
  const token = await getGoogleAccessToken();
  const siteUrl =
    process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL?.trim() || getSiteUrl();
  const range = defaultRange();

  const response = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...range,
        dimensions: [dimension],
        rowLimit: 10,
        dataState: "final",
      }),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(
      `Search Console ${dimension} request failed (${response.status}): ${detail.slice(0, 240)}`,
    );
  }

  const data = (await response.json()) as SearchConsoleApiResponse;
  return {
    range,
    rows: (data.rows ?? []).map((row) => ({
      key: row.keys?.[0] ?? "(unknown)",
      clicks: row.clicks ?? 0,
      impressions: row.impressions ?? 0,
      ctr: row.ctr ?? 0,
      position: row.position ?? 0,
    })),
  };
}

export async function getSearchConsoleSnapshot() {
  const [queries, pages, countries, devices] = await Promise.all([
    querySearchConsole("query"),
    querySearchConsole("page"),
    querySearchConsole("country"),
    querySearchConsole("device"),
  ]);

  const totals = queries.rows.reduce(
    (acc, row) => {
      acc.clicks += row.clicks;
      acc.impressions += row.impressions;
      return acc;
    },
    { clicks: 0, impressions: 0 },
  );

  return {
    range: queries.range,
    totals: {
      ...totals,
      ctr: totals.impressions ? totals.clicks / totals.impressions : 0,
    },
    queries: queries.rows,
    pages: pages.rows,
    countries: countries.rows,
    devices: devices.rows,
  };
}
