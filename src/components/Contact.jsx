import { profile } from '../data/cv.js'

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container reveal">
        <div className="num">04. Get in touch</div>
        <h2>Let&rsquo;s talk strategy.</h2>
        <p>
          Open to senior architecture, strategy and consulting opportunities.
          The fastest way to reach me is by email — or connect on LinkedIn.
        </p>
        <div className="btn-row" style={{ justifyContent: 'center' }}>
          <a className="btn" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
        </div>
      </div>
    </section>
  )
}
