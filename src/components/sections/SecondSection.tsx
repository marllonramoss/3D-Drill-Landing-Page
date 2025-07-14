"use client"

import React from 'react'

type Props = {}

export function SecondSection({}: Props) {
  return (
    <div id="second-section" className='leading-none relative overflow-x-hidden'>
      <div className='grid grid-cols-1 md:grid-cols-12 h-screen gap-x-2 sm:gap-x-3 md:gap-x-5 container-max justify-center w-full items-center px-4 sm:px-6 md:px-8 lg:px-12'>
        <div className='col-span-1 md:col-span-6 md:col-start-7 flex w-full justify-center md:justify-end'>

        <div className='flex flex-col gap-3 sm:gap-4 w-full max-w-md md:max-w-none text-right'>

        <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-none'>
            <span>Advanced</span> <br/>
            <span>Technology</span>
        </h2>
    <p className='max-w-[360px] text-sm sm:text-base md:text-lg ml-auto'>Cutting-edge engineering meets precision performance. Our innovative design ensures maximum efficiency and durability for professional applications.</p>
        </div>
        </div>
      </div>
<div
  className="absolute inset-0 h-4/5 bg-[var(--brand-yellow)] -z-10"
  style={{
    clipPath: 'polygon(0 0, 100% 8vw, 100% 100%, 0% calc(100% - 8vw))'
  }}
></div>
    </div>
  )
} 