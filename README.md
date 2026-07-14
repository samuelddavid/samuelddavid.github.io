# Samuel David — Portfolio

Dark, cinematic single-page portfolio. React + Vite + Tailwind v4 + GSAP
ScrollTrigger + Lenis. Glassmorphism, one accent color, two signature
horizontal-scroll moments.

## Run

```bash
npm install
npm run dev      # local dev
npm run build    # production build → dist/
npm run preview  # serve the production build
```

## Fill in your real content — one file

**Everything lives in `src/data/content.js`.** Bio, experience, projects and
skills are populated from `Samuel_Resume.pdf`; the résumé itself is served at
`/Samuel_David_Resume.pdf`. Search `[PLACEHOLDER]` / `'#'` for what's left:

| What | Where |
| --- | --- |
| Portrait photo | `about.portrait` → drop file at `public/images/portrait.webp` |
| Project live/GitHub links (Transparify, JLU Orbit, etc.) | `projects[].live` / `projects[].github` |
| Project screenshots | `projects[].image` → images in `public/images/projects/` |
| Photo strip images | `photos[].src` → images in `public/images/photos/` |

Image guidance: portrait 4:5 (~800×1000), project shots 16:10 (~1200×750),
strip photos 3:4 (~600×800). Export as WebP ≤ 200 KB each — they're all
lazy-loaded. While `image`/`src`/`portrait` are `null`, styled gradient
placeholders render so the layout never breaks.

## Accent color & themes

One variable: `--color-accent` in `src/index.css` (`@theme`). Change that hex
and every glow, border, pill and gradient follows.

**Light theme** — the sun/moon button in the nav toggles it; the choice
persists in `localStorage` and is applied before first paint (no flash).
Theming works by re-mapping two tokens under `.light` in `src/index.css`:
`--color-ink` (surface) and `--color-white` (foreground), plus a darker
accent (`#0e7490`) that keeps AA contrast on the light surface. If you change
the dark accent, pick a matching darker one for `.light`.

## Architecture notes

- **Smooth scroll** — Lenis drives scrolling; GSAP's ticker drives Lenis;
  ScrollTrigger listens to Lenis (`src/hooks/useSmoothScroll.js`).
- **Projects gallery** — pinned `ScrollTrigger` converts vertical scroll to a
  horizontal glide ≥1024px; the emissive card glow (`--focus` CSS var) tracks
  distance from viewport center. Stacks vertically on mobile.
- **Photo strip** — scrubbed (unpinned) horizontal band with counter-parallax
  inside each frame; native snap-scroll on touch.
- **Reduced motion** — `prefers-reduced-motion` disables Lenis, GSAP reveals,
  pinning, particles, the intro, cursor glow and magnetic buttons. The page is
  fully readable as a static document.
- **Performance** — canvas particle field (no Three.js), DPR capped at 2,
  pauses off-screen/hidden tab; GSAP + Lenis split into separate chunks;
  images lazy-loaded.
