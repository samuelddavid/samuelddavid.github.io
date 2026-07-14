import { experience } from '../data/content'

export default function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-6xl px-6 py-32 sm:py-40">
      <p data-reveal className="kicker mb-4">
        Experience
      </p>
      <h2 data-reveal className="display mb-16 text-4xl sm:text-5xl">
        Where I've shipped.
      </h2>

      <ol className="relative ml-3 border-l border-white/10 sm:ml-6">
        {experience.map((job, i) => (
          <li key={job.org} className="relative pb-14 pl-8 last:pb-0 sm:pl-12">
            {/* Glowing timeline node */}
            <span
              aria-hidden="true"
              className="absolute -left-[5px] top-2 h-[9px] w-[9px] rounded-full bg-accent shadow-[0_0_14px_2px_color-mix(in_srgb,var(--color-accent)_60%,transparent)]"
            />

            <article
              data-reveal
              data-reveal-delay={0.05 * i}
              className="glass glass-hover p-7 sm:p-8"
            >
              <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-2xl font-semibold tracking-tight text-white">
                  {job.org}
                </h3>
                <span className="text-xs uppercase tracking-widest text-accent/80">
                  {job.period}
                </span>
              </div>

              <p className="mb-1 text-sm font-medium text-white/80">{job.role}</p>
              <p className="mb-5 text-sm leading-relaxed text-white/50">{job.summary}</p>

              <ul className="space-y-2.5">
                {job.points.map((point) => (
                  <li key={point} className="flex gap-3 text-[15px] leading-relaxed text-white/65">
                    <span aria-hidden="true" className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent/70" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ol>
    </section>
  )
}
