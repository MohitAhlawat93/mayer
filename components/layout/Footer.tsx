import { getTelegramHref, getWhatsAppHref, siteContent } from "@/content/site-content";

export function Footer() {
  const year = new Date().getFullYear();
  const links = [
    { label: "WhatsApp", href: getWhatsAppHref(), configured: siteContent.contact.whatsapp.configured },
    { label: "Telegram", href: getTelegramHref(), configured: siteContent.contact.telegram.configured },
  ];

  return (
    <footer className="bg-[#0d1412] px-5 pb-24 pt-10 text-white sm:px-7 lg:px-12">
      <div className="mx-auto max-w-[1440px] border-t border-white/10 pt-8">
        <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="font-display text-4xl font-light tracking-[.04em] text-[#efcf96]">
              {siteContent.profile.name}
            </p>
            <p className="mt-2 text-[8px] font-bold uppercase tracking-[.22em] text-white/42">
              {siteContent.profile.city}, {siteContent.profile.country}
            </p>
            <p className="mt-5 text-[9px] text-white/34">© {year} {siteContent.profile.name}</p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {links.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target={channel.configured ? "_blank" : undefined}
                rel={channel.configured ? "noreferrer" : undefined}
                className="text-[8px] font-bold uppercase tracking-[.18em] text-white/48 transition hover:text-[#efcf96]"
              >
                {channel.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
