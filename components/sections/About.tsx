import Image from "next/image";
import { siteContent } from "@/content/site-content";

export function About() {
  return (
    <section id="about" className="section-soft relative overflow-hidden px-5 py-20 sm:px-8 sm:py-24 lg:px-14 lg:py-32 xl:px-16">
      <div className="mx-auto grid max-w-[1380px] gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-20">
        <div className="relative mx-auto w-full max-w-[560px]">
          <div className="absolute -bottom-5 -right-5 -z-10 h-full w-full border border-[#b8843c]/30 bg-[#d4b277]/16" />
          <div className="relative aspect-[4/5] overflow-hidden border border-white/50 shadow-[0_30px_75px_rgba(55,38,20,.13)]">
            <Image
              src={siteContent.images.about.src}
              alt={siteContent.images.about.alt}
              fill
              quality={95}
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(196,133,58,.04),rgba(20,28,24,.16))]" />
          </div>
        </div>

        <div className="max-w-2xl">
          <div className="flex items-center gap-4 text-[#a9712e]">
            <span className="h-px w-12 bg-current/55" />
            <p className="text-[8px] font-bold uppercase tracking-[.32em]">
              About {siteContent.profile.name}
            </p>
          </div>

          <h2 className="mt-6 font-display text-[clamp(3.5rem,5.4vw,5.9rem)] font-medium leading-[.88] tracking-[-.04em] text-deep">
            Vienna presence,
            <span className="block italic font-light text-[#a9712e]">quiet confidence.</span>
          </h2>

          <p className="mt-7 font-display text-2xl font-light italic leading-[1.25] text-[#4d463b] sm:text-3xl">
            “{siteContent.profile.tagline}”
          </p>

          <p className="mt-6 text-sm leading-8 text-muted sm:text-[15px]">
            {siteContent.profile.bio}
          </p>

          <div className="mt-9 grid grid-cols-3 gap-4 border-t border-line pt-6">
            <div>
              <p className="text-[7px] font-bold uppercase tracking-[.2em] text-muted">Based in</p>
              <p className="mt-1.5 font-display text-xl text-deep">Vienna</p>
            </div>
            <div>
              <p className="text-[7px] font-bold uppercase tracking-[.2em] text-muted">Country</p>
              <p className="mt-1.5 font-display text-xl text-deep">Austria</p>
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
