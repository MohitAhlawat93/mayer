import { siteContent } from "@/content/site-content";

export function Services() {
  return (
    <section
      id="services"
      className="section-soft relative overflow-hidden px-5 py-20 sm:px-8 sm:py-24 lg:px-14 lg:py-32 xl:px-16"
    >
      <div className="mx-auto max-w-[1380px]">
        <div className="grid gap-7 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-[8px] font-bold uppercase tracking-[.3em] text-[#a9712e]">
              Services
            </p>
            <h2 className="mt-4 font-display text-[clamp(3.3rem,5.2vw,5.7rem)] font-medium leading-[.9] tracking-[-.04em] text-deep">
              Public
              <span className="block italic font-light text-[#a9712e]">
                services.
              </span>
            </h2>
          </div>

          <p className="max-w-lg text-sm leading-7 text-muted lg:justify-self-end">
            A clear overview of Mayer&apos;s public performance and creative enquiries.
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {siteContent.publicServices.map((service, index) => (
            <article
              key={service.title + service.eyebrow}
              className="min-h-[250px] bg-[#fffaf0] p-7 transition hover:bg-[#f8efdf]"
            >
              <div className="flex items-center justify-between border-b border-line pb-5">
                <span className="font-display text-2xl font-light text-[#b27c36]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[7px] font-bold uppercase tracking-[.2em] text-muted">
                  {service.eyebrow}
                </span>
              </div>

              <h3 className="mt-7 font-display text-3xl font-medium leading-none text-deep">
                {service.title}
              </h3>
              <p className="mt-5 text-sm leading-7 text-muted">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
