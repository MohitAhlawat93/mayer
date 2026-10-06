"use client";

import Image from "next/image";
import { MouseEvent, useEffect, useState } from "react";
import { siteContent } from "@/content/site-content";

const galleryImages = siteContent.images.gallery;

const layouts = [
  "sm:col-span-2 lg:col-span-7 aspect-[4/5] lg:aspect-[7/6]",
  "sm:col-span-1 lg:col-span-5 aspect-[4/5]",
  "sm:col-span-1 lg:col-span-5 aspect-[4/5]",
  "sm:col-span-2 lg:col-span-7 aspect-[4/5] lg:aspect-[7/6]",
  "sm:col-span-1 lg:col-span-6 aspect-[4/5]",
  "sm:col-span-1 lg:col-span-6 aspect-[4/5]",
];

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") {
        setActiveIndex((current) => current === null ? null : (current + 1) % galleryImages.length);
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => current === null ? null : (current - 1 + galleryImages.length) % galleryImages.length);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex]);

  const closeFromBackdrop = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) setActiveIndex(null);
  };

  const activeImage = activeIndex === null ? null : galleryImages[activeIndex];

  return (
    <>
      <section id="gallery" className="section-paper relative overflow-hidden px-5 py-20 sm:px-8 sm:py-24 lg:px-14 lg:py-32 xl:px-16">
        <div className="mx-auto max-w-[1380px]">
          <p className="text-[8px] font-bold uppercase tracking-[.3em] text-[#a9712e]">Gallery</p>

          <div className="mt-5 grid gap-7 lg:grid-cols-[1fr_.7fr] lg:items-end">
            <h2 className="max-w-3xl font-display text-[clamp(3.3rem,5.2vw,5.7rem)] font-medium leading-[.9] tracking-[-.04em] text-deep">
              A visual
              <span className="block italic font-light text-[#a9712e]">story.</span>
            </h2>
            <p className="max-w-md text-sm leading-7 text-muted">
              A clean editorial collection. Select any portrait to view it full screen.
            </p>
          </div>

          <div className="mt-11 grid gap-3 sm:grid-cols-2 lg:grid-cols-12">
            {galleryImages.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={"group relative overflow-hidden border border-black/5 bg-[#d9ccb8] shadow-[0_18px_45px_rgba(55,38,20,.08)] " + layouts[index % layouts.length]}
                aria-label={"Open gallery image " + (index + 1)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  quality={95}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 58vw"
                  className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.025]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111713]/42 via-transparent to-transparent" />
                <div className="absolute inset-x-5 bottom-5 flex items-end justify-between text-white">
                  <span className="font-display text-2xl font-light">0{index + 1}</span>
                  <span className="border border-white/35 bg-black/15 px-3 py-1.5 text-[7px] font-bold uppercase tracking-[.18em] backdrop-blur-md">
                    View
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {activeImage ? (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[#0b100e]/94 p-3 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery lightbox"
          onClick={closeFromBackdrop}
        >
          <button type="button" onClick={() => setActiveIndex(null)} className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white" aria-label="Close gallery">×</button>
          <button type="button" onClick={() => setActiveIndex((current) => current === null ? null : (current - 1 + galleryImages.length) % galleryImages.length)} className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white sm:left-6" aria-label="Previous image">←</button>

          <div className="relative h-[86vh] w-[88vw] max-w-6xl">
            <Image src={activeImage.src} alt={activeImage.alt} fill priority quality={95} sizes="90vw" className="object-contain" />
          </div>

          <button type="button" onClick={() => setActiveIndex((current) => current === null ? null : (current + 1) % galleryImages.length)} className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white sm:right-6" aria-label="Next image">→</button>
        </div>
      ) : null}
    </>
  );
}
