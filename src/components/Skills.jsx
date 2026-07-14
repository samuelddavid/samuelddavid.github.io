import { skills } from '../data/content'

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-32 sm:py-40">
      <p data-reveal className="kicker mb-4">
        Skills
      </p>
      <h2 data-reveal className="display mb-16 text-4xl sm:text-5xl">
        The toolkit.
      </h2>

      <div className="grid gap-10 sm:grid-cols-2">
        {skills.map((group, gi) => (
          <div key={group.group} data-reveal data-reveal-delay={0.06 * gi}>
            <h3 className="mb-4 font-display text-sm font-medium uppercase tracking-[0.2em] text-white/45">
              {group.group}
            </h3>
            <ul className="flex list-none flex-wrap gap-2.5">
              {group.items.map((item) => (
                <li key={item}>
                  <span className="pill" tabIndex={0}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
