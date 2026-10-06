import { siteContent } from "@/content/site-content";

const displayLabels = ["Age", "Height", "Weight", "Languages", "City", "Country"] as const;

export function ProfileDetails() {
  const displayFacts = displayLabels.map(
    (label) => siteContent.facts.find((fact) => fact.label === label)!,
  );

  return (
    <section id="profile" className="section-paper relative overflow-hidden px-5 py-20 sm:px-8 sm:py-24 lg:px-14 lg:py-32 xl:px-16">
      <div className="mx-auto max-w-[1380px]">
        <div className="grid gap-7 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-[8px] font-bold uppercase tracking-[.3em] text-[#a9712e]">At a glance</p>
            <h2 className="mt-4 font-display text-[clamp(3.2rem,5vw,5.5rem)] font-medium leading-[.9] tracking-[-.04em] text-deep">
              The essential
              <span className="block italic font-light text-[#a9712e]">details.</span>
            </h2>
          </div>
          <p className="max-w-lg justify-self-start text-sm leading-7 text-muted lg:justify-self-end">
            A concise public profile with the key information easy to scan before you get in touch.
          </p>
        </div>

        <dl className="mt-11 grid border-y border-line sm:grid-cols-2 lg:grid-cols-3">
          {displayFacts.map((fact, index) => (
            <div
              key={fact.label}
              className={
                "px-1 py-7 sm:px-6 lg:py-9 " +
                (index % 3 !== 0 ? "lg:border-l lg:border-line" : "") +
                (index < 3 ? "border-b border-line" : "")
              }
            >
              <dt className="text-[7px] font-bold uppercase tracking-[.22em] text-muted">{fact.label}</dt>
              <dd className="mt-2 font-display text-3xl font-medium text-deep sm:text-[2.2rem]">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
