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
    <div className="absolute inset-0 overflow-hidden bg-[#111916]" aria-hidden="true">
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className="hero-slide absolute inset-0 overflow-hidden bg-[#111916]"
          data-active={index === active}
        >
          <Image
            src={slide.src}
            alt=""
            fill
            priority={index === 0}
            quality={95}
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(205,147,67,.08),rgba(17,25,22,.08)_50%,rgba(17,25,22,.28))]" />
        </div>
      ))}

      <div className="hero-vignette absolute inset-0" />

      <div className="absolute bottom-[8.2rem] right-6 hidden gap-1.5 md:flex">
        {slides.map((slide, index) => (
          <span
            key={slide.src}
            className={
              "h-1 rounded-full shadow-sm transition-all duration-700 " +
              (index === active ? "w-8 bg-[#e2c489]" : "w-2 bg-white/45")
            }
          />
        ))}
      </div>
    </div>
  );
}
