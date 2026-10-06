import { HeroBackground } from "@/components/ui/HeroBackground";
import { siteContent } from "@/content/site-content";

type StatIconProps = { kind: "age" | "height" | "place" | "language" };

function StatIcon({ kind }: StatIconProps) {
  if (kind === "age") {
    return (
      <svg viewBox="0 0 40 40" className="h-9 w-9" fill="none" aria-hidden="true">
        <path d="M20 4.5c5.1 5.5 10.8 9.7 10.8 16.4A10.8 10.8 0 1 1 9.2 21C9.2 14.2 14.9 10 20 4.5Z" stroke="currentColor" strokeWidth="1.35"/>
        <path d="M14.2 21.2c3.7-.2 6.2-2.1 7.4-5.6 1.2 3.5 3.7 5.4 7.4 5.6-3.7.4-6.2 2.4-7.4 6-1.2-3.6-3.7-5.6-7.4-6Z" stroke="currentColor" strokeWidth="1.15"/>
      </svg>
    );
  }

  if (kind === "height") {
    return (
      <svg viewBox="0 0 40 40" className="h-9 w-9" fill="none" aria-hidden="true">
        <path d="M20 5v30M13 11l7-6 7 6M13 29l7 6 7-6M10 16h20M10 24h20" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }

  if (kind === "place") {
    return (
      <svg viewBox="0 0 40 40" className="h-9 w-9" fill="none" aria-hidden="true">
        <path d="M20 35s10-9.5 10-18A10 10 0 0 0 10 17c0 8.5 10 18 10 18Z" stroke="currentColor" strokeWidth="1.35"/>
        <circle cx="20" cy="17" r="3.6" stroke="currentColor" strokeWidth="1.35"/>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 40 40" className="h-9 w-9" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1.35"/>
      <path d="M6 20h28M20 6c4 4.1 6.2 8.8 6.2 14S24 29.9 20 34c-4-4.1-6.2-8.8-6.2-14S16 10.1 20 6Z" stroke="currentColor" strokeWidth="1.35"/>
    </svg>
  );
}

const heroStats = [
  { value: "24", label: "Age", kind: "age" as const },
  { value: "170 cm", label: "Height", kind: "height" as const },
  { value: "Vienna", label: "Austria", kind: "place" as const },
  { value: "English", label: "Language", kind: "language" as const },
];

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate min-h-[100svh] overflow-hidden"
    >
      <HeroBackground />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1500px] items-end px-5 pb-[11.5rem] pt-32 sm:px-8 md:items-center md:pb-[9.5rem] md:pt-28 lg:px-14 xl:px-16">
        <div className="fade-up max-w-[570px]">
          <div className="flex items-center gap-4 text-[#171914]">
            <p className="text-[9px] font-bold uppercase tracking-[.32em]">
              {siteContent.hero.kicker}
            </p>
            <span className="h-px w-14 bg-current/55" />
          </div>

          <h1
            id="hero-title"
            className="hero-copy-shadow mt-6 font-display text-[clamp(4.7rem,7.7vw,7.7rem)] font-medium uppercase leading-[.80] tracking-[-.045em] text-[#101210]"
          >
            {siteContent.hero.titleLine1}
            <span className="block">{siteContent.hero.titleLine2}</span>
          </h1>

          <p className="mt-6 max-w-[470px] text-[15px] font-medium leading-7 text-[#18201c] sm:text-[16px]">
            {siteContent.hero.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={siteContent.hero.primaryCtaHref}
              className="primary-button inline-flex min-h-13 items-center justify-center rounded-[3px] px-7 py-4 text-[9px] font-bold uppercase tracking-[.16em]"
            >
              {siteContent.hero.primaryCtaLabel}
              <span className="ml-4 text-lg font-normal">→</span>
            </a>

            <a
              href={siteContent.hero.secondaryCtaHref}
              className="secondary-button inline-flex min-h-13 items-center justify-center rounded-[3px] px-6 py-4 text-[9px] font-bold uppercase tracking-[.16em] backdrop-blur-md"
            >
              <span className="mr-3 flex h-7 w-7 items-center justify-center rounded-full border border-current/55 text-[10px]">▶</span>
              {siteContent.hero.secondaryCtaLabel}
            </a>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 border-t border-[#e6c784]/38 bg-[#0c1110]/96 text-[#f2cf8b] shadow-[0_-10px_35px_rgba(0,0,0,.16)]">
        <div className="mx-auto grid max-w-[1500px] grid-cols-2 px-4 sm:px-8 md:grid-cols-4 lg:px-14 xl:px-16">
          {heroStats.map((stat, index) => (
            <div
              key={stat.label}
              className={
                "flex min-h-[104px] items-center gap-4 py-5 md:min-h-[118px] md:px-7 " +
                (index % 2 === 1 ? "border-l border-white/12 pl-5" : "") +
                (index > 1 ? " border-t border-white/12 md:border-t-0" : "") +
                (index > 0 ? " md:border-l md:border-white/12" : "")
              }
            >
              <div className="shrink-0 text-[#d9aa58]">
                <StatIcon kind={stat.kind} />
              </div>
              <div>
                <p className="font-display text-[1.9rem] font-medium leading-none text-[#f0c97d] md:text-[2.2rem]">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-[7px] font-semibold uppercase tracking-[.2em] text-white/63">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
