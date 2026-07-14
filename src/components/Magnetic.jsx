import { useRef, useCallback } from 'react'
import gsap from 'gsap'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

/**
 * Magnetic wrapper — child drifts a few px toward the cursor,
 * springs back on leave. No-op for touch and reduced motion.
 */
export default function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null)
  const reduced = usePrefersReducedMotion()

  const onMove = useCallback(
    (e) => {
      if (reduced) return
      const el = ref.current
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) * strength
      const y = (e.clientY - rect.top - rect.height / 2) * strength
      gsap.to(el, { x, y, duration: 0.4, ease: 'power3.out' })
    },
    [reduced, strength],
  )

  const onLeave = useCallback(() => {
    if (reduced) return
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.35)' })
  }, [reduced])

  return (
    <div
      ref={ref}
      className={`inline-block will-change-transform ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  )
}
