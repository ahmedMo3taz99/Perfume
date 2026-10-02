import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { Suspense } from 'react'
import BottleModel from './BottleModel'

export default function HeroScene() {
  return (
    <Canvas
      style={{ position: 'fixed', inset: 0, zIndex: 5, pointerEvents: 'none', background: 'transparent' }}
      camera={{ fov: 35, position: [0, 1.4, 8] }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
      frameloop="always"
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 3]}  intensity={1.5} color="#ffffff" />
      <directionalLight position={[-4, 2, -2]} intensity={0.6} color="#d4c5b0" />
      <pointLight       position={[0, -3, 4]}  intensity={0.4} color="#fff8f0" />
      <Suspense fallback={null}>
        <Environment preset="dawn" />
        <BottleModel />
      </Suspense>
    </Canvas>
  )
}
