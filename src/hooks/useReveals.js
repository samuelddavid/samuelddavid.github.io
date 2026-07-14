import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Scroll-reveal for every element carrying [data-reveal].
 * Optional data-reveal-delay="0.15" staggers siblings.
 * Uses fromTo so markup stays visible with JS disabled or reduced motion.
 */
export function useReveals(disabled) {
  useLayoutEffect(() => {
    if (disabled) return undefined

    const ctx = gsap.context(() => {
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        const delay = parseFloat(el.dataset.revealDelay || '0')
        gsap.fromTo(
          el,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          },
        )
      })
    })

    return () => ctx.revert()
  }, [disabled])
}
