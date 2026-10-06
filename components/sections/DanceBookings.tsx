import { TrackedLink } from "@/components/growth/TrackedLink";
import { getWhatsAppHref, siteContent } from "@/content/site-content";

export function DanceBookings() {
  return (
    <section
      id="rates"
      className="relative overflow-hidden bg-[#101613] px-5 py-20 text-[#fff8ec] sm:px-8 sm:py-24 lg:px-14 lg:py-32 xl:px-16"
    >
      <div className="pointer-events-none absolute -right-20 top-8 h-96 w-96 rounded-full border border-[#d4a55b]/10" />

      <div className="mx-auto max-w-[1380px]">
        <p className="text-[8px] font-bold uppercase tracking-[.3em] text-[#d7a653]">
          {siteContent.seo.serviceLabel} · {siteContent.profile.city}
        </p>

        <div className="mt-5 grid gap-7 lg:grid-cols-[1fr_.7fr] lg:items-end">
          <h2 className="max-w-3xl font-display text-[clamp(3.3rem,5.3vw,5.8rem)] font-medium leading-[.88] tracking-[-.04em]">
            Dance
            <span className="block italic font-light text-[#e1b86f]">
              bookings.
            </span>
          </h2>

          <p className="max-w-md text-sm leading-7 text-white/58">
            {siteContent.seo.serviceDescription}
          </p>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden border border-white/12 bg-white/12 md:grid-cols-2 lg:grid-cols-3">
          {siteContent.danceBookings.map((item, index) => (
            <article
              key={item.title + item.duration}
              className="flex min-h-[340px] flex-col justify-between bg-[#121a17] p-7 transition hover:bg-[#17211d]"
            >
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <span className="font-display text-2xl font-light text-[#d8a957]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[7px] font-bold uppercase tracking-[.2em] text-white/38">
                    {item.duration}
                  </span>
                </div>

                <h3 className="mt-8 max-w-sm font-display text-[2.3rem] font-medium leading-[.98] text-[#fff8ec]">
                  {item.title}
                </h3>
                <p className="mt-5 max-w-sm text-sm leading-7 text-white/52">
                  {item.note}
                </p>
              </div>

              <div className="mt-10 flex items-end justify-between gap-4">
                <p className="font-display text-2xl font-light text-[#d8a957]">
                  {item.price}
                </p>

                <TrackedLink
                  href={getWhatsAppHref(item.inquiry)}
                  target={siteContent.contact.whatsapp.configured ? "_blank" : undefined}
                  rel={siteContent.contact.whatsapp.configured ? "noreferrer" : undefined}
                  eventName="booking_inquiry_click"
                  eventParams={{
                    package: item.title + " " + item.duration,
                    channel: "whatsapp",
                  }}
                  className="inline-flex min-h-11 items-center justify-center border border-[#d8a957]/45 px-5 text-[8px] font-bold uppercase tracking-[.18em] text-[#fff8ec] transition hover:bg-[#d8a957] hover:text-[#101613]"
                >
                  Enquire <span className="ml-2 text-sm">→</span>
                </TrackedLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
