"use client"

import React, { useEffect, useRef, useState } from 'react'
import { Header } from '../Header'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Props = {}

export function FirstSection({}: Props) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (!contentRef.current) return
    gsap.fromTo(
      contentRef.current,
      { opacity: 1, y: 0, x: 0 },
      {
        opacity: 0,
        x: -150,
        ease: 'none',
        scrollTrigger: {
          trigger: '#first-section',
          start: 'top top',
          end: 'bottom 50%',
          scrub: 1,
          markers: false,
          id: 'first-section-content',
        },
      }
    )
  }, [])

  useEffect(() => {
    const handler = () => setVisible(false)
    window.addEventListener('hideSections', handler)
    return () => window.removeEventListener('hideSections', handler)
  }, [])

  if (!visible) return null

  return (
    <div id="first-section" className='leading-none'>
      <div className=' grid grid-cols-1 md:grid-cols-12 h-screen gap-x-2 sm:gap-x-3 md:gap-x-5 container-max justify-center w-full items-center px-4 sm:px-6 md:px-8 lg:px-12'>
        <div className='col-span-1 md:col-span-6 flex w-full justify-center md:justify-start'>
    
        <div id='first-section-content' ref={contentRef} className='flex flex-col gap-3 sm:gap-4 w-full max-w-md md:max-w-none text-center md:text-left'>

        <h1 className='text-4xl sm:text-6xl md:text-8xl lg:text-[120px] xl:text-[160px] font-bold leading-none'>
            <span>Perfect</span> <br/>
            <span>Drill</span>
        </h1>
    <p className='max-w-[360px] text-sm sm:text-base md:text-lg mx-auto md:mx-0'>Variable speed for ultimate fingertip control for all drilling applications. Reverse brush system for full torque and power in forward and reverse, lock-on button for continuous use.</p>
    <button className='bg-[var(--brand-yellow)] w-fit h-fit px-4 sm:px-6 py-2 rounded-full text-xs text-black font-bold hover:bg-yellow-500 transition-colors mx-auto md:mx-0'>
      KNOW MORE
    </button>
        </div>
        </div>
      </div>

    </div>
  )
}