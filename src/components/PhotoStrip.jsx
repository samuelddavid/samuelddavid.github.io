import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { photos } from '../data/content'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

gsap.registerPlugin(ScrollTrigger)

/**
 * Film-strip band: the row of photos slides horizontally as the section
 * passes through the viewport (scrubbed, no pin), with a counter-parallax
 * on each image inside its frame. Native swipe-scroll on touch/mobile.
 */
export default function PhotoStrip() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const reduced = usePrefersReducedMotion()

  useLayoutEffect(() => {
    if (reduced) return undefined

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px)', () => {
        const track = trackRef.current
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth)

        gsap.fromTo(
          track,
          { x: 0 },
          {
            x: () => -distance(),
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
              invalidateOnRefresh: true,
            },
          },
        )

        // Counter-parallax inside each frame
        gsap.fromTo(
          track.querySelectorAll('[data-parallax]'),
          { xPercent: -6 },
          {
            xPercent: 6,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          },
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      ref={sectionRef}
      aria-label="Photo gallery"
      className="relative overflow-hidden py-24 sm:py-32"
    >
      <p data-reveal className="kicker mx-auto mb-10 max-w-6xl px-6">
        Off screen
      </p>

      <ul
        ref={trackRef}
        className="flex w-max list-none gap-5 overflow-x-auto px-6 pb-4 [scrollbar-width:none] max-md:w-auto max-md:snap-x max-md:snap-mandatory md:gap-6 md:overflow-visible md:pb-0"
      >
        {photos.map((photo, i) => (
          <li
            key={photo.caption}
            className="glass glass-hover group relative w-[240px] shrink-0 overflow-hidden !rounded-2xl p-1.5 max-md:snap-center sm:w-[280px]"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
              {photo.src ? (
                <img
                  data-parallax
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="h-full w-full scale-[1.15] object-cover"
                />
              ) : (
                /* [PLACEHOLDER] — set photos[].src in src/data/content.js */
                <div
                  data-parallax
                  role="img"
                  aria-label={photo.alt}
                  className="h-full w-full scale-[1.15]"
                  style={{
                    background: `linear-gradient(${160 + i * 25}deg, color-mix(in srgb, var(--color-white) 6%, transparent), var(--color-ink-soft) 50%, color-mix(in srgb, var(--color-accent) ${6 + (i % 4) * 4}%, transparent))`,
                  }}
                />
              )}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  boxShadow:
                    'inset 0 -40px 60px -20px color-mix(in srgb, var(--color-accent) 25%, transparent)',
                }}
              />
            </div>
            <p className="px-2.5 py-2 text-xs text-white/50">{photo.caption}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
