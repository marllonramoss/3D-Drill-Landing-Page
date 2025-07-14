"use client"

import React, { useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registrar o plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

function DrillModel() {
  const { scene } = useGLTF('/drill.glb')
  const modelRef = useRef<THREE.Group>(null)

  // Valores fixos para produção
  const modelPosition = { x: 6, y: -6, z: 0 }
  const modelRotation = { x: 0, y: 0.5, z: 0 }
  const modelScale = 60

    useEffect(() => {
    if (!modelRef.current) return

    // Limpar triggers existentes primeiro
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())

    // Animação para segunda seção
    gsap.to(modelRef.current.position, {
      x: -5.9,
      y: -6.0,
      z: 2.2,
      ease: "power2.inOut",
      immediateRender: false,
              scrollTrigger: {
          trigger: "#second-section",
          start: "top bottom",
          end: "top top",
          scrub: 3
        }
    })

    gsap.to(modelRef.current.rotation, {
      x: -0.3,
      y: -2.3,
      z: 0.3,
      ease: "power2.inOut",
      immediateRender: false,
              scrollTrigger: {
          trigger: "#second-section",
          start: "top bottom",
          end: "top top",
          scrub: 3
        }
    })

    // Animação para terceira seção
    gsap.to(modelRef.current.position, {
      x: 6,
      y: -2,
      z: -8.0,
      ease: "power2.inOut",
      immediateRender: false,
              scrollTrigger: {
          trigger: "#third-section",
          start: "top bottom",
          end: "top top",
          scrub: 3
        }
    })

    gsap.to(modelRef.current.rotation, {
      x: 0.9,
      y: 0.5,
      z: 0.2,
      ease: "power2.inOut",
      immediateRender: false,
              scrollTrigger: {
          trigger: "#third-section",
          start: "top bottom",
          end: "top top",
          scrub: 3
        }
    })

    // Cleanup do ScrollTrigger
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <primitive 
      ref={modelRef}
      object={scene} 
      scale={modelScale}
      position={[modelPosition.x, modelPosition.y, modelPosition.z]}
      rotation={[modelRotation.x, modelRotation.y, modelRotation.z]}
    />
  )
}

export function Drill3() {
  return (
    <div className="fixed inset-0 w-screen h-screen z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        shadows
        gl={{ antialias: true }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1} 
          castShadow 
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-5, 5, 5]} intensity={0.5} />
        
        {/* Model */}
        <DrillModel />
        
        {/* Environment */}
        <Environment preset="studio" />
      </Canvas>
    </div>
  )
} 