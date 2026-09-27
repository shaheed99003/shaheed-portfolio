import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, ContactShadows, Float } from '@react-three/drei'
import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { useTheme } from '../context/ThemeContext'

function Sculpture({ progress, isDark, isMobile }){
  const group = useRef()
  const knot = useRef()
  const sphere = useRef()

  useFrame((state)=>{
    if(!group.current || !knot.current || !sphere.current) return
    const t = state.clock.elapsedTime
    const p = progress

    // Less movement on mobile
    const moveMult = isMobile ? 0.4 : 1
    const tx = p < 0.18? 0 : p < 0.38? 1.8 * moveMult : p < 0.68? -1.3 * moveMult : p < 0.85? 0.5 * moveMult : 0
    const ty = p < 0.2? 0 : p < 0.5? -0.2 : 0.1
    const ts = p < 0.2? 1 : p < 0.4? 0.7 : p < 0.7? 1.35 : 0.9
    const finalScale = isMobile ? ts * 0.75 : ts // Smaller on mobile

    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, tx, 0.04)
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, ty, 0.04)
    group.current.scale.lerp(new THREE.Vector3(finalScale,finalScale,finalScale), 0.04)

    knot.current.rotation.y = p * Math.PI * 1.6 + t * 0.12
    knot.current.rotation.x = Math.sin(t*0.3)*0.15 + p*0.5

    // No mouse follow on mobile
    if(!isMobile){
      knot.current.position.x = state.pointer.x * 0.25
      knot.current.position.y = state.pointer.y * 0.2
    }

    sphere.current.rotation.y = -t*0.25
  })

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={isMobile ? 0.05 : 0.12} floatIntensity={isMobile ? 0.2 : 0.5}>
        <group ref={knot}>
          <mesh castShadow={!isMobile}>
            <torusKnotGeometry args={[1, 0.33, isMobile ? 64 : 128, isMobile ? 16 : 32, 2, 3]} />
            <meshPhysicalMaterial color={isDark? "#101010" : "#0e0e0e"} metalness={0.92} roughness={0.12} clearcoat={1} />
          </mesh>
          <mesh ref={sphere}>
            <sphereGeometry args={[0.5, isMobile ? 16 : 32, isMobile ? 16 : 32]} />
            <meshPhysicalMaterial color={isDark? "#1e1e1e" : "#f7f5f2"} metalness={0} roughness={0.08} />
          </mesh>
        </group>
      </Float>
      <ContactShadows position={[0,-1.8,0]} opacity={isDark?0.12:0.22} scale={14} blur={isMobile ? 1.5 : 2.8} far={5} />
    </group>
  )
}

export default function Scene({ progress }){
  const { theme } = useTheme()
  const isDark = theme==='dark'
  const [isMobile, setIsMobile] = useState(false)

  useEffect(()=>{
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  },[])

  return (
    <Canvas 
      shadows={!isMobile} 
      camera={{ position:[0,0, isMobile ? 5.2 : 4.5], fov: isMobile ? 50 : 40 }} 
      dpr={isMobile ? [1, 1.2] : [1, 1.8]} // Low DPR on mobile = no lag
      gl={{ antialias: !isMobile, alpha:true, powerPreference: isMobile ? 'low-power' : 'high-performance' }}
      style={{ width: '100vw', height: '100vh', height: '100dvh' }}
    >
      <ambientLight intensity={isDark?0.25:0.5} />
      <directionalLight position={[5,8,5]} intensity={isDark?1.2:2} castShadow={!isMobile} />
      <Sculpture progress={progress} isDark={isDark} isMobile={isMobile} />
      <Environment preset={isDark?"night":"studio"} />
    </Canvas>
  )
}