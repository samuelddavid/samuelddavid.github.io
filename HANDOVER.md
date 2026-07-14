# HANDOVER — Samuel David Portfolio

**Live:** https://samuelddavid.github.io
**Repo:** https://github.com/samuelddavid/samuelddavid.github.io (`main` = source, `gh-pages` = built site)
**Local:** `/Users/david/Desktop/SAM/Claude/portfolio`
**Stack:** React 19 · Vite 6 · Tailwind v4 · GSAP ScrollTrigger · Lenis

## Goal

Take the site from "structurally complete" to "content complete and polished":
fill every remaining `[PLACEHOLDER]` (images + project links), then run a
performance/SEO polish pass, then redeploy. The owner (Samuel) will supply
photos in chat — your job is to optimize, wire, verify, deploy.

## Architectural decisions (don't undo these casually)

1. **Single content source.** ALL copy, links, images live in
   `src/data/content.js`. Components are dumb renderers. Never hardcode
   content in components. Populated from `Samuel_Resume.pdf` — treat the
   resume as ground truth for factual claims.
2. **Two-token theming.** `--color-ink` = surface, `--color-white` =
   foreground, defined in `@theme` (`src/index.css`). Tailwind v4 compiles
   color utilities to `var()` refs, so the `.light` class re-maps just these
   tokens (+ a darker accent `#0e7490` for AA contrast) to re-theme the whole
   site. `text-white/60` etc. is therefore *semantic*, not literal. Never
   use raw `rgba(255,255,255,…)` in styles — use
   `color-mix(in srgb, var(--color-white) N%, transparent)`.
3. **One accent color.** `--color-accent` (`#22d3ee` dark / `#0e7490` light).
   Every glow/border/gradient derives from it via `color-mix`. Changing the
   brand = changing two hex values.
4. **Theme toggle** (`src/hooks/useTheme.js`): dark default, persisted in
   `localStorage`, applied pre-paint by an inline script in `index.html`
   (no flash). Dispatches `themechange` — the particle canvas listens to
   re-read the accent.
5. **Motion pipeline:** Lenis drives scroll → GSAP ticker drives Lenis →
   ScrollTrigger listens to Lenis (`src/hooks/useSmoothScroll.js`). One
   clock. In dev, the Lenis instance is on `window.lenis` for debugging.
6. **Projects gallery** (`src/components/Projects.jsx`): pinned ScrollTrigger
   converts vertical scroll to horizontal ≥1024px. The emissive card glow is
   a `--focus` CSS var (0–1) set per-card from the **tween's** `onUpdate`
   (NOT the ScrollTrigger's — the scrubbed track keeps easing after scroll
   events stop; this was a real bug once). <1024px it's a vertical stack.
7. **Reduced motion is a hard gate.** `usePrefersReducedMotion()` disables
   Lenis, all GSAP work, pinning, particles, intro, cursor glow, magnetic
   buttons. Reveals use `fromTo` so content is visible without JS. Keep any
   new animation behind this hook.
8. **No Three.js on purpose.** Hero particles are a hand-rolled canvas
   (`ParticleField.jsx`): DPR capped at 2, pauses off-screen and on hidden
   tabs. Don't add heavy deps for visuals.
9. **Placeholders degrade gracefully.** Any `image`/`src`/`portrait` set to
   `null` renders a styled gradient placeholder — the layout never breaks.
10. **Vite pinned to v6** — machine runs Node 20.17; Vite 7/8 need ≥20.19.
    Don't bump Vite without bumping Node.

## Deploy

```bash
npm run build && cd dist && git init -b gh-pages && git add -A \
  && git commit -m Deploy && \
  git push -f https://github.com/samuelddavid/samuelddavid.github.io.git gh-pages \
  && cd .. && rm -rf dist/.git
```

- Pages source is the `gh-pages` branch, root. `main` is never served.
- `gh` CLI is authed (account `samuelddavid`); `gh auth setup-git` already run.
- Gotchas seen on this machine: `git add -A` at repo root once hung (bisect
  with per-path adds if it recurs); a stale `.git/index.lock` may need
  removing after a killed git process.
- If the site serves stale content after a deploy, trigger a build:
  `gh api -X POST repos/samuelddavid/samuelddavid.github.io/pages/builds`.

## Dev / verification notes

- Dev server: `preview_start` with name `portfolio` (`.claude/launch.json`
  at the workspace root uses `npm --prefix portfolio run dev`, port 5173).
- The headless preview tab freezes `requestAnimationFrame` when hidden —
  GSAP tweens appear "stuck mid-animation" in screenshots. It's an artifact,
  not a bug. Force-set styles or drive scroll via `window.lenis.scrollTo`
  when verifying.
- Verify the horizontal gallery at ≥1024px viewport (`preview` resize) —
  below that it stacks and the pin never registers.

## Pending work

### Milestone 1 — Content complete (blocked on Samuel's assets)
- [ ] Photo strip: 8 slots in `photos[]` await images (Samuel said he'll
      share them in chat, one per "moment" — captions already defined).
      Optimize each: ~800px long edge, WebP q72–80, into
      `public/images/photos/`, write real alt text.
- [ ] Project screenshots: 6 `projects[].image` slots (16:10, ~1200×750
      WebP) into `public/images/projects/`.
- [ ] Real links: `projects[].live` / `.github` still `'#'` for Transparify
      and JLU Orbit; IndiaAI summit link.
- [ ] Confirm with Samuel: Training Needs Assessment project + Pahlé India
      Foundation role were in his original brief but are NOT on the resume —
      currently TNA is kept, PIF dropped. Verify or adjust.
- [ ] Optional: higher-res portrait to replace the 720px LinkedIn pull
      (`public/images/portrait.webp`).

### Milestone 2 — Polish & ship
- [ ] `deploy.sh` wrapping the deploy one-liner (owner said "say the word" —
      just make it).
- [ ] SEO: og:image (1200×630 card), favicon replace (currently Vite's),
      sitemap-lite/robots, meta description review.
- [ ] Lighthouse pass on the live URL — target 90+ all categories; fix
      whatever it flags (fonts are render-blocking Google Fonts links;
      consider `font-display: swap` is already set, maybe self-host).
- [ ] Accessibility sweep: keyboard-tab the pinned gallery, focus order,
      contrast in BOTH themes.
- [ ] Cross-check mobile (375px) after images land — photo strip becomes
      native snap-scroll there.

### Milestone 3 — Nice-to-have (ask before building)
- [ ] Custom domain (CNAME) if Samuel buys one.
- [ ] Simple analytics (e.g. GoatCounter/Plausible — nothing heavy).
- [ ] Case-study pages for CM Pragati / Transparify (only if asked; the
      one-pager is the product).

## Working agreement

Match the existing restraint: one accent, glass + glow, no new deps unless
unavoidable, everything behind the reduced-motion gate, content only in
`content.js`. After any change: verify in preview, `npm run build`, deploy,
then curl the live URL to confirm.
