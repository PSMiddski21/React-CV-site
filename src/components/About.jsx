import { summary, focusAreas, coreSkills } from '../data/cv.js'

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="section-head reveal">
          <span className="num">01.</span>
          <h2>About</h2>
          <span className="rule" />
        </div>

        <div className="about-grid">
          <div className="reveal">
            <p>{summary}</p>
            <p>
              I work across the full set of architecture domains —{' '}
              <strong>business, information, data, applications, technology and security</strong>{' '}
              — and use the relationships between them to articulate strategic direction
              through communication, influence and stakeholder partnership.
            </p>
            <p>
              Industries to date: <strong>financial services, manufacturing, automotive,
              pharmaceutical and the public sector</strong> — including healthcare, transport
              and local government.
            </p>
          </div>

          <aside className="focus-card reveal">
            <h3>Focus areas</h3>
            <ul className="focus-list">
              {focusAreas.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </aside>
        </div>

        <div className="core-skills">
          {coreSkills.map((s) => (
            <div key={s.label} className="core-skill reveal">
              <div className="label">{s.label}</div>
              <div className="detail">{s.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
