import Magnetic from './Magnetic'
import { site } from '../data/content'
import { GitHubIcon, LinkedInIcon, XIcon, FileDownIcon } from './Icons'

const socialLinks = [
  { label: 'GitHub', href: site.socials.github, Icon: GitHubIcon },
  { label: 'LinkedIn', href: site.socials.linkedin, Icon: LinkedInIcon },
  { label: 'X', href: site.socials.x, Icon: XIcon },
  { label: 'Résumé', href: site.resumeUrl, Icon: FileDownIcon },
].filter((link) => link.href)

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden px-6 py-32 sm:py-44">
      {/* Bottom horizon glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[-40%] h-[70%]"
        style={{
          background:
            'radial-gradient(ellipse 60% 100% at 50% 100%, color-mix(in srgb, var(--color-accent) 12%, transparent), transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <p data-reveal className="kicker mb-6">
          Contact
        </p>
        <h2 data-reveal className="display text-[clamp(2.5rem,7vw,5.5rem)]">
          Let's build something
          <br />
          <span className="accent-glow-text">that matters.</span>
        </h2>

        <p data-reveal className="mx-auto mt-8 max-w-md text-lg text-white/55">
          Open to business analyst, product &amp; operations and data roles,
          public-sector tech, and ambitious products. The inbox is always warm.
        </p>

        <div data-reveal className="mt-12">
          <Magnetic strength={0.25}>
            <a
              href={`mailto:${site.email}`}
              className="glass glass-hover inline-flex items-center gap-3 !rounded-full px-8 py-4 font-display text-base font-semibold text-white sm:text-lg"
            >
              {site.email}
              <span className="accent-glow-text" aria-hidden="true">→</span>
            </a>
          </Magnetic>
        </div>

        {site.phone && (
          <p data-reveal className="mt-6 text-sm text-white/40">
            or call{' '}
            <a
              href={`tel:${site.phone.replace(/\s/g, '')}`}
              className="text-white/70 transition-colors hover:text-accent"
            >
              {site.phone}
            </a>
          </p>
        )}

        <ul data-reveal className="mt-12 flex list-none justify-center gap-4">
          {socialLinks.map(({ label, href, Icon }) => (
            <li key={label}>
              <Magnetic strength={0.4}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="glass glass-hover flex h-12 w-12 items-center justify-center !rounded-xl text-white/70 hover:text-accent"
                >
                  <Icon />
                </a>
              </Magnetic>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
