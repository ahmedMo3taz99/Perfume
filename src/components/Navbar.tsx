import { useEffect, useState } from 'react'

const LINKS = ['MAISON', 'COLLECTION', 'BOUTIQUE', 'CONTACT']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 80)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 w-full h-[72px] z-50 flex items-center justify-between px-6 md:px-12 transition-all duration-[400ms] ${
        scrolled ? 'bg-[rgba(245,240,232,0.92)] backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <a href="#hero" className="font-display font-light text-[18px] tracking-[8px] text-ink">SABLE</a>
      <div className="hidden md:flex gap-10">
        {LINKS.map((l) => (
          <a key={l} href="#collection" className="font-body text-[11px] tracking-[2px] text-ink/60 hover:text-ink transition-colors duration-[250ms]">
            {l}
          </a>
        ))}
      </div>
      <a href="#contact" className="font-body text-[11px] tracking-[1px] text-gold">Book a Consultation</a>
    </nav>
  )
}
