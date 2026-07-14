import { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const BEFORE_CARDS = [
  {
    n: '01',
    title: 'MANUAL CONSOLIDATION.',
    body: 'Departmental reports stitched together by hand, week after week, before they ever reach a decision-maker.',
  },
  {
    n: '02',
    title: 'SCATTERED DATA.',
    body: '52 districts, dozens of departments — no single view. Insights buried in spreadsheets nobody opens.',
  },
  {
    n: '03',
    title: 'SLOW CYCLES.',
    body: 'Inter-departmental reporting crawling through emails and attachments. Policy waits on paperwork.',
  },
]

const AFTER_CARDS = [
  {
    n: '01',
    title: '~40% LESS EFFORT.',
    body: 'CM Pragati Dashboard automates departmental consolidation for the CM’s office — statewide.',
  },
  {
    n: '02',
    title: 'ALL 52 DISTRICTS, LIVE.',
    body: 'Statewide TNA dashboard with live assessment data and self-serve, division-wise reports.',
  },
  {
    n: '03',
    title: 'FASTER CYCLES.',
    body: 'WhatsApp-based dissemination workflows accelerate inter-departmental reporting across MP.',
  },
]

/** Warp-speed starfield canvas — streaks radiating from center. */
function WarpField({ canvasRef }) {
  useEffect(() => {
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
    let stars = []
    let w = 0
    let h = 0

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(220, Math.floor((w * h) / 6000))
      stars = Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * w,
        y: (Math.random() - 0.5) * h,
        z: 0.2 + Math.random() * 0.8,
      }))
    }

    const frame = () => {
      ctx.clearRect(0, 0, w, h)
      const cx = w / 2
      const cy = h / 2
      ctx.strokeStyle = accent
      ctx.lineCap = 'round'
      for (const s of stars) {
        const pz = s.z
        s.z -= 0.006
        if (s.z <= 0.05) {
          s.x = (Math.random() - 0.5) * w
          s.y = (Math.random() - 0.5) * h
          s.z = 1
          continue
        }
        const x1 = cx + s.x / pz
        const y1 = cy + s.y / pz
        const x2 = cx + s.x / s.z
        const y2 = cy + s.y / s.z
        if (x2 < 0 || x2 > w || y2 < 0 || y2 > h) {
          s.x = (Math.random() - 0.5) * w
          s.y = (Math.random() - 0.5) * h
          s.z = 1
          continue
        }
        ctx.globalAlpha = (1 - s.z) * 0.7
        ctx.lineWidth = (1 - s.z) * 2
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
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
  }, [canvasRef])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full opacity-0"
    />
  )
}

function Card({ card, after }) {
  return (
    <div className="glass w-[280px] !rounded-2xl p-6 sm:w-[320px]">
      <div className="mb-4 flex items-baseline justify-between">
        <h3
          className={`text-base font-bold tracking-wide ${after ? 'text-accent' : 'text-white/85'}`}
        >
          {card.title}
        </h3>
        <span className={`font-mono text-xs ${after ? 'text-accent/70' : 'text-white/30'}`}>
          [{card.n}]
        </span>
      </div>
      <p className="font-mono text-xs leading-relaxed text-white/50">{card.body}</p>
    </div>
  )
}

/**
 * Pinned "BEFORE // SAM → AFTER // SAM" impact section. Cards drift up past
 * a giant wordmark; at midpoint the wordmark flips to the accent color and a
 * warp starfield fades in. Static stacked layout on mobile / reduced motion.
 */
export default function BeforeAfter() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const reduced = usePrefersReducedMotion()

  useLayoutEffect(() => {
    if (reduced) return undefined

    const ctx = gsap.context((self) => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px)', () => {
        const q = self.selector
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=200%',
            pin: q('[data-pin]')[0],
            pinSpacing: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        })

        // cards drift upward across the pin; AFTER cards start deeper so they
        // only cross the viewport after the midpoint flip
        q('[data-drift]').forEach((el, i) => {
          const after = el.dataset.drift === 'after'
          tl.fromTo(
            el,
            { y: () => window.innerHeight * (1.1 + (i % 3) * 0.45 + (after ? 2.2 : 0)) },
            { y: () => -window.innerHeight * (after ? 1.2 : 2.6 + (i % 2) * 0.4), ease: 'none' },
            0,
          )
        })

        // midpoint flip: BEFORE fades out, AFTER + warp field fade in
        tl.to(q('[data-word-before]'), { opacity: 0, duration: 0.12 }, 0.44)
          .to(q('[data-word-after]'), { opacity: 1, duration: 0.12 }, 0.5)
          .to(canvasRef.current, { opacity: 0.5, duration: 0.15 }, 0.48)
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced])

  // Static fallback: mobile & reduced motion (CSS hides the pinned layout)
  return (
    <section ref={sectionRef} aria-label="Before and after impact" className="relative">
      {/* pinned cinematic version — desktop, motion OK */}
      {!reduced && (
        <div data-pin className="relative hidden h-screen overflow-hidden md:block">
          <WarpField canvasRef={canvasRef} />

          <div className="absolute inset-0 flex items-center justify-center">
            <h2
              data-word-before
              className="text-center text-[9vw] font-black leading-[0.95] tracking-tight text-white/15"
            >
              BEFORE
              <br />
              {'// SAM©'}
            </h2>
            <h2
              data-word-after
              className="absolute text-center text-[9vw] font-black leading-[0.95] tracking-tight text-accent opacity-0"
            >
              AFTER
              <br />
              {'// SAM©'}
            </h2>
          </div>

          {[...BEFORE_CARDS.map((c) => ({ c, after: false })), ...AFTER_CARDS.map((c) => ({ c, after: true }))].map(
            ({ c, after }, i) => (
              <div
                key={(after ? 'a' : 'b') + c.n}
                data-drift={after ? 'after' : 'before'}
                className="absolute"
                style={{
                  left: ['8%', '62%', '20%', '65%', '10%', '58%'][i],
                  top: ['12%', '30%', '55%', '8%', '35%', '58%'][i],
                }}
              >
                <Card card={c} after={after} />
              </div>
            ),
          )}
        </div>
      )}

      {/* static stacked version — mobile always, desktop when reduced motion */}
      <div className={`px-6 py-24 ${reduced ? '' : 'md:hidden'}`}>
        <div className="mx-auto max-w-6xl">
          <p className="kicker mb-10">Impact</p>
          <h2 className="text-4xl font-black tracking-tight text-white/20">BEFORE {'// SAM©'}</h2>
          <div className="mt-8 flex flex-wrap gap-5">
            {BEFORE_CARDS.map((c) => (
              <Card key={c.n} card={c} after={false} />
            ))}
          </div>
          <h2 className="mt-20 text-4xl font-black tracking-tight text-accent">AFTER {'// SAM©'}</h2>
          <div className="mt-8 flex flex-wrap gap-5">
            {AFTER_CARDS.map((c) => (
              <Card key={c.n} card={c} after={true} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
