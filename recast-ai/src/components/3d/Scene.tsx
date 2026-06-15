'use client'
// @refresh reset

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

function MainOrb() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = clock.elapsedTime * 0.08
    meshRef.current.rotation.y = clock.elapsedTime * 0.12
  })

  return (
    <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.9}>
      <mesh ref={meshRef} position={[2.2, 0.2, 0]}>
        <icosahedronGeometry args={[1.9, 4]} />
        <MeshDistortMaterial
          color="#7c3aed"
          distort={0.38}
          speed={2.2}
          roughness={0.05}
          metalness={0.85}
          emissive="#4c1d95"
          emissiveIntensity={1.2}
          toneMapped={false}
        />
      </mesh>
    </Float>
  )
}

function SmallShape({
  position,
  kind,
  speed,
}: {
  position: [number, number, number]
  kind: 'octa' | 'torus' | 'tetra'
  speed: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = clock.elapsedTime * speed
    meshRef.current.rotation.y = clock.elapsedTime * speed * 0.7
  })

  return (
    <Float speed={speed * 1.5} rotationIntensity={1.2} floatIntensity={1.6}>
      <mesh ref={meshRef} position={position}>
        {kind === 'octa' && <octahedronGeometry args={[0.38]} />}
        {kind === 'torus' && <torusGeometry args={[0.28, 0.1, 16, 32]} />}
        {kind === 'tetra' && <tetrahedronGeometry args={[0.42]} />}
        <meshStandardMaterial
          color="#a855f7"
          roughness={0.1}
          metalness={0.9}
          emissive="#7c3aed"
          emissiveIntensity={1.5}
          toneMapped={false}
        />
      </mesh>
    </Float>
  )
}

function RingAccent() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = clock.elapsedTime * 0.05
    meshRef.current.rotation.z = clock.elapsedTime * 0.08
  })

  return (
    <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[2.2, 0.2, 0]}>
        <torusGeometry args={[2.8, 0.04, 16, 100]} />
        <meshStandardMaterial
          color="#a855f7"
          roughness={0}
          metalness={1}
          emissive="#7c3aed"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
    </Float>
  )
}

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 55 }}
      dpr={[1, 1.5]}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.1} />
      <pointLight position={[6, 4, 4]} intensity={4} color="#a855f7" />
      <pointLight position={[-4, -3, 3]} intensity={2} color="#06b6d4" />
      <pointLight position={[0, 2, 6]} intensity={1} color="#ec4899" />

      <MainOrb />
      <RingAccent />

      <SmallShape position={[-2, 2.2, -1.5]} kind="octa" speed={0.25} />
      <SmallShape position={[5.2, -1.2, -0.8]} kind="torus" speed={0.2} />
      <SmallShape position={[0.8, -2.8, 0.5]} kind="tetra" speed={0.3} />
      <SmallShape position={[-3.5, -0.5, -1.2]} kind="octa" speed={0.18} />
      <SmallShape position={[3.8, 2.5, -1]} kind="torus" speed={0.22} />

      <Sparkles
        count={90}
        scale={[14, 10, 5]}
        size={1.4}
        speed={0.35}
        color="#a855f7"
      />
    </Canvas>
  )
}
