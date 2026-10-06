"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { siteContent } from "@/content/site-content";

const slides = siteContent.images.heroSlides;

export function HeroBackground() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 5600);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#8b5d2f]" aria-hidden="true">
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className="hero-slide absolute inset-0 overflow-hidden"
          data-active={index === active}
        >
          <Image
            src={slide.src}
            alt=""
            fill
            priority={index === 0}
            quality={96}
            sizes="100vw"
            className="hero-photo"
          />
        </div>
      ))}

      <div className="hero-grade absolute inset-0" />

      <div className="absolute bottom-[8.4rem] right-8 hidden items-center gap-2 text-[7px] font-semibold tracking-[.22em] text-white/60 md:flex">
        {slides.map((slide, index) => (
          <span
            key={slide.src}
            className={index === active ? "text-[#f2c66f]" : ""}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        ))}
      </div>
    </div>
  );
}
