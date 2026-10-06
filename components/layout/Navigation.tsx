"use client";

import { useEffect, useState } from "react";
import { TrackedLink } from "@/components/growth/TrackedLink";
import { siteContent } from "@/content/site-content";

const links = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#rates", label: "Rates" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[linear-gradient(180deg,rgba(5,11,13,.62),rgba(5,11,13,.28))] backdrop-blur-[7px]">
      <nav
        className="mx-auto flex h-[92px] max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-14 xl:px-16"
        aria-label="Primary navigation"
      >
        <a
          href="#top"
          className="group leading-none"
          aria-label={siteContent.profile.name + " home"}
          onClick={() => setMenuOpen(false)}
        >
          <span className="block font-display text-[2.65rem] font-medium tracking-[0.01em] text-[#efc77d]">
            {siteContent.profile.name}
          </span>
          <span className="mt-1 block text-[6px] font-bold uppercase tracking-[.38em] text-white/64">
            Belly Dancer · Vienna
          </span>
        </a>

        <div className="hidden items-center gap-5 md:flex lg:gap-7">
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-3 text-[8px] font-semibold uppercase tracking-[0.15em] text-white/82 transition hover:text-[#efc77d]"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <TrackedLink
            href="#contact"
            eventName="contact_cta_click"
            eventParams={{ placement: "navigation" }}
            className="hidden min-h-12 items-center justify-center rounded-[3px] border border-[#efc77d]/65 bg-[#0b1110]/72 px-6 py-3 text-[8px] font-bold uppercase tracking-[0.16em] text-[#fff8ec] shadow-lg backdrop-blur-md transition hover:border-[#f4d38e] hover:bg-[#111b18] sm:inline-flex"
            onClick={() => setMenuOpen(false)}
          >
            Book Now
            <span className="ml-4 text-base font-normal text-[#efc77d]">→</span>
          </TrackedLink>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="flex h-10 w-10 items-center justify-center rounded-[3px] border border-white/18 bg-black/20 text-white backdrop-blur-xl md:hidden"
          >
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true" className="relative block h-3.5 w-4">
              <span className={"absolute left-0 top-0 h-px w-4 bg-current transition " + (menuOpen ? "translate-y-[6px] rotate-45" : "")} />
              <span className={"absolute left-0 top-[6px] h-px w-4 bg-current transition " + (menuOpen ? "opacity-0" : "")} />
              <span className={"absolute left-0 top-[12px] h-px w-4 bg-current transition " + (menuOpen ? "-translate-y-[6px] -rotate-45" : "")} />
            </span>
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <div className="border-t border-white/10 bg-[#0c1210]/97 px-5 py-4 backdrop-blur-2xl md:hidden">
          <div className="mx-auto grid max-w-[1500px] grid-cols-2 gap-2">
            {links.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-[3px] border border-white/10 bg-white/5 px-4 py-3 text-[8px] font-bold uppercase tracking-[.16em] text-white/82"
              >
                {item.label}
              </a>
            ))}
            <TrackedLink
              href="#contact"
              eventName="contact_cta_click"
              eventParams={{ placement: "mobile_navigation" }}
              onClick={() => setMenuOpen(false)}
              className="col-span-2 mt-1 rounded-[3px] bg-[#efc77d] px-4 py-3 text-center text-[8px] font-bold uppercase tracking-[.16em] text-[#151713]"
            >
              Book Now
            </TrackedLink>
          </div>
        </div>
      ) : null}
    </header>
  );
}
