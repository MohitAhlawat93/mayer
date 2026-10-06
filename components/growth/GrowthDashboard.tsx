"use client";

import { FormEvent, useState } from "react";

type SearchRow = {
  key: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

type Snapshot = {
  generatedAt: string;
  status: {
    credentialsConfigured: boolean;
    searchConsoleSiteConfigured: boolean;
    analyticsPropertyConfigured: boolean;
  };
  searchConsole:
    | null
    | { error: string }
    | {
        range: { startDate: string; endDate: string };
        totals: { clicks: number; impressions: number; ctr: number };
        queries: SearchRow[];
        pages: SearchRow[];
        countries: SearchRow[];
        devices: SearchRow[];
      };
  analytics:
    | null
    | { error: string }
    | {
        range: { startDate: string; endDate: string };
        sessions: number;
        users: number;
        pageViews: number;
        conversions: number;
        conversionEvents: Array<{ eventName: string; count: number }>;
      };
};

function MetricCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <article className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
      <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#837463]">{label}</p>
      <p className="mt-3 font-[family-name:var(--font-display)] text-4xl font-light text-[#17383a]">{value}</p>
      <p className="mt-2 text-xs leading-5 text-[#737b78]">{hint}</p>
    </article>
  );
}

function SearchTable({ title, rows }: { title: string; rows: SearchRow[] }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
      <div className="border-b border-black/10 px-5 py-4">
        <h2 className="text-sm font-semibold text-[#17383a]">{title}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-xs">
          <thead className="bg-[#f7f2ea] text-[#776d62]">
            <tr>
              <th className="px-5 py-3 font-semibold">Item</th>
              <th className="px-4 py-3 font-semibold">Clicks</th>
              <th className="px-4 py-3 font-semibold">Impressions</th>
              <th className="px-4 py-3 font-semibold">CTR</th>
              <th className="px-4 py-3 font-semibold">Position</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key} className="border-t border-black/[.06]">
                <td className="max-w-[360px] break-words px-5 py-3 text-[#3c4543]">{row.key}</td>
                <td className="px-4 py-3">{row.clicks.toLocaleString()}</td>
                <td className="px-4 py-3">{row.impressions.toLocaleString()}</td>
                <td className="px-4 py-3">{(row.ctr * 100).toFixed(1)}%</td>
                <td className="px-4 py-3">{row.position.toFixed(1)}</td>
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr><td colSpan={5} className="px-5 py-6 text-[#777]">No data returned for this period.</td></tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </article>
  );
}

export function GrowthDashboard() {
  const [secret, setSecret] = useState("");
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function load(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/growth/summary", {
        headers: { Authorization: `Bearer ${secret}` },
        cache: "no-store",
      });
      const data = await response.json();
      if (!response.ok) {
        setSnapshot(null);
        setError(data.error ?? "Could not load growth data.");
        return;
      }
      setSnapshot(data as Snapshot);
    } catch {
      setError("Could not reach the growth data service.");
    } finally {
      setLoading(false);
    }
  }

  const search =
    snapshot?.searchConsole && !("error" in snapshot.searchConsole)
      ? snapshot.searchConsole
      : null;
  const analytics =
    snapshot?.analytics && !("error" in snapshot.analytics)
      ? snapshot.analytics
      : null;

  return (
    <>
      <form onSubmit={load} className="mt-8 rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
        <label className="text-xs font-semibold text-[#596260]" htmlFor="growth-secret">
          Admin secret
        </label>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <input
            id="growth-secret"
            type="password"
            value={secret}
            onChange={(event) => setSecret(event.target.value)}
            autoComplete="current-password"
            className="min-h-11 flex-1 rounded-xl border border-black/10 px-4 text-sm outline-none focus:border-[#8b6b4a]"
            placeholder="Enter GROWTH_ADMIN_SECRET"
          />
          <button
            type="submit"
            disabled={!secret || loading}
            className="min-h-11 rounded-xl bg-[#17383a] px-5 text-xs font-bold uppercase tracking-[.12em] text-white disabled:opacity-40"
          >
            {loading ? "Loading…" : "Load live data"}
          </button>
        </div>
        {error ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}
      </form>

      {snapshot ? (
        <>
          <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard label="Search clicks" value={(search?.totals.clicks ?? 0).toLocaleString()} hint="Search Console · recent finalized period" />
            <MetricCard label="Impressions" value={(search?.totals.impressions ?? 0).toLocaleString()} hint="Google Search visibility" />
            <MetricCard label="Sessions" value={(analytics?.sessions ?? 0).toLocaleString()} hint="GA4 · last 28 days" />
            <MetricCard label="Tracked actions" value={(analytics?.conversions ?? 0).toLocaleString()} hint="Contact, booking and concierge events" />
          </section>

          <section className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["Google credentials", snapshot.status.credentialsConfigured],
              ["Search Console property", snapshot.status.searchConsoleSiteConfigured],
              ["GA4 reporting property", snapshot.status.analyticsPropertyConfigured],
            ].map(([label, ok]) => (
              <article key={String(label)} className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold text-[#17383a]">{String(label)}</p>
                <p className={ok ? "mt-3 text-xs font-semibold text-emerald-700" : "mt-3 text-xs font-semibold text-amber-700"}>
                  {ok ? "Connected / configured" : "Action needed"}
                </p>
              </article>
            ))}
          </section>

          {snapshot.searchConsole && "error" in snapshot.searchConsole ? (
            <p className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              Search Console: {snapshot.searchConsole.error}
            </p>
          ) : null}

          {snapshot.analytics && "error" in snapshot.analytics ? (
            <p className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              GA4: {snapshot.analytics.error}
            </p>
          ) : null}

          {search ? (
            <section className="mt-8 space-y-5">
              <SearchTable title="Top search queries" rows={search.queries} />
              <SearchTable title="Top landing pages from search" rows={search.pages} />
              <div className="grid gap-5 lg:grid-cols-2">
                <SearchTable title="Search visibility by country" rows={search.countries} />
                <SearchTable title="Search visibility by device" rows={search.devices} />
              </div>
            </section>
          ) : null}

          {analytics ? (
            <section className="mt-8 rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
              <h2 className="text-sm font-semibold text-[#17383a]">Conversion demand</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {analytics.conversionEvents.map((event) => (
                  <div key={event.eventName} className="rounded-xl bg-[#f7f2ea] p-4">
                    <p className="break-words text-xs font-semibold text-[#61594f]">{event.eventName}</p>
                    <p className="mt-2 text-2xl font-light text-[#17383a]">{event.count.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <p className="mt-6 text-xs text-[#7a817f]">
            Generated {new Date(snapshot.generatedAt).toLocaleString()}. No Google credentials are sent to the browser.
          </p>
        </>
      ) : (
        <section className="mt-8 rounded-2xl border border-black/10 bg-[#17383a] p-6 text-white shadow-sm">
          <h2 className="text-lg font-semibold">GROWTH-02 is ready for live first-party data</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-white/70">
            Unlock this dashboard to see Search Console and GA4 data when the required Google account values are configured in Vercel.
          </p>
        </section>
      )}
    </>
  );
}
