import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

/** Soft accent light that trails the pointer. Desktop pointer devices only. */
export default function CursorGlow() {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced || !window.matchMedia('(hover: hover)').matches) return undefined

    const el = ref.current
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' })

    const onMove = (e) => {
      xTo(e.clientX)
      yTo(e.clientY)
      el.style.opacity = '1'
    }
    const onLeave = () => {
      el.style.opacity = '0'
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="cursor-glow pointer-events-none fixed left-0 top-0 z-[5] h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-500"
    />
  )
}
