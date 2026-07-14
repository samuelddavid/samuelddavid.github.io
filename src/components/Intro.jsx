import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { site } from '../data/content'

/**
 * Cinematic page-load intro: name rises in, accent line sweeps,
 * curtain lifts. ~1.8s total, scroll locked while it plays.
 * Skipped instantly under reduced motion.
 */
export default function Intro({ onDone }) {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()

  useLayoutEffect(() => {
    if (reduced) {
      onDone()
      return undefined
    }

    document.documentElement.style.overflow = 'hidden'
    const unlock = () => {
      document.documentElement.style.overflow = ''
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power4.out' },
        onComplete: () => {
          unlock()
          onDone()
        },
      })

      tl.fromTo(
        '.intro-word',
        { yPercent: 120 },
        { yPercent: 0, duration: 0.8, stagger: 0.08 },
        0.2,
      )
        .fromTo(
          '.intro-line',
          { scaleX: 0 },
          { scaleX: 1, duration: 0.6, ease: 'power3.inOut' },
          '-=0.4',
        )
        .to(ref.current, {
          yPercent: -100,
          duration: 0.85,
          ease: 'power4.inOut',
          delay: 0.35,
        })
    }, ref)

    return () => {
      unlock()
      ctx.revert()
    }
  }, [reduced, onDone])

  if (reduced) return null

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
    >
      <div className="text-center">
        <h1 className="display flex gap-[0.35em] overflow-hidden text-[clamp(2rem,6vw,4.5rem)]">
          {site.name.split(' ').map((word) => (
            <span key={word} className="intro-word inline-block will-change-transform">
              {word}
            </span>
          ))}
        </h1>
        <div className="intro-line mx-auto mt-6 h-px w-48 origin-left bg-accent shadow-[0_0_16px_var(--color-accent)]" />
      </div>
    </div>
  )
}
