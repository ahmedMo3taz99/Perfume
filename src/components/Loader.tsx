import { useProgress } from '@react-three/drei'

export default function Loader() {
  const { progress } = useProgress()
  const done = progress >= 100
  return (
    <div
      className="fixed inset-0 z-[100] bg-cream flex flex-col items-center justify-center transition-opacity duration-1000"
      style={{ opacity: done ? 0 : 1, pointerEvents: done ? 'none' : 'auto' }}
    >
      <div className="font-display font-light text-ink text-[28px] tracking-[14px] pl-[14px]">SABLE</div>
      <div className="mt-8 w-40 h-px bg-gold/20 overflow-hidden">
        <div className="h-full bg-gold transition-[width] duration-300" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
