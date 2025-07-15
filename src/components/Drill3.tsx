"use client"

import React, { useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function DrillModel({ color = "red" }: { color?: string }) {
  const { scene } = useGLTF('/zxzxzx.glb')
  const modelRef = useRef<THREE.Group>(null)
  const originalColor = useRef<string | null>(null);

  // Loga a cena carregada para inspeção manual
  useEffect(() => {
    if (scene) {
      console.log("GLTF Scene:", scene);
    }
  }, [scene]);

  // Salva a cor original do mesh ao carregar o modelo
  useEffect(() => {
    if (scene) {
      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          if (
            mesh.material &&
            (mesh.material as THREE.Material).type === 'MeshStandardMaterial'
          ) {
            if (!originalColor.current) {
              originalColor.current = (mesh.material as THREE.MeshStandardMaterial).color.getHexString();
            }
          }
        }
      });
    }
  }, [scene]);

  // Troca a cor do mesh para a cor recebida
  useEffect(() => {
    if (scene) {
      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          if (
            mesh.material &&
            (mesh.material as THREE.Material).type === 'MeshStandardMaterial'
          ) {
            if (color === "default" && originalColor.current) {
              (mesh.material as THREE.MeshStandardMaterial).color.set("#" + originalColor.current);
            } else {
              (mesh.material as THREE.MeshStandardMaterial).color.set(color);
            }
          }
        }
      });
    }
  }, [scene, color]);

  // Ref para armazenar o estado anterior antes do anim3
  const prevState = useRef({
    position: [0, 0, 0] as [number, number, number],
    rotation: [0, 0, 0] as [number, number, number],
    scale: [1, 1, 1] as [number, number, number],
  })

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
  const anim3 = {
    position: [-1.12, -0.18, 0.92] as [number, number, number],
    rotation: [0.06, 1.65, -0.02] as [number, number, number],
    scale: [0.40, 0.40, 0.40] as [number, number, number],
  }

  // Função para criar os ScrollTriggers
  const createScrollTriggers = () => {
    // Animação 1: ScrollTrigger para SecondSection
    const st1 = ScrollTrigger.create({
      trigger: '#second-section',
      start: 'top bottom',
      end: 'top 5%',
      scrub: true,
      markers: false,
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
      markers: false,
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
    return [st1, st2]
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

    // Cria os ScrollTriggers
    let triggers = createScrollTriggers();

    // Listener para evento externo
    const handler = () => animateToAnim3()
    window.addEventListener('animateToAnim3', handler)

    // NOVO: Listener para voltar
    const backHandler = () => animateBackToAnim2()
    window.addEventListener('animateBackToAnim2', backHandler)

    return () => {
      triggers.forEach(t => t.kill())
      window.removeEventListener('animateToAnim3', handler)
      // Remove o listener do back
      window.removeEventListener('animateBackToAnim2', backHandler)
    }
  }, [])

  // Função para animar para anim3
  const animateToAnim3 = () => {
    if (!modelRef.current) return
    const current = modelRef.current

    // Salva o estado atual antes de animar para anim3
    prevState.current.position = [current.position.x, current.position.y, current.position.z]
    prevState.current.rotation = [current.rotation.x, current.rotation.y, current.rotation.z]
    prevState.current.scale = [current.scale.x, current.scale.y, current.scale.z]

    // 1. Garante que está no ponto de partida correto
    current.position.set(anim2.position[0], anim2.position[1], anim2.position[2])
    current.rotation.set(anim2.rotation[0], anim2.rotation[1], anim2.rotation[2])
    current.scale.set(anim2.scale[0], anim2.scale[1], anim2.scale[2])
    current.updateMatrixWorld(true) // Força atualização imediata

    // 2. (Opcional) Mata os ScrollTriggers para evitar sobrescrita
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())

    // 3. Aguarda um frame antes de animar
    requestAnimationFrame(() => {
      gsap.to(current.position, {
        x: anim3.position[0],
        y: anim3.position[1],
        z: anim3.position[2],
        duration: 1.2,
        ease: 'power2.inOut'
      })
      gsap.to(current.rotation, {
        x: anim3.rotation[0],
        y: anim3.rotation[1],
        z: anim3.rotation[2],
        duration: 1.2,
        ease: 'power2.inOut'
      })
      gsap.to(current.scale, {
        x: anim3.scale[0],
        y: anim3.scale[1],
        z: anim3.scale[2],
        duration: 1.2,
        ease: 'power2.inOut'
      })
    })
  }

  // Função para animar de volta para o estado inicial (usada no botão Back)
  const animateBackToAnim2 = () => {
    if (!modelRef.current) return
    const current = modelRef.current

    // Mata os ScrollTriggers para evitar sobrescrita
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())

    // Aguarda um frame antes de animar para o estado inicial
    requestAnimationFrame(() => {
      gsap.to(current.position, {
        x: initial.position[0],
        y: initial.position[1],
        z: initial.position[2],
        duration: 1.2,
        ease: 'power2.inOut',
        onUpdate: () => current.updateMatrixWorld(true)
      })
      gsap.to(current.rotation, {
        x: initial.rotation[0],
        y: initial.rotation[1],
        z: initial.rotation[2],
        duration: 1.2,
        ease: 'power2.inOut',
        onUpdate: () => current.updateMatrixWorld(true)
      })
      gsap.to(current.scale, {
        x: initial.scale[0],
        y: initial.scale[1],
        z: initial.scale[2],
        duration: 1.2,
        ease: 'power2.inOut',
        onUpdate: () => current.updateMatrixWorld(true)
      })
      // Recria os ScrollTriggers após a animação
      setTimeout(() => {
        createScrollTriggers();
      }, 1200);
    })
  }

  return (
    <>
      <primitive 
        ref={modelRef}
        object={scene} 
        // Removidas as props scale, position e rotation
      />
    </>
  )
}

export function Drill3({ color = "red" }: { color?: string }) {
  const cameraPosition: [number, number, number] = [-4.10, -0.41, 2.81]
  return (
    <div className="fixed inset-0 w-screen h-screen z-10">
      <Canvas camera={{ position: cameraPosition, fov: 25 }}>
         {/* Environment de estúdio para iluminação realista */}
         <Environment preset="studio" />
        <DrillModel color={color} />
      </Canvas>
    </div>
  )
} 