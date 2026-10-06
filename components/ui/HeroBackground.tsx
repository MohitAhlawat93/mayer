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
    <div className="absolute inset-0 overflow-hidden bg-[#f5f0e8]" aria-hidden="true">
      <div className="absolute inset-0 md:left-[42%]">
        {slides.map((slide, index) => (
          <div
            key={slide.src}
            className="hero-slide absolute inset-0 overflow-hidden bg-[#d8d0c4]"
            data-active={index === active}
          >
            <Image
              src={slide.src}
              alt=""
              fill
              priority={index === 0}
              quality={72}
              sizes="(max-width: 767px) 100vw, 62vw"
              className="scale-110 object-cover object-center opacity-30 blur-2xl"
            />

            <Image
              src={slide.src}
              alt=""
              fill
              priority={index === 0}
              quality={95}
              sizes="(max-width: 767px) 100vw, 62vw"
              className="object-contain object-center"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#23302b]/10 via-transparent to-white/5" />
          </div>
        ))}

        <div className="absolute inset-y-0 left-0 hidden w-[22%] bg-gradient-to-r from-[#f5f0e8] via-[#f5f0e8]/72 to-transparent md:block" />
      </div>

      <div className="hero-vignette absolute inset-0" />

      <div className="absolute bottom-5 right-5 hidden gap-1.5 md:flex">
        {slides.map((slide, index) => (
          <span
            key={slide.src}
            className={
              "h-1 rounded-full shadow-sm transition-all duration-700 " +
              (index === active ? "w-7 bg-white/90" : "w-2 bg-white/50")
            }
          />
        ))}
      </div>
    </div>
  );
}
