import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

/**
 * Lightweight canvas particle field for the hero — drifting accent motes
 * with proximity linking. Renders nothing under reduced motion, pauses
 * when off-screen or the tab is hidden. DPR capped at 2.
 */
export default function ParticleField() {
  const canvasRef = useRef(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return undefined

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let accent = '#22d3ee'
    const readAccent = () => {
      accent =
        getComputedStyle(document.documentElement)
          .getPropertyValue('--color-accent')
          .trim() || accent
    }
    readAccent()

    let raf = 0
    let running = false
    let particles = []
    let w = 0
    let h = 0

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(90, Math.floor((w * h) / 16000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: 0.6 + Math.random() * 1.4,
      }))
    }

    const LINK = 110

    const frame = () => {
      ctx.clearRect(0, 0, w, h)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10
      }

      ctx.lineWidth = 0.5
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < LINK * LINK) {
            const t = 1 - Math.sqrt(d2) / LINK
            ctx.strokeStyle = accent
            ctx.globalAlpha = t * 0.12
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      ctx.fillStyle = accent
      for (const p of particles) {
        ctx.globalAlpha = 0.5
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      raf = requestAnimationFrame(frame)
    }

    const start = () => {
      if (!running) {
        running = true
        raf = requestAnimationFrame(frame)
      }
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    setup()
    start()

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    )
    io.observe(canvas)

    const onVisibility = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVisibility)

    const onResize = () => setup()
    window.addEventListener('resize', onResize)
    window.addEventListener('themechange', readAccent)

    return () => {
      stop()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('themechange', readAccent)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full opacity-70"
    />
  )
}
