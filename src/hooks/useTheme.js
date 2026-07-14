import { useEffect, useState } from 'react'

const read = () => {
  try {
    return localStorage.getItem('theme') === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

/**
 * Dark is the default; 'light' persists in localStorage and is applied
 * before first paint by the inline script in index.html. Toggling also
 * updates the browser chrome color and notifies canvas listeners
 * (ParticleField) via a 'themechange' event.
 */
export function useTheme() {
  const [theme, setTheme] = useState(read)

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light')
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* private mode — theme just won't persist */
    }
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.content = theme === 'light' ? '#f4f5f7' : '#0a0a0b'
    window.dispatchEvent(new CustomEvent('themechange'))
  }, [theme])

  const toggle = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))
  return [theme, toggle]
}
