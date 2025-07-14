"use client"

import React from 'react'
import { Header } from '../Header'

type Props = {}

export function FirstSection({}: Props) {
  return (
    <div className='leading-none'>
      <div className='grid grid-cols-12 h-screen gap-x-5 container-max justify-center w-full items-center    '>
        <div className=' col-span-6 flex w-full justify-start '>

        <div className=' flex flex-col gap-4 w-fit'>

        <h1 className='-mx-3 text-[160px] font-bold leading-none   '>
            <span>Perfect</span> <br/>
            <span>Drill</span>
        </h1>
    <p className='max-w-[360px]'>Variable speed for ultimate fingertip control for all drilling applications. Reverse brush system for full torque and power in forward and reverse, lock-on button for continuous use.</p>
    <button className='bg-[var(--brand-yellow)] w-fit h-fit px-6 py-2 rounded-full text-xs text-black font-bold'>
      KNOW MORE
    </button>
        </div>
        </div>
      </div>

    </div>
  )
}