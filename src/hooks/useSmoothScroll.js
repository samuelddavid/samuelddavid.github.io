import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

let lenisInstance = null

export function getLenis() {
  return lenisInstance
}

/** Smooth-scroll to a section id, respecting the fixed nav height. */
export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenisInstance) {
    lenisInstance.scrollTo(el, { offset: -72, duration: 1.4 })
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

/**
 * Lenis + GSAP ScrollTrigger wiring. Lenis drives scroll, GSAP's ticker
 * drives Lenis, ScrollTrigger listens to Lenis — one clock, no fighting.
 * Skipped entirely under prefers-reduced-motion.
 */
export function useSmoothScroll(disabled) {
  useEffect(() => {
    if (disabled) return undefined

    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 })
    lenisInstance = lenis
    if (import.meta.env.DEV) window.lenis = lenis

    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    // Recalculate pin distances once web fonts settle.
    document.fonts?.ready.then(() => ScrollTrigger.refresh())

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      lenisInstance = null
    }
  }, [disabled])
}
