import Image from "next/image";
import { siteContent } from "@/content/site-content";

export function About() {
  return (
    <section id="about" className="section-soft relative overflow-hidden px-5 py-20 sm:px-7 sm:py-24 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[.96fr_1.04fr] lg:items-center lg:gap-20">
        <div className="relative mx-auto w-full max-w-[610px]">
          <div className="absolute -inset-3 -z-10 translate-x-5 translate-y-5 border border-accent/25 bg-[#d8c7aa]/48" />
          <div className="relative aspect-[4/5] overflow-hidden border border-white/45 shadow-[0_28px_70px_rgba(56,39,20,.13)]">
            <Image
              src={siteContent.images.about.src}
              alt={siteContent.images.about.alt}
              fill
              quality={95}
              sizes="(max-width: 1024px) 100vw, 44vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a221f]/22 via-transparent to-[#d7a558]/6" />
          </div>
        </div>

        <div className="max-w-2xl">
          <div className="flex items-center gap-4 text-accent">
            <span className="h-px w-10 bg-current/60" />
            <p className="text-[8px] font-bold uppercase tracking-[.3em]">
              About {siteContent.profile.name}
            </p>
          </div>

          <h2 className="mt-6 font-display text-[clamp(3.5rem,5.5vw,5.8rem)] font-light leading-[.9] tracking-[-.045em] text-deep">
            Vienna presence,
            <span className="block italic text-[#a87538]">destination spirit.</span>
          </h2>

          <p className="mt-7 font-display text-2xl font-light italic leading-[1.25] text-[#4d493f] sm:text-3xl">
            “{siteContent.profile.tagline}”
          </p>

          <p className="mt-6 text-sm leading-8 text-muted sm:text-[15px]">
            {siteContent.profile.bio}
          </p>

          <div className="mt-9 grid grid-cols-2 gap-5 border-t border-line pt-6 sm:grid-cols-3">
            <div>
              <p className="text-[7px] font-bold uppercase tracking-[.2em] text-muted">Based in</p>
              <p className="mt-1.5 font-display text-xl text-deep">{siteContent.profile.city}</p>
            </div>
            <div>
              <p className="text-[7px] font-bold uppercase tracking-[.2em] text-muted">Country</p>
              <p className="mt-1.5 font-display text-xl text-deep">{siteContent.profile.country}</p>
            </div>
            <div>
              <p className="text-[7px] font-bold uppercase tracking-[.2em] text-muted">Language</p>
              <p className="mt-1.5 font-display text-xl text-deep">English</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
