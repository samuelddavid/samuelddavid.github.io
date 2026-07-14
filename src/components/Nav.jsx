import { useEffect, useState } from 'react'
import { navLinks, site } from '../data/content'
import { scrollToId } from '../hooks/useSmoothScroll'
import { useTheme } from '../hooks/useTheme'
import { SunIcon, MoonIcon } from './Icons'

/** Fixed glass nav — transparent at the top, frosts once the page scrolls. */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [theme, toggleTheme] = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (e, id) => {
    e.preventDefault()
    setOpen(false)
    scrollToId(id)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav
        aria-label="Primary"
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${
          scrolled || open
            ? 'glass'
            : 'border border-transparent bg-transparent'
        }`}
      >
        <a
          href="#top"
          onClick={(e) => go(e, 'top')}
          className="font-display text-lg font-semibold tracking-tight text-white"
        >
          SD<span className="accent-glow-text">.</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={(e) => go(e, link.id)}
                className="text-sm text-white/60 transition-colors duration-300 hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={`mailto:${site.email}`}
              className="rounded-full border border-accent/40 px-4 py-1.5 text-sm text-accent transition-shadow duration-300 hover:shadow-[0_0_24px_-4px_var(--color-accent)]"
            >
              Get in touch
            </a>
          </li>
          <li>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
              className="flex h-9 w-9 items-center justify-center rounded-full text-white/60 transition-colors duration-300 hover:text-accent"
            >
              {theme === 'light' ? <MoonIcon width={17} height={17} /> : <SunIcon width={17} height={17} />}
            </button>
          </li>
        </ul>

        {/* Mobile: theme toggle + menu button */}
        <div className="flex items-center gap-1 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
            className="flex h-9 w-9 items-center justify-center rounded-full text-white/60 hover:text-accent"
          >
            {theme === 'light' ? <MoonIcon width={17} height={17} /> : <SunIcon width={17} height={17} />}
          </button>
          <button
            type="button"
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`h-px w-5 bg-white transition-transform duration-300 ${open ? 'translate-y-[3.5px] rotate-45' : ''}`}
            />
            <span
              className={`h-px w-5 bg-white transition-transform duration-300 ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <div
        id="mobile-menu"
        className={`mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl transition-all duration-400 md:hidden ${
          open ? 'glass max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="flex flex-col gap-1 p-4">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={(e) => go(e, link.id)}
                className="block rounded-lg px-3 py-2.5 text-white/75 hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
