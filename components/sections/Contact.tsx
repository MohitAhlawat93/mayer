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
    <section id="contact" className="relative overflow-hidden bg-[#121a17] px-5 py-20 text-[#fff8ec] sm:px-7 sm:py-24 lg:px-12 lg:py-32">
      <div className="pointer-events-none absolute -right-16 -top-24 h-96 w-96 rounded-full border border-[#e2c489]/10" />
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 lg:grid-cols-[1fr_.82fr] lg:items-end">
          <div>
            <p className="text-[8px] font-bold uppercase tracking-[.3em] text-[#e2c489]">Contact</p>
            <h2 className="mt-5 font-display text-[clamp(4.4rem,8vw,8rem)] font-light leading-[.8] tracking-[-.055em]">
              Let’s
              <span className="block italic text-[#e5bd78]">connect.</span>
            </h2>
            <p className="mt-7 max-w-lg text-sm leading-7 text-white/62">
              For performance, photography, profile, or general enquiries, message {siteContent.profile.name} directly.
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
                className="group flex min-h-24 items-center justify-between border border-white/12 bg-white/[.045] px-5 py-4 backdrop-blur-xl transition hover:border-[#e2c489]/32 hover:bg-white/[.075]"
              >
                <div>
                  <p className="text-[7px] font-bold uppercase tracking-[.18em] text-white/42">{channel.detail}</p>
                  <p className="mt-1.5 font-display text-2xl font-light text-[#fff8ec]">{channel.label}</p>
                </div>
                <span className="text-xl text-[#e2c489] transition group-hover:translate-x-1">↗</span>
              </TrackedLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
