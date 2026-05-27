import { profile } from '../data/cv.js'

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container">
        <div className="reveal">
          <p className="eyebrow">Hi, my name is</p>
          <h1>{profile.name}.</h1>
          <h2>{profile.title}</h2>
          <p className="lede">{profile.tagline}</p>
          <div className="hero-meta">
            <span><span className="dot" />{profile.location}</span>
            <span><span className="dot" />{profile.clearance}</span>
          </div>
          <div className="btn-row">
            <a className="btn" href="#experience">
              View experience →
            </a>
            <a className="btn" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
