import { TrackedLink } from "@/components/growth/TrackedLink";
import { getWhatsAppHref, siteContent } from "@/content/site-content";

export function DanceBookings() {
  return (
    <section id="rates" className="section-soft relative overflow-hidden px-5 py-20 sm:px-7 sm:py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1440px]">
        <p className="text-[8px] font-bold uppercase tracking-[.28em] text-accent">
          {siteContent.seo.serviceLabel} · {siteContent.profile.city}
        </p>

        <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-3xl font-display text-[clamp(3rem,5vw,5.2rem)] font-light leading-[.96] tracking-[-.045em] text-deep">
            Clear, considered <span className="italic text-[#9a7750]">bookings.</span>
          </h2>
          <p className="max-w-md text-sm leading-7 text-muted">{siteContent.seo.serviceDescription}</p>
        </div>

        <div className="mt-11 grid gap-4 lg:grid-cols-3">
          {siteContent.danceBookings.map((item, index) => (
            <article
              key={item.title}
              className="editorial-card depth-card flex min-h-[330px] flex-col justify-between rounded-[1.4rem] p-6 sm:p-7"
            >
              <div>
                <div className="flex items-center justify-between border-b border-line pb-5">
                  <span className="font-display text-2xl font-light text-accent">0{index + 1}</span>
                  <span className="text-[7px] font-bold uppercase tracking-[.2em] text-muted">Dance</span>
                </div>

                <h3 className="mt-7 max-w-sm font-display text-3xl font-light leading-[1.06] text-deep">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-sm text-sm leading-7 text-muted">{item.note}</p>
              </div>

              <div className="mt-9">
                <div className="flex items-end justify-between gap-3">
                  <p className="font-display text-4xl font-light tracking-[-.035em] text-deep">{item.price}</p>
                  <p className="pb-1 text-[7px] font-bold uppercase tracking-[.18em] text-muted">{item.suffix}</p>
                </div>
                <TrackedLink
                  href={getWhatsAppHref(item.inquiry)}
                  target={siteContent.contact.whatsapp.configured ? "_blank" : undefined}
                  rel={siteContent.contact.whatsapp.configured ? "noreferrer" : undefined}
                  eventName="booking_inquiry_click"
                  eventParams={{ package: item.title, channel: "whatsapp" }}
                  className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-full border border-deep/14 bg-[#fffdf9]/75 px-5 text-[8px] font-bold uppercase tracking-[.18em] text-deep transition hover:bg-[#fffdf9]"
                >
                  Inquire
                </TrackedLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
