"use client"

import React, { useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, Environment, Grid, GizmoHelper, GizmoViewport } from '@react-three/drei'
import { useControls } from 'leva'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registrar o plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

function DrillModel() {
  const { scene } = useGLTF('/drill.glb')
  const modelRef = useRef<THREE.Group>(null)

  // Controles do Leva para posicionamento
  const modelControls = useControls('Model Position', {
    positionX: { value: 6, min: -20, max: 20, step: 0.1 },
    positionY: { value: -6, min: -20, max: 20, step: 0.1 },
    positionZ: { value: 0, min: -20, max: 20, step: 0.1 },
    rotationX: { value: 0, min: -Math.PI, max: Math.PI, step: 0.1 },
    rotationY: { value: 0.5, min: -Math.PI, max: Math.PI, step: 0.1 },
    rotationZ: { value: 0, min: -Math.PI, max: Math.PI, step: 0.1 },
    scale: { value: 60, min: 1, max: 100, step: 1 }
  })

  useEffect(() => {
    if (!modelRef.current) return

    // Configurações das animações
    const animations = {
      secondSection: {
        position: { x: -5.9, y: -6.0, z: 2.2 },
        rotation: { x: -0.3, y: -2.3, z: 0.3 }
      },
      thirdSection: {
        position: { x: 6, y: -2, z: -8.0 },
        rotation: { x: 0.9, y: 0.5, z: 0.2 }
      }
    }

    // Primeira timeline - animação para segunda seção
    const secondSectionTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#second-section",
        start: "top bottom",
        end: "top top",
        scrub: 2,
        markers: true,
        id: "second-section-timeline"
      }
    })

    secondSectionTimeline
      .to(modelRef.current.position, {
        ...animations.secondSection.position,
        ease: "power2.inOut"
      })
      .to(modelRef.current.rotation, {
        ...animations.secondSection.rotation,
        ease: "power2.inOut"
      }, "<")

    // Segunda timeline - animação para terceira seção
    const thirdSectionTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#third-section",
        start: "top bottom",
        end: "top top",
        scrub: 2,
        markers: true,
        id: "third-section-timeline"
      }
    })

    thirdSectionTimeline
      .to(modelRef.current.position, {
        ...animations.thirdSection.position,
        ease: "power2.inOut"
      })
      .to(modelRef.current.rotation, {
        ...animations.thirdSection.rotation,
        ease: "power2.inOut"
      }, "<")

    // Cleanup do ScrollTrigger
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <primitive 
      ref={modelRef}
      object={scene} 
      scale={modelControls.scale}
      position={[modelControls.positionX, modelControls.positionY, modelControls.positionZ]}
      rotation={[modelControls.rotationX, modelControls.rotationY, modelControls.rotationZ]}
    />
  )
}

export function Drill3() {
  return (
    <div className="fixed inset-0 w-screen h-screen">
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
        
        {/* Helpers */}
        <Grid 
          args={[50, 50]} 
          cellSize={1} 
          cellThickness={0.5} 
          cellColor="#ffffff" 
          sectionSize={5} 
          sectionThickness={1} 
          sectionColor="#ff0000" 
          fadeDistance={100} 
          fadeStrength={0.3} 
          followCamera={false} 
          infiniteGrid={true} 
        />
        
        <GizmoHelper alignment="top-right" margin={[80, 80]}>
          <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="white" />
        </GizmoHelper>
      </Canvas>
    </div>
  )
} 