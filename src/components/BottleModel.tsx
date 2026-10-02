import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TARGET_HEIGHT = 2.2

export default function BottleModel() {
  const { scene } = useGLTF('/model/bottle.glb')
  const entrance = useRef<THREE.Group>(null!)
  const scroll   = useRef<THREE.Group>(null!)
  const floatG   = useRef<THREE.Group>(null!)
  const targetX  = useRef(0)   // lerp target for x position
  const spinY    = useRef(0)   // accumulated idle y rotation

  const { fitScale, offset } = useMemo(() => {
    // no rotation override — let model's native orientation show
    scene.rotation.set(0, 0, 0)
    scene.updateMatrixWorld(true)
    const box    = new THREE.Box3().setFromObject(scene)
    const size   = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    // fit to tallest axis so portrait bottles scale correctly
    const maxAxis = Math.max(size.x, size.y, size.z)
    return { fitScale: TARGET_HEIGHT / (maxAxis || 1), offset: center.multiplyScalar(-1) }
  }, [scene])

  useLayoutEffect(() => {
    // crystal glass material — looks luxurious without textures
    const glassMat = new THREE.MeshPhysicalMaterial({
      color:            new THREE.Color('#e8dfd4'),
      metalness:        0.05,
      roughness:        0.08,
      transmission:     0.88,
      thickness:        1.2,
      ior:              1.52,
      envMapIntensity:  2.5,
      clearcoat:        1.0,
      clearcoatRoughness: 0.05,
    })
    const capMat = new THREE.MeshPhysicalMaterial({
      color:          new THREE.Color('#c8b89a'),
      metalness:      0.6,
      roughness:      0.2,
      envMapIntensity: 1.5,
    })

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow    = true
        child.receiveShadow = true
        // top ~15% of bounding box = cap → gold; rest = glass
        const box    = new THREE.Box3().setFromObject(child)
        const size   = box.getSize(new THREE.Vector3())
        const center = box.getCenter(new THREE.Vector3())
        const sceneBox = new THREE.Box3().setFromObject(scene)
        const sceneTop = sceneBox.max.y
        child.material = center.y > sceneTop - size.y * 2 ? capMat : glassMat
      }
    })
  }, [scene])

  // Entrance — scale up from below, no spin
  useEffect(() => {
    const e = entrance.current
    e.scale.set(0, 0, 0)
    e.position.y = -1.5
    const tl = gsap.timeline()
    tl.to(e.scale,    { x: 1, y: 1, z: 1, duration: 1.4, ease: 'expo.out', delay: 0.4 })
    tl.to(e.position, { y: 0, duration: 1.4, ease: 'expo.out' }, '<')
    return () => { tl.kill() }
  }, [])

  // Single continuous trigger — no gaps between sections
  useEffect(() => {
    // sides per chapter: 0=hero(center), 1-5=scent sections alternating
    const SIDES = [0, 1.8, -1.8, 1.8, -1.8, 1.8]

    const st = ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const sections = document.querySelectorAll<HTMLElement>('[data-scent-index]')
        const hero = document.getElementById('hero')
        if (!hero) return

        // check hero
        const heroRect = hero.getBoundingClientRect()
        if (heroRect.bottom > window.innerHeight * 0.5) {
          targetX.current = SIDES[0]
          return
        }

        // find which scent section is active
        let found = false
        sections.forEach((el, i) => {
          const rect = el.getBoundingClientRect()
          if (rect.top < window.innerHeight * 0.6 && rect.bottom > window.innerHeight * 0.4) {
            targetX.current = SIDES[i + 1] ?? SIDES[SIDES.length - 1]
            found = true
          }
        })
        if (!found && heroRect.bottom <= window.innerHeight * 0.5) {
          // between hero and first section — keep last value
        }
      },
    })
    return () => { st.kill() }
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()

    // gentle idle float
    floatG.current.position.y = Math.sin(t * 0.7) * 0.07

    // slow idle spin
    spinY.current += 0.004
    floatG.current.rotation.y = spinY.current

    // lerp x toward target (smooth side switch)
    scroll.current.position.x += (targetX.current - scroll.current.position.x) * 0.035
    // push bottle down to vertical center of viewport
    scroll.current.position.y = -0.7
  })

  return (
    <group ref={scroll} position={[0, 0, 0]}>
      <group ref={entrance}>
        <group ref={floatG}>
          <group scale={fitScale}>
            <primitive object={scene} position={offset} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/model/bottle.glb')
