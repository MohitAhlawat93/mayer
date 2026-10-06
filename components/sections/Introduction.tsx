import { siteContent } from "@/content/site-content";

export function Introduction() {
  return (
    <section className="section-paper relative overflow-hidden px-5 py-20 sm:px-7 sm:py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1440px]">
        <p className="text-[8px] font-bold uppercase tracking-[.28em] text-accent">
          Introduction
        </p>

        <div className="mt-7 grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
          <h2 className="max-w-2xl font-display text-[clamp(3.2rem,5.6vw,5.7rem)] font-light leading-[.94] tracking-[-.045em] text-deep">
            Quiet confidence,
            <span className="block italic text-[#9a7750]">beautifully understated.</span>
          </h2>

          <div className="max-w-2xl self-end">
            <div className="h-px w-16 bg-accent/55" />
            <p className="mt-6 text-sm leading-8 text-muted sm:text-[15px]">
              {siteContent.profile.bio}
            </p>
            <blockquote className="mt-7 font-display text-2xl font-light italic leading-relaxed text-[#48544e] sm:text-3xl">
              “{siteContent.profile.quote}”
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
