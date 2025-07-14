"use client"

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registrar o plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

export function SmoothScroll() {
  useEffect(() => {
    // Inicializar Lenis para scroll suave
    const lenis = new Lenis({
      duration: 2.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -15 * t)),
      lerp: 0.1,
      wheelMultiplier: 0.8,
    })

    // Integrar Lenis com GSAP
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Conectar Lenis com ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Cleanup do Lenis
    return () => {
      lenis.destroy()
    }
  }, [])

  return null
} 