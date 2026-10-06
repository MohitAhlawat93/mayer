import { TrackedLink } from "@/components/growth/TrackedLink";
import { getTelegramHref, getWhatsAppHref, siteContent } from "@/content/site-content";

export function Contact() {
  const channels = [
    {
      label: "WhatsApp",
      href: getWhatsAppHref("Hi " + siteContent.profile.name + ", I would like to make an enquiry."),
      configured: siteContent.contact.whatsapp.configured,
      detail: "Direct enquiry",
      eventName: "whatsapp_click" as const,
    },
    {
      label: "Telegram",
      href: getTelegramHref(),
      configured: siteContent.contact.telegram.configured,
      detail: "Private message",
      eventName: "telegram_click" as const,
    },
  ];

  return (
    <section id="contact" className="relative overflow-hidden bg-[#0d1412] px-5 py-20 text-[#fff8ec] sm:px-8 sm:py-24 lg:px-14 lg:py-32 xl:px-16">
      <div className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full border border-[#d9ab5d]/10" />
      <div className="mx-auto max-w-[1380px]">
        <div className="grid gap-12 lg:grid-cols-[1fr_.8fr] lg:items-end">
          <div>
            <p className="text-[8px] font-bold uppercase tracking-[.3em] text-[#d9ab5d]">Contact</p>
            <h2 className="mt-5 font-display text-[clamp(4.4rem,8vw,8rem)] font-medium leading-[.79] tracking-[-.05em]">
              Say
              <span className="block italic font-light text-[#e3ba72]">hello.</span>
            </h2>
            <p className="mt-7 max-w-lg text-sm leading-7 text-white/58">
              For performance, photography, or general enquiries, contact {siteContent.profile.name} directly.
            </p>
          </div>

          <div className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-1">
            {channels.map((channel) => (
              <TrackedLink
                key={channel.label}
                href={channel.href}
                target={channel.configured ? "_blank" : undefined}
                rel={channel.configured ? "noreferrer" : undefined}
                eventName={channel.eventName}
                eventParams={{ placement: "contact_section", configured: channel.configured }}
                className="group flex min-h-24 items-center justify-between bg-[#111a17] px-6 py-4 transition hover:bg-[#17211d]"
              >
                <div>
                  <p className="text-[7px] font-bold uppercase tracking-[.18em] text-white/38">{channel.detail}</p>
                  <p className="mt-1.5 font-display text-2xl font-medium text-[#fff8ec]">{channel.label}</p>
                </div>
                <span className="text-xl text-[#d9ab5d] transition group-hover:translate-x-1">↗</span>
              </TrackedLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
