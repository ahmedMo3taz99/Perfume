import { useEffect, useRef } from 'react'
import { useProgress } from '@react-three/drei'
import gsap from 'gsap'

export default function HeroContent() {
  const eyebrow = useRef<HTMLParagraphElement>(null)
  const h1 = useRef<HTMLHeadingElement>(null)
  const tagline = useRef<HTMLParagraphElement>(null)
  const cta = useRef<HTMLAnchorElement>(null)
  const { progress } = useProgress()
  const started = useRef(false)

  useEffect(() => {
    gsap.set([eyebrow.current, h1.current, tagline.current, cta.current], { opacity: 0 })
  }, [])

  useEffect(() => {
    if (progress < 100 || started.current) return
    started.current = true
    const tl = gsap.timeline()
    tl.fromTo(eyebrow.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 1.2)
      .fromTo(h1.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0, ease: 'expo.out' }, 1.4)
      .fromTo(tagline.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 1.6)
      .fromTo(cta.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 1.8)
    return () => { tl.kill() }
  }, [progress])

  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      <div className="absolute bottom-12 left-6 md:left-16 pointer-events-auto">
        <p ref={eyebrow} className="font-body text-[10px] tracking-[4px] text-muted mb-4">PARIS — MMXXIV</p>
        <h1 ref={h1} className="font-display font-light text-ink text-[52px] md:text-[96px] leading-none tracking-[10px] md:tracking-[16px]">SABLE</h1>
        <p ref={tagline} className="font-body italic text-[16px] text-muted mt-4">The Art of Invisible Luxury</p>
        <a
          ref={cta}
          href="#collection"
          className="btn-chamfer inline-flex items-center h-12 px-8 mt-8 border border-gold text-gold font-body text-[11px] tracking-[2px] uppercase bg-transparent hover:bg-gold hover:text-ink transition-colors duration-300"
        >
          Discover the Collection
        </a>
      </div>
      <div className="hidden md:flex absolute bottom-12 right-16 flex-col items-center gap-6 pointer-events-auto">
        <span className="font-body text-[10px] tracking-[3px] text-muted uppercase" style={{ writingMode: 'vertical-rl' }}>Scroll to explore</span>
        <span className="block w-px h-[60px] bg-gold opacity-50" />
      </div>
    </div>
  )
}
