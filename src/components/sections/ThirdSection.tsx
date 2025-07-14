"use client"

import React from 'react'

type Props = {}

export function ThirdSection({}: Props) {
  return (
    <div id="third-section" className='leading-none'>
      <div className='grid grid-cols-12 h-screen gap-x-5 container-max justify-center w-full items-center    '>
        <div className=' col-span-6 flex w-full justify-start '>

        <div className=' flex flex-col gap-4 w-fit'>

        <h2 className='-mx-3 text-6xl font-bold leading-none   '>
            <span>Professional</span> <br/>
            <span>Quality</span>
        </h2>
    <p className='max-w-[360px]'>Built for professionals who demand the best. Superior craftsmanship and reliable performance in every project, every time.</p>
        </div>
        </div>
      </div>

    </div>
  )
} 