import { site } from '../data/content'

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-xs text-white/35 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <p>
          Designed &amp; built with intent — React · GSAP · Lenis
        </p>
      </div>
    </footer>
  )
}
