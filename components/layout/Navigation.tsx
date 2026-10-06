"use client";

import { useEffect, useState } from "react";
import { TrackedLink } from "@/components/growth/TrackedLink";

const links = [
  { href: "#about", label: "About" },
  { href: "#profile", label: "Profile" },
  { href: "#rates", label: "Bookings" },
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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/30 bg-[#f5f0e8]/68 backdrop-blur-xl">
      <nav
        className="mx-auto flex h-[68px] max-w-[1500px] items-center justify-between px-5 sm:px-7 lg:px-12"
        aria-label="Primary navigation"
      >
        <a
          href="#top"
          className="font-display text-[1.7rem] font-medium tracking-[0.08em] text-deep"
          aria-label="Anora home"
          onClick={() => setMenuOpen(false)}
        >
          Anora
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-strong transition hover:text-deep"
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
            className="inline-flex min-h-9 items-center justify-center rounded-full border border-deep/15 bg-[#fffdf9]/72 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.16em] text-deep backdrop-blur-xl transition hover:bg-[#fffdf9]"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </TrackedLink>

          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-deep/15 bg-[#fffdf9]/72 text-deep backdrop-blur-xl md:hidden"
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
        <div className="border-t border-deep/8 bg-[#fffdf9]/94 px-5 py-3 backdrop-blur-2xl md:hidden">
          <div className="mx-auto grid max-w-[1500px] grid-cols-2 gap-2">
            {links.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl border border-deep/8 bg-[#f5f0e8]/70 px-4 py-3 text-[9px] font-bold uppercase tracking-[.16em] text-muted-strong"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
