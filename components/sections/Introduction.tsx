import { siteContent } from "@/content/site-content";

export function Introduction() {
  return (
    <section className="section-paper relative overflow-hidden px-5 py-20 sm:px-7 sm:py-24 lg:px-12 lg:py-32">
      <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full border border-accent/10" />
      <div className="pointer-events-none absolute -left-24 bottom-0 h-80 w-80 rounded-full border border-accent/10" />

      <div className="mx-auto max-w-[1180px] text-center">
        <div className="mx-auto flex w-fit items-center gap-4 text-accent">
          <span className="h-px w-10 bg-current/55" />
          <p className="text-[8px] font-bold uppercase tracking-[.3em]">More than a performance</p>
          <span className="h-px w-10 bg-current/55" />
        </div>

        <h2 className="mx-auto mt-7 max-w-5xl font-display text-[clamp(3.4rem,6vw,6.4rem)] font-light leading-[.9] tracking-[-.045em] text-deep">
          A journey through
          <span className="block italic text-[#a87538]">movement.</span>
        </h2>

        <p className="mx-auto mt-7 max-w-2xl text-sm leading-8 text-muted sm:text-[16px]">
          {siteContent.profile.bio}
        </p>

        <blockquote className="mx-auto mt-8 max-w-3xl font-display text-2xl font-light italic leading-relaxed text-[#51483d] sm:text-3xl">
          “{siteContent.profile.quote}”
        </blockquote>
      </div>
    </section>
  );
}
