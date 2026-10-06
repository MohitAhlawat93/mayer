import { siteContent } from "@/content/site-content";

export function BodyMeasurements() {
  return (
    <section
      aria-labelledby="measurements-title"
      className="section-mist relative overflow-hidden border-y border-line px-5 py-16 sm:px-7 sm:py-20 lg:px-12"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-9 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-[8px] font-bold uppercase tracking-[.28em] text-accent">Measurements</p>
            <h2
              id="measurements-title"
              className="mt-4 font-display text-[clamp(2.8rem,4.6vw,4.6rem)] font-light tracking-[-.04em] text-deep"
            >
              Body <span className="italic text-[#9a7750]">measurements.</span>
            </h2>
            <p className="mt-4 text-sm text-muted">Listed in inches.</p>
          </div>

          <div className="grid grid-cols-3 border-y border-line">
            {siteContent.bodyMeasurements.map((measurement) => (
              <div
                key={measurement.label}
                className="border-r border-line px-3 py-6 text-center last:border-r-0 sm:px-6 sm:py-8"
              >
                <p className="font-display text-4xl font-light text-deep sm:text-5xl">{measurement.value}</p>
                <p className="mt-2 text-[7px] font-bold uppercase tracking-[.2em] text-muted">{measurement.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
