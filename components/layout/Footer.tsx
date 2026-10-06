import { getTelegramHref, getWhatsAppHref, siteContent } from "@/content/site-content";

export function Footer() {
  const year = new Date().getFullYear();
  const links = [
    { label: "WhatsApp", href: getWhatsAppHref(), configured: siteContent.contact.whatsapp.configured },
    { label: "Telegram", href: getTelegramHref(), configured: siteContent.contact.telegram.configured },
  ];

  return (
    <footer className="bg-[#fffdf9] px-5 pb-24 pt-10 sm:px-7 lg:px-12">
      <div className="mx-auto max-w-[1440px] border-t border-line pt-8">
        <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="font-display text-4xl font-light tracking-[.04em] text-deep">Anora</p>
            <p className="mt-2 text-[8px] font-bold uppercase tracking-[.2em] text-muted">
              {siteContent.profile.city}, India
            </p>
            <p className="mt-5 text-[9px] text-muted">© {year} {siteContent.profile.name}</p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {links.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target={channel.configured ? "_blank" : undefined}
                rel={channel.configured ? "noreferrer" : undefined}
                className="text-[8px] font-bold uppercase tracking-[.18em] text-muted-strong transition hover:text-deep"
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
