import { experience } from '../data/cv.js'

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="section-head reveal">
          <span className="num">02.</span>
          <h2>Experience</h2>
          <span className="rule" />
        </div>

        <div className="timeline">
          {experience.map((role, i) => (
            <article key={i} className="role reveal">
              <div className="period">{role.period}</div>
              <div className="body">
                <h3>
                  {role.role}
                  <span className="org">{role.org}</span>
                </h3>
                {role.summary && <p>{role.summary}</p>}
                {role.bullets && role.bullets.length > 0 && (
                  <ul className="role-bullets">
                    {role.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
