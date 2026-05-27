import { useEffect } from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Experience from './components/Experience.jsx'
import Skills from './components/Skills.jsx'
import Contact from './components/Contact.jsx'
import { profile } from './data/cv.js'

export default function App() {
  // Reveal-on-scroll for elements with the .reveal class.
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <footer className="footer">
        <div className="container">
          Built with React + Vite ·{' '}
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </div>
      </footer>
    </>
  )
}
