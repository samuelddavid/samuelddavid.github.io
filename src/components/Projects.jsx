import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data/content'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { ArrowUpRightIcon, GitHubIcon } from './Icons'

gsap.registerPlugin(ScrollTrigger)

/**
 * Signature section: pins on desktop and converts vertical scroll into a
 * horizontal glide across the project cards. The emissive glow on each card
 * (--focus) tracks its distance from the viewport center. Falls back to a
 * vertical stack below lg and under prefers-reduced-motion.
 */
export default function Projects() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const progressRef = useRef(null)
  const reduced = usePrefersReducedMotion()

  useLayoutEffect(() => {
    if (reduced) return undefined

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px)', () => {
        const track = trackRef.current
        const distance = () => track.scrollWidth - window.innerWidth

        const updateFocus = () => {
          const cx = window.innerWidth / 2
          for (const card of track.children) {
            const r = card.getBoundingClientRect()
            const d = Math.abs(r.left + r.width / 2 - cx)
            const t = Math.max(0, 1 - d / (window.innerWidth * 0.55))
            card.style.setProperty('--focus', t.toFixed(3))
          }
        }

        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          // Fires every frame the scrubbed tween moves the track, so the
          // glow keeps tracking while the scrub eases after scroll stops.
          onUpdate: updateFocus,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progressRef.current) {
                progressRef.current.style.transform = `scaleX(${self.progress})`
              }
            },
          },
        })

        updateFocus()
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced])

  const horizontal = !reduced

  return (
    <section id="work" ref={sectionRef} className="relative overflow-hidden py-24 lg:py-0">
      <div className="flex flex-col justify-center lg:h-screen">
        <div className="mx-auto w-full max-w-6xl px-6 lg:pt-24">
          <p data-reveal className="kicker mb-4">
            Selected work
          </p>
          <div className="flex items-end justify-between gap-6">
            <h2 data-reveal className="display text-4xl sm:text-5xl">
              Built &amp; deployed.
            </h2>
            <p data-reveal className="hidden pb-1 text-sm text-white/40 lg:block">
              Keep scrolling — the gallery moves sideways →
            </p>
          </div>
          {/* Progress hairline (desktop) */}
          <div className="mt-6 hidden h-px w-full bg-white/10 lg:block" aria-hidden="true">
            <div
              ref={progressRef}
              className="h-px origin-left scale-x-0 bg-accent shadow-[0_0_12px_var(--color-accent)]"
            />
          </div>
        </div>

        <ul
          ref={trackRef}
          className={`mt-12 flex list-none flex-col gap-8 px-6 lg:mt-16 lg:w-max lg:flex-row lg:gap-10 lg:px-[8vw] ${
            horizontal ? 'lg:will-change-transform' : ''
          } mx-auto w-full max-w-6xl lg:mx-0 lg:max-w-none`}
        >
          {projects.map((project, i) => (
            <li
              key={project.title}
              data-reveal
              data-reveal-delay={0.05 * i}
              className="glass glass-hover group relative flex flex-col overflow-hidden !rounded-3xl lg:h-[62vh] lg:min-h-[480px] lg:w-[520px] lg:shrink-0"
              style={{ '--focus': 0 }}
            >
              <span className="focus-glow" aria-hidden="true" />

              {/* Project image — real screenshot when provided, styled placeholder otherwise */}
              <div className="relative m-2 aspect-[16/10] shrink-0 overflow-hidden rounded-2xl">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div
                    className="flex h-full w-full items-center justify-center"
                    style={{
                      background: `linear-gradient(${125 + i * 20}deg, color-mix(in srgb, var(--color-white) 5%, transparent), var(--color-ink-soft) 45%, color-mix(in srgb, var(--color-accent) ${8 + i * 3}%, transparent))`,
                    }}
                  >
                    <span className="text-xs text-white/30">
                      [PLACEHOLDER] screenshot — see src/data/content.js
                    </span>
                  </div>
                )}
                <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-ink/60 px-3 py-1 font-display text-xs text-white/70 backdrop-blur-md">
                  0{i + 1}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-6 pt-4">
                <h3 className="font-display text-2xl font-semibold tracking-tight text-white">
                  {project.title}
                </h3>
                <p className="mt-1.5 text-sm font-medium text-accent">{project.metric}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-white/55">
                  {project.description}
                </p>

                <div className="mt-auto pt-5">
                  <ul className="mb-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-white/50"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <div className="flex gap-3">
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-white transition-colors hover:text-accent"
                      >
                        Live <ArrowUpRightIcon width={16} height={16} />
                        <span className="sr-only">— {project.title}</span>
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-accent"
                      >
                        <GitHubIcon width={16} height={16} /> Code
                        <span className="sr-only">— {project.title}</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
