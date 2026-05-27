const sections = [
  { num: '01', label: 'About', href: '#about' },
  { num: '02', label: 'Experience', href: '#experience' },
  { num: '03', label: 'Skills', href: '#skills' },
  { num: '04', label: 'Contact', href: '#contact' },
]

export default function Nav() {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <a href="#top" className="nav-brand">
          P<span>M</span>.
        </a>
        <nav>
          <ul className="nav-links">
            {sections.map((s) => (
              <li key={s.href}>
                <a href={s.href}>
                  <span className="num">{s.num}.</span>
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <a className="nav-cta" href="#contact">
                Get in touch
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
