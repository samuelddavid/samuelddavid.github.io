import { useState, useCallback } from 'react'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { useReveals } from './hooks/useReveals'

import Intro from './components/Intro'
import Nav from './components/Nav'
import CursorGlow from './components/CursorGlow'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import PhotoStrip from './components/PhotoStrip'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const reduced = usePrefersReducedMotion()
  const [introDone, setIntroDone] = useState(false)
  const onIntroDone = useCallback(() => setIntroDone(true), [])

  useSmoothScroll(reduced)
  useReveals(reduced)

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[110] rounded-lg bg-accent px-4 py-2 font-medium text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      {!introDone && <Intro onDone={onIntroDone} />}
      <CursorGlow />
      <Nav />

      <main id="main">
        <Hero introDone={introDone} />
        <About />
        <Experience />
        <Projects />
        <PhotoStrip />
        <Skills />
        <Contact />
      </main>

      <Footer />
      <div className="grain" aria-hidden="true" />
    </>
  )
}
