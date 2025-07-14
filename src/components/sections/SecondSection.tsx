"use client"

import React from 'react'

type Props = {}

export function SecondSection({}: Props) {
  return (
    <div id="second-section" className='leading-none relative '>
      <div className='grid grid-cols-12 h-screen gap-x-5 container-max justify-center w-full items-center'>
        <div className=' col-span-6 col-start-7 flex w-full justify-end  '>

        <div className=' flex flex-col gap-4 w-fit'>

        <h2 className='-mx-3 text-6xl font-bold leading-none   '>
            <span>Advanced</span> <br/>
            <span>Technology</span>
        </h2>
    <p className='max-w-[360px]'>Cutting-edge engineering meets precision performance. Our innovative design ensures maximum efficiency and durability for professional applications.</p>
        </div>
        </div>
      </div>
<div className='absolute inset-x-0 top-0 h-4/5 bg-[var(--brand-yellow)] -z-10 rotate-7 w-[120%] -left-[10%]'></div>
    </div>
  )
} 