import type { Metadata } from "next";
import { GrowthDashboard } from "@/components/growth/GrowthDashboard";
import { growthConfig } from "@/content/growth-config";

export const metadata: Metadata = {
  title: "Growth intelligence",
  robots: { index: false, follow: false },
};

export default function GrowthAdminPage() {
  return (
    <main className="min-h-screen bg-[#f7f2ea] px-5 py-10 text-[#162f32] sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-[10px] font-semibold uppercase tracking-[.22em] text-[#8b6b4a]">
          GROWTH-01 + GROWTH-02
        </p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-light sm:text-5xl">
          Search & traffic intelligence
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[#5b6664]">
          First-party Google Search Console, analytics and conversion intelligence
          for {growthConfig.client.name}. This route is noindex and live data is
          protected behind an admin secret.
        </p>
        <GrowthDashboard />
      </div>
    </main>
  );
}
