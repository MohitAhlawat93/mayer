"use client";

import { useEffect, useState } from "react";
import { TrackedLink } from "@/components/growth/TrackedLink";
import { siteContent } from "@/content/site-content";

const links = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#profile", label: "Profile" },
  { href: "#performances", label: "Performances" },
  { href: "#gallery", label: "Gallery" },
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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/12 bg-[#101715]/34 backdrop-blur-xl">
      <nav
        className="mx-auto flex h-[78px] max-w-[1500px] items-center justify-between px-5 sm:px-7 lg:px-12"
        aria-label="Primary navigation"
      >
        <a
          href="#top"
          className="group leading-none"
          aria-label={siteContent.profile.name + " home"}
          onClick={() => setMenuOpen(false)}
        >
          <span className="block font-display text-[2rem] font-medium tracking-[0.045em] text-[#f3cf8d]">
            {siteContent.profile.name}
          </span>
          <span className="mt-1 block text-[6px] font-bold uppercase tracking-[.32em] text-white/58">
            Vienna · Austria
          </span>
        </a>

        <div className="hidden items-center gap-7 md:flex lg:gap-9">
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[8px] font-semibold uppercase tracking-[0.17em] text-white/72 transition hover:text-[#f3cf8d]"
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
            className="hidden min-h-10 items-center justify-center rounded-sm border border-[#e2c489]/55 bg-[#e2c489] px-5 py-2 text-[8px] font-bold uppercase tracking-[0.16em] text-[#151a18] transition hover:bg-[#efd49f] sm:inline-flex"
            onClick={() => setMenuOpen(false)}
          >
            Enquire
            <span className="ml-2 text-sm font-normal">→</span>
          </TrackedLink>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="flex h-10 w-10 items-center justify-center rounded-sm border border-white/18 bg-black/15 text-white backdrop-blur-xl md:hidden"
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
        <div className="border-t border-white/10 bg-[#111916]/96 px-5 py-4 backdrop-blur-2xl md:hidden">
          <div className="mx-auto grid max-w-[1500px] grid-cols-2 gap-2">
            {links.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-sm border border-white/10 bg-white/5 px-4 py-3 text-[8px] font-bold uppercase tracking-[.16em] text-white/78"
              >
                {item.label}
              </a>
            ))}
            <TrackedLink
              href="#contact"
              eventName="contact_cta_click"
              eventParams={{ placement: "mobile_navigation" }}
              onClick={() => setMenuOpen(false)}
              className="col-span-2 mt-1 rounded-sm bg-[#e2c489] px-4 py-3 text-center text-[8px] font-bold uppercase tracking-[.16em] text-[#151a18]"
            >
              Enquire
            </TrackedLink>
          </div>
        </div>
      ) : null}
    </header>
  );
}
