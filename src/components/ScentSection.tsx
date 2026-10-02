import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SCENTS = [
  { num:"01", name:"NOIR",  sub:"Dark Oud & Black Amber",
    desc:"An opening of black pepper and bergamot gives way to a heart of oud and vetiver — a scent that arrives without announcement and lingers without apology.",
    side: 'right' }, // bottle right → text left
  { num:"02", name:"BLANC", sub:"White Musk & Iris",
    desc:"Stripped to its purest form: white musk, iris root, and a breath of fresh linen. The fragrance of a room you can never quite remember but always want to return to.",
    side: 'left' },  // bottle left → text right
  { num:"03", name:"AMBRE", sub:"Warm Amber & Vanilla",
    desc:"Golden amber resin warmed by bourbon vanilla and a trace of sandalwood. The scent of last light through a Paris apartment window in October.",
    side: 'right' },
  { num:"04", name:"ROSE",  sub:"Bulgarian Rose & Patchouli",
    desc:"Three hundred petals distilled into a single drop. Bulgarian rose at its peak, grounded by dark patchouli — romantic without sentiment, precise without coldness.",
    side: 'left' },
  { num:"05", name:"ÉBÈNE", sub:"Dark Wood & Vetiver",
    desc:"Ebony wood, aged vetiver and a thread of leather. The quietest scent in the collection. The one that takes the longest to understand and the longest to forget.",
    side: 'right' },
]

export default function ScentSection() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-scent]').forEach((el) => {
        const q = (s: string) => el.querySelector(s)
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: 'top 65%', once: true },
        })
        tl.fromTo(q('[data-num]'),  { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 0.06, duration: 1.2 }, 0)
          .fromTo(q('[data-name]'), { y: 60, opacity: 0 },       { y: 0, opacity: 1, duration: 1.0, ease: 'expo.out' }, 0)
          .fromTo(q('[data-sub]'),  { y: 30, opacity: 0 },       { y: 0, opacity: 1, duration: 0.8 }, 0.15)
          .fromTo(q('[data-desc]'), { y: 20, opacity: 0 },       { y: 0, opacity: 1, duration: 0.8 }, 0.3)
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div id="collection" ref={root} className="bg-[#F5F0E8]">
      {SCENTS.map((s, i) => (
        <div key={s.num}>
          {i > 0 && <div className="h-px bg-[#C4A97D] opacity-20 mx-6 md:mx-16" />}

          {/* data-scent-index used by BottleModel to know which side to go */}
          <section
            data-scent
            data-scent-index={i}
            data-bottle-side={s.side}
            className="relative min-h-screen flex items-center overflow-hidden bg-[#F5F0E8]"
          >
            {/* big background number */}
            <span
              data-num
              className="font-display font-light absolute top-1/2 -translate-y-1/2 text-[130px] md:text-[200px] leading-none text-[#1A1714] opacity-0 select-none pointer-events-none"
              style={{ [s.side === 'right' ? 'left' : 'right']: '4%' }}
            >
              {s.num}
            </span>

            {/* text block — opposite side to bottle */}
            <div
              className="relative z-10 w-full flex"
              style={{ justifyContent: s.side === 'right' ? 'flex-start' : 'flex-end' }}
            >
              <div
                className="px-10 md:px-20 max-w-[480px]"
                style={{ marginLeft: s.side === 'right' ? 0 : 'auto' }}
              >
                <h2 data-name className="font-display font-light text-[#1A1714] text-[52px] md:text-[80px] leading-none opacity-0">
                  {s.name}
                </h2>
                <p data-sub className="font-body text-[10px] tracking-[4px] uppercase text-[#C4A97D] mt-5 opacity-0">
                  {s.sub}
                </p>
                <p data-desc className="font-body font-light text-[15px] leading-relaxed text-[#8A8178] mt-6 opacity-0 max-w-[320px]">
                  {s.desc}
                </p>
              </div>
            </div>
          </section>
        </div>
      ))}
    </div>
  )
}
