import { TrackedLink } from "@/components/growth/TrackedLink";
import { getTelegramHref, getWhatsAppHref, siteContent } from "@/content/site-content";

export function Contact() {
  const channels = [
    {
      label: "WhatsApp",
      href: getWhatsAppHref("Hi Anora, I would like to inquire about a booking."),
      configured: siteContent.contact.whatsapp.configured,
      detail: "Fastest way to enquire",
      eventName: "whatsapp_click" as const,
    },
    {
      label: "Telegram",
      href: getTelegramHref(),
      configured: siteContent.contact.telegram.configured,
      detail: "Direct private message",
      eventName: "telegram_click" as const,
    },
  ];

  return (
    <section id="contact" className="section-soft relative overflow-hidden px-5 py-20 sm:px-7 sm:py-24 lg:px-12 lg:py-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 lg:grid-cols-[1fr_.82fr] lg:items-end">
          <div>
            <p className="text-[8px] font-bold uppercase tracking-[.28em] text-accent">Contact</p>
            <h2 className="mt-5 font-display text-[clamp(4rem,8vw,7.5rem)] font-light leading-[.84] tracking-[-.055em] text-deep">
              Say <span className="italic text-[#9a7750]">hello.</span>
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-7 text-muted">
              For questions, current availability, or verification, message directly.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {channels.map((channel) => (
              <TrackedLink
                key={channel.label}
                href={channel.href}
                target={channel.configured ? "_blank" : undefined}
                rel={channel.configured ? "noreferrer" : undefined}
                eventName={channel.eventName}
                eventParams={{ placement: "contact_section", configured: channel.configured }}
                className="glass-surface group flex min-h-24 items-center justify-between rounded-[1.25rem] px-5 py-4 transition hover:-translate-y-0.5"
              >
                <div>
                  <p className="text-[7px] font-bold uppercase tracking-[.18em] text-muted">{channel.detail}</p>
                  <p className="mt-1.5 font-display text-2xl font-light text-deep">{channel.label}</p>
                </div>
                <span className="text-xl text-accent transition group-hover:translate-x-1">↗</span>
              </TrackedLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
