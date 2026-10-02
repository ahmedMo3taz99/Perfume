const LINKS = ['MAISON', 'COLLECTION', 'BOUTIQUE', 'CONTACT']

export default function Footer() {
  return (
    <footer id="contact" className="bg-ink text-cream border-t border-cream/10 px-6 py-[60px] md:px-20">
      <div className="grid gap-10 md:grid-cols-3 md:items-start">
        <div className="font-display font-light text-[24px] tracking-[8px] text-gold">SABLE</div>
        <div className="flex flex-wrap gap-6 md:justify-center">
          {LINKS.map((l) => (
            <a key={l} href="#" className="font-body text-[11px] tracking-[2px] text-cream/50 hover:text-cream transition-colors">{l}</a>
          ))}
        </div>
        <div className="font-body text-[11px] text-cream/30 md:text-right leading-relaxed">
          <p>Paris, France</p>
          <p>© 2026 Maison Sable. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
