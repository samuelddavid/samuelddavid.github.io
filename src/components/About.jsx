import { about, site } from '../data/content'

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-32 sm:py-40">
      <p data-reveal className="kicker mb-4">
        About
      </p>

      <div className="grid items-start gap-14 lg:grid-cols-[1fr_1.3fr]">
        {/* Portrait in a glass frame with accent under-glow */}
        <figure data-reveal className="relative mx-auto w-full max-w-sm lg:mx-0">
          <div
            aria-hidden="true"
            className="absolute -inset-4 rounded-[2rem] opacity-60 blur-2xl"
            style={{
              background:
                'radial-gradient(ellipse at 50% 80%, color-mix(in srgb, var(--color-accent) 25%, transparent), transparent 70%)',
            }}
          />
          <div className="glass relative aspect-[4/5] overflow-hidden !rounded-[1.75rem] p-2">
            {about.portrait ? (
              <img
                src={about.portrait}
                alt={about.portraitAlt}
                loading="lazy"
                className="h-full w-full rounded-[1.4rem] object-cover"
              />
            ) : (
              /* [PLACEHOLDER] — set about.portrait in src/data/content.js */
              <div
                className="flex h-full w-full items-center justify-center rounded-[1.4rem]"
                style={{
                  background:
                    'linear-gradient(135deg, color-mix(in srgb, var(--color-white) 5%, transparent), var(--color-ink-soft) 50%, color-mix(in srgb, var(--color-accent) 10%, transparent))',
                }}
              >
                <span className="px-6 text-center text-sm text-white/35">
                  Drop your portrait at
                  <br />
                  <code className="text-accent/80">/public/images/portrait.webp</code>
                </span>
              </div>
            )}
          </div>
        </figure>

        <div>
          <h2 data-reveal className="display mb-8 text-4xl sm:text-5xl">
            Systems that survive
            <br />
            <span className="accent-glow-text">the real world.</span>
          </h2>

          {about.paragraphs.map((p, i) => (
            <p
              key={i}
              data-reveal
              data-reveal-delay={0.1 * (i + 1)}
              className="mb-5 max-w-xl text-lg leading-relaxed text-white/60"
            >
              {p}
            </p>
          ))}

          <dl className="mt-10 grid gap-4 sm:grid-cols-3">
            {about.stats.map((stat, i) => (
              <div
                key={stat.label}
                data-reveal
                data-reveal-delay={0.08 * i}
                className="glass glass-hover p-5"
              >
                <dt className="order-2 mt-2 block text-xs leading-snug text-white/45">
                  {stat.label}
                </dt>
                <dd className="display m-0 text-3xl text-accent sm:text-4xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          <p data-reveal className="mt-8 text-sm text-white/40">
            Based in {site.location} · {site.availability}
          </p>
        </div>
      </div>
    </section>
  )
}
