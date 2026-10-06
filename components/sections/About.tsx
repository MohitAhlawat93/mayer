import Image from "next/image";
import { siteContent } from "@/content/site-content";

export function About() {
  return (
    <section id="about" className="section-soft relative overflow-hidden px-5 py-20 sm:px-7 sm:py-24 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[.92fr_1.08fr] lg:items-center lg:gap-20">
        <div className="relative mx-auto w-full max-w-[590px]">
          <div className="absolute -inset-3 -z-10 translate-x-5 translate-y-5 rounded-[2rem] bg-[#d8cfc2]/72" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/55 shadow-[0_25px_65px_rgba(60,48,35,.11)]">
            <Image
              src={siteContent.images.about.src}
              alt={siteContent.images.about.alt}
              fill
              quality={95}
              sizes="(max-width: 1024px) 100vw, 44vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#27322e]/15 via-transparent to-white/5" />
          </div>
        </div>

        <div className="max-w-2xl">
          <p className="text-[8px] font-bold uppercase tracking-[.28em] text-accent">About Anora</p>
          <h2 className="mt-5 font-display text-[clamp(3rem,5vw,5.2rem)] font-light leading-[.96] tracking-[-.045em] text-deep">
            A closer <span className="italic text-[#9a7750]">portrait.</span>
          </h2>

          <p className="mt-7 font-display text-2xl font-light italic leading-[1.25] text-[#4a5650] sm:text-3xl">
            “Good energy, good manners, and mutual respect.”
          </p>

          <p className="mt-6 text-sm leading-8 text-muted sm:text-[15px]">
            {siteContent.profile.bio}
          </p>

          <div className="mt-9 flex flex-wrap gap-x-8 gap-y-4 border-t border-line pt-6">
            <div>
              <p className="text-[7px] font-bold uppercase tracking-[.2em] text-muted">Based in</p>
              <p className="mt-1.5 font-display text-xl text-deep">{siteContent.profile.city}</p>
            </div>
            <div>
              <p className="text-[7px] font-bold uppercase tracking-[.2em] text-muted">Contact</p>
              <p className="mt-1.5 font-display text-xl text-deep">WhatsApp · Telegram</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
