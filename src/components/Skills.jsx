import { technicalSkills, education, certifications } from '../data/cv.js'

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-head reveal">
          <span className="num">03.</span>
          <h2>Skills &amp; Qualifications</h2>
          <span className="rule" />
        </div>

        <div className="skill-groups">
          {technicalSkills.map((g) => (
            <div key={g.group} className="skill-group reveal">
              <h3>{g.group}</h3>
              <div className="tag-row">
                {g.items.map((it) => (
                  <span key={it} className="tag">{it}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="cert-block">
          <div className="reveal">
            <h3>Education</h3>
            <ul className="cert-list">
              {education.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
          <div className="reveal">
            <h3>Certifications &amp; courses</h3>
            <ul className="cert-list">
              {certifications.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
