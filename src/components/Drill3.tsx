"use client"

import React, { useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function DrillModel() {
  const { scene } = useGLTF('/zxzxzx.glb')
  const modelRef = useRef<THREE.Group>(null)

  // Estados iniciais e alvos das animações
  const initial = {
    position: [-1.15, -0.21, 1.24] as [number, number, number],
    rotation: [0.06, -0.47, -0.02] as [number, number, number],
    scale: [0.40, 0.40, 0.40] as [number, number, number],
  }
  const anim1 = {
    position: [-2.39, -0.30, 1.24] as [number, number, number],
    rotation: [-0.51, 2.96, 0.54] as [number, number, number],
    scale: [0.47, 0.47, 0.47] as [number, number, number],
  }
  const anim2 = {
    position: [-1.14, -0.05, 1.24] as [number, number, number],
    rotation: [0.24, -0.02, 0.53] as [number, number, number],
    scale: [0.29, 0.29, 0.29] as [number, number, number],
  }

  useEffect(() => {
    if (!modelRef.current) return

    // Setar estado inicial
    modelRef.current.position.set(
      initial.position[0],
      initial.position[1],
      initial.position[2]
    )
    modelRef.current.rotation.set(
      initial.rotation[0],
      initial.rotation[1],
      initial.rotation[2]
    )
    modelRef.current.scale.set(
      initial.scale[0],
      initial.scale[1],
      initial.scale[2]
    )

    // Animação 1: ScrollTrigger para SecondSection
    const st1 = ScrollTrigger.create({
      trigger: '#second-section',
      start: 'top bottom',
      end: 'top 5%',
      scrub: true,
      markers: true,
      onUpdate: (self) => {
        if (!modelRef.current) return
        const p = initial.position.map((start, i) =>
          start + (anim1.position[i] - start) * self.progress
        )
        const r = initial.rotation.map((start, i) =>
          start + (anim1.rotation[i] - start) * self.progress
        )
        const s = initial.scale.map((start, i) =>
          start + (anim1.scale[i] - start) * self.progress
        )
        modelRef.current.position.set(p[0], p[1], p[2])
        modelRef.current.rotation.set(r[0], r[1], r[2])
        modelRef.current.scale.set(s[0], s[1], s[2])
      },
    })

    // Animação 2: ScrollTrigger para ThirdSection
    const st2 = ScrollTrigger.create({
      trigger: '#third-section',
      start: 'top bottom',
      end: 'top top',
      scrub: true,
      markers: true,
      onUpdate: (self) => {
        if (!modelRef.current) return
        // Começa do anim1, termina no anim2
        const p = anim1.position.map((start, i) =>
          start + (anim2.position[i] - start) * self.progress
        )
        const r = anim1.rotation.map((start, i) =>
          start + (anim2.rotation[i] - start) * self.progress
        )
        const s = anim1.scale.map((start, i) =>
          start + (anim2.scale[i] - start) * self.progress
        )
        modelRef.current.position.set(p[0], p[1], p[2])
        modelRef.current.rotation.set(r[0], r[1], r[2])
        modelRef.current.scale.set(s[0], s[1], s[2])
      },
    })

    return () => {
      st1.kill()
      st2.kill()
    }
  }, [])

  return (
    <primitive 
      ref={modelRef}
      object={scene} 
      scale={initial.scale}
      position={initial.position}
      rotation={initial.rotation}
    />
  )
}

export function Drill3() {
  const cameraPosition = [-4.10, -0.41, 2.81]
  return (
    <div className="fixed inset-0 w-screen h-screen z-10">
      <Canvas camera={{ position: cameraPosition, fov: 25 }}>
         {/* Environment de estúdio para iluminação realista */}
         <Environment preset="studio" />
        <DrillModel />
      </Canvas>
    </div>
  )
} 