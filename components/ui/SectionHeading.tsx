type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="grid gap-6 border-t border-white/10 pt-6 md:grid-cols-[0.25fr_1fr] md:gap-12">
      <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-zinc-500">
        {eyebrow}
      </p>
      <div>
        <h2 className="max-w-5xl font-display text-5xl font-light leading-[0.94] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-6 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
