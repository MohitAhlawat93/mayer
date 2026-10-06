import { HeroBackground } from "@/components/ui/HeroBackground";
import { siteContent } from "@/content/site-content";

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate min-h-[100svh] overflow-hidden pt-[68px]"
    >
      <HeroBackground />

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-68px)] max-w-[1500px] items-end px-5 pb-16 pt-28 sm:px-7 sm:pb-20 md:items-center md:py-24 lg:px-12">
        <div className="fade-up max-w-[570px]">
          <p className="text-[9px] font-bold uppercase tracking-[.3em] text-[#8b693e]">
            {siteContent.profile.name} · {siteContent.profile.city}
          </p>

          <h1
            id="hero-title"
            className="mt-5 font-display text-[clamp(3.8rem,7vw,6.8rem)] font-light leading-[.84] tracking-[-.055em] text-[#202a26]"
          >
            Elegance
            <span className="block italic text-[#9a7750]">in motion.</span>
          </h1>

          <p className="mt-7 max-w-[500px] text-[15px] font-medium leading-7 text-[#3e4944] sm:text-base">
            {siteContent.profile.serviceSummary}
          </p>

          <p className="mt-3 max-w-[500px] text-sm leading-7 text-[#69716c] sm:text-[15px]">
            {siteContent.profile.intro}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#rates"
              className="primary-button inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3.5 text-[9px] font-bold uppercase tracking-[.17em]"
            >
              View bookings
            </a>
            <a
              href="#gallery"
              className="secondary-button inline-flex min-h-12 items-center justify-center rounded-full px-6 py-3.5 text-[9px] font-bold uppercase tracking-[.17em] backdrop-blur-xl"
            >
              View gallery
            </a>
          </div>

          <div className="glass-surface mt-9 inline-flex items-center gap-3 rounded-full px-4 py-2.5">
            <span className="availability-pulse h-2 w-2 rounded-full bg-[#3d8b6d]" />
            <span className="text-[8px] font-bold uppercase tracking-[.18em] text-[#56615b]">
              {siteContent.profile.status}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
