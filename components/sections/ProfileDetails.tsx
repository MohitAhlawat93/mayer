import { siteContent } from "@/content/site-content";

const displayLabels = ["Age", "Height", "Weight", "Languages", "City", "Country"] as const;

export function ProfileDetails() {
  const displayFacts = displayLabels.map(
    (label) => siteContent.facts.find((fact) => fact.label === label)!,
  );

  return (
    <section id="profile" className="section-paper relative overflow-hidden px-5 py-20 sm:px-7 sm:py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[8px] font-bold uppercase tracking-[.28em] text-accent">At a glance</p>
            <h2 className="mt-4 font-display text-[clamp(3.2rem,5vw,5.4rem)] font-light tracking-[-.045em] text-deep">
              The essential <span className="italic text-[#a87538]">details.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-muted">
            A concise public profile with the key information easy to find.
          </p>
        </div>

        <dl className="mt-11 grid border-y border-line sm:grid-cols-2 lg:grid-cols-3">
          {displayFacts.map((fact, index) => (
            <div
              key={fact.label}
              className={
                "border-b border-line px-1 py-7 sm:px-6 lg:py-8 " +
                (index % 3 !== 0 ? "lg:border-l" : "") +
                (index > 2 ? "lg:border-b-0" : "")
              }
            >
              <dt className="text-[7px] font-bold uppercase tracking-[.22em] text-muted">{fact.label}</dt>
              <dd className="mt-2 font-display text-3xl font-light text-deep sm:text-[2.15rem]">{fact.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm leading-7 text-muted">
            Current availability and travel arrangements are confirmed directly.
          </p>
          <div className="glass-surface inline-flex w-fit items-center gap-3 rounded-full px-4 py-2.5">
            <span className="availability-pulse h-2 w-2 rounded-full bg-accent" />
            <span className="text-[8px] font-bold uppercase tracking-[.18em] text-muted-strong">
              {siteContent.profile.status}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
