import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import ParticleField from './ParticleField'
import Magnetic from './Magnetic'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { scrollToId } from '../hooks/useSmoothScroll'
import { site } from '../data/content'

export default function Hero({ introDone }) {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()

  // Hide hero copy before first paint, then stagger it in once the intro lifts.
  useLayoutEffect(() => {
    if (reduced) return undefined
    const ctx = gsap.context(() => {
      if (!introDone) {
        gsap.set('[data-hero]', { y: 48, opacity: 0 })
        return
      }
      gsap.to('[data-hero]', {
        y: 0,
        opacity: 1,
        duration: 1.1,
        stagger: 0.12,
        ease: 'power4.out',
        delay: 0.1,
      })
    }, ref)
    return () => ctx.revert()
  }, [introDone, reduced])

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6"
    >
      <ParticleField />

      {/* Accent light bleeding up from the horizon */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[-30%] h-[60%]"
        style={{
          background:
            'radial-gradient(ellipse 70% 100% at 50% 100%, color-mix(in srgb, var(--color-accent) 10%, transparent), transparent 70%)',
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <p data-hero className="kicker mb-6">
          {site.role}
        </p>

        <h1
          data-hero
          className="display text-[clamp(3.25rem,11vw,9.5rem)]"
        >
          {site.name.split(' ')[0]}
          <br />
          <span className="text-white/30">{site.name.split(' ').slice(1).join(' ')}</span>
        </h1>

        <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <p data-hero className="max-w-md text-lg leading-relaxed text-white/60">
            {site.tagline}{' '}
            <span className="text-white/85">
              RAG pipelines and AI systems deployed inside India's public sector.
            </span>
          </p>

          <div data-hero className="flex items-center gap-4">
            <Magnetic>
              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToId('work')
                }}
                className="glass glass-hover inline-flex items-center gap-2 whitespace-nowrap px-6 py-3 font-display text-sm font-medium text-white"
              >
                View work
                <span className="accent-glow-text" aria-hidden="true">↓</span>
              </a>
            </Magnetic>
            <p className="text-xs text-white/40">
              {site.location}
              <br />
              {site.availability}
            </p>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        data-hero
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="h-12 w-px overflow-hidden bg-white/10">
          <div className="h-4 w-px animate-[scrollcue_2s_ease-in-out_infinite] bg-accent" />
        </div>
      </div>

      <style>{`
        @keyframes scrollcue {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-hero] { opacity: 1 !important; transform: none !important; }
        }
      `}</style>
    </section>
  )
}
