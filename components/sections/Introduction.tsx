import { siteContent } from "@/content/site-content";

export function Introduction() {
  return (
    <section className="section-paper relative overflow-hidden px-5 py-20 sm:px-8 sm:py-24 lg:px-14 lg:py-32 xl:px-16">
      <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full border border-accent/10" />
      <div className="mx-auto max-w-[1120px] text-center">
        <div className="mx-auto flex w-fit items-center gap-4 text-accent">
          <span className="h-px w-11 bg-current/55" />
          <p className="text-[8px] font-bold uppercase tracking-[.32em]">More than a performance</p>
          <span className="h-px w-11 bg-current/55" />
        </div>

        <h2 className="mx-auto mt-7 max-w-5xl font-display text-[clamp(3.5rem,6vw,6rem)] font-medium leading-[.88] tracking-[-.04em] text-deep">
          A journey through
          <span className="block italic font-light text-[#a9712e]">movement.</span>
        </h2>

        <p className="mx-auto mt-7 max-w-2xl text-sm leading-8 text-muted sm:text-[16px]">
          {siteContent.profile.intro} Based in Vienna, with a focus on elegant presentation, expressive movement, and direct communication.
        </p>
      </div>
    </section>
  );
}
