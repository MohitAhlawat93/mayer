import { siteContent } from "@/content/site-content";

const displayLabels = ["Age", "Height", "Hair", "City"] as const;

export function ProfileDetails() {
  const displayFacts = displayLabels.map(
    (label) => siteContent.facts.find((fact) => fact.label === label)!,
  );
  const language = siteContent.facts.find((fact) => fact.label === "Languages")!;

  return (
    <section id="profile" className="section-paper relative overflow-hidden px-5 py-20 sm:px-7 sm:py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[8px] font-bold uppercase tracking-[.28em] text-accent">At a glance</p>
            <h2 className="mt-4 font-display text-[clamp(3rem,5vw,5.1rem)] font-light tracking-[-.045em] text-deep">
              Simple <span className="italic text-[#9a7750]">details.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-muted">
            A concise profile, with the essentials easy to scan.
          </p>
        </div>

        <dl className="mt-11 grid border-y border-line sm:grid-cols-2 lg:grid-cols-4">
          {displayFacts.map((fact, index) => (
            <div
              key={fact.label}
              className={"border-b border-line py-6 sm:px-6 lg:border-b-0 " + (index > 0 ? "lg:border-l" : "")}
            >
              <dt className="text-[7px] font-bold uppercase tracking-[.2em] text-muted">{fact.label}</dt>
              <dd className="mt-2 font-display text-2xl font-light text-deep sm:text-3xl">{fact.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[7px] font-bold uppercase tracking-[.2em] text-muted">Language</p>
            <p className="mt-1.5 text-sm font-medium text-muted-strong">{language.value}</p>
          </div>
          <div className="glass-surface inline-flex w-fit items-center gap-3 rounded-full px-4 py-2.5">
            <span className="availability-pulse h-2 w-2 rounded-full bg-[#3d8b6d]" />
            <span className="text-[8px] font-bold uppercase tracking-[.18em] text-muted-strong">
              {siteContent.profile.status}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
