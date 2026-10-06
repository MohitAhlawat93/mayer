import { HeroBackground } from "@/components/ui/HeroBackground";
import { siteContent } from "@/content/site-content";

const heroStats = [
  { value: "24", label: "Age" },
  { value: "170 cm", label: "Height" },
  { value: "Vienna", label: "Austria" },
  { value: "English", label: "Language" },
];

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate min-h-[100svh] overflow-hidden pt-[78px]"
    >
      <HeroBackground />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-78px)] max-w-[1500px] items-end px-5 pb-[12rem] pt-24 sm:px-7 md:items-center md:pb-[10.5rem] md:pt-16 lg:px-12">
        <div className="fade-up max-w-[650px]">
          <div className="flex items-center gap-4 text-[#e2c489]">
            <span className="h-px w-12 bg-current/70" />
            <p className="text-[9px] font-semibold uppercase tracking-[.34em]">
              Vienna · Austria
            </p>
          </div>

          <h1
            id="hero-title"
            className="mt-6 font-display text-[clamp(4.6rem,8vw,8rem)] font-light leading-[.78] tracking-[-.055em] text-[#fff8ec]"
          >
            Luxury
            <span className="block italic text-[#e5bd78]">in motion.</span>
          </h1>

          <p className="mt-7 max-w-[560px] text-[15px] font-medium leading-7 text-[#fff6e8]/90 sm:text-[17px]">
            {siteContent.profile.serviceSummary}
          </p>

          <p className="mt-3 max-w-[520px] text-sm leading-7 text-[#fff6e8]/68 sm:text-[15px]">
            {siteContent.profile.intro}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#performances"
              className="primary-button inline-flex min-h-12 items-center justify-center rounded-sm px-7 py-3.5 text-[9px] font-bold uppercase tracking-[.17em]"
            >
              Explore experiences
              <span className="ml-3 text-base font-normal">→</span>
            </a>
            <a
              href="#gallery"
              className="secondary-button inline-flex min-h-12 items-center justify-center rounded-sm px-7 py-3.5 text-[9px] font-bold uppercase tracking-[.17em] backdrop-blur-xl"
            >
              View gallery
            </a>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/12 bg-[#0f1715]/90 backdrop-blur-md">
        <div className="mx-auto grid max-w-[1500px] grid-cols-2 px-5 sm:px-7 md:grid-cols-4 lg:px-12">
          {heroStats.map((stat, index) => (
            <div
              key={stat.label}
              className={
                "py-5 sm:py-6 md:px-7 " +
                (index % 2 === 1 ? "border-l border-white/12" : "") +
                (index > 1 ? " border-t border-white/12 md:border-t-0" : "") +
                (index > 0 ? " md:border-l" : "")
              }
            >
              <p className="font-display text-2xl font-light text-[#e5bd78] sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-[7px] font-bold uppercase tracking-[.22em] text-[#fff8ec]/62">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
