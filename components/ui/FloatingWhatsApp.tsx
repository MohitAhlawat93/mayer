import { TrackedLink } from "@/components/growth/TrackedLink";
import { getWhatsAppHref, siteContent } from "@/content/site-content";

export function FloatingWhatsApp() {
  return (
    <TrackedLink
      href={getWhatsAppHref()}
      target={siteContent.contact.whatsapp.configured ? "_blank" : undefined}
      rel={siteContent.contact.whatsapp.configured ? "noreferrer" : undefined}
      eventName="whatsapp_click"
      eventParams={{ placement: "floating", configured: siteContent.contact.whatsapp.configured }}
      aria-label="Contact Anora on WhatsApp"
      className="fixed bottom-3 left-3 z-50 inline-flex h-10 items-center justify-center gap-2 rounded-full border border-white/35 bg-[#477564]/92 px-3 text-[7px] font-bold uppercase tracking-[.16em] text-white shadow-[0_9px_25px_rgba(47,83,70,.17)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:bg-[#3d6959] sm:bottom-5 sm:left-5 sm:h-11 sm:px-3.5"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
        <path d="M7.6 18.2 4 20l1.1-4A8 8 0 1 1 7.6 18.2Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 8.4c.3 2.8 2 4.5 4.8 5 .5.1 1-.1 1.3-.5l.7-.9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
      <span className="hidden sm:inline">WhatsApp</span>
    </TrackedLink>
  );
}
