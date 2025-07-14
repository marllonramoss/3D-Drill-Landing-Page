"use client"

import React from 'react'

type Props = {}

export function Footer() {
  return (
    <div className='flex justify-center items-center bg-black w-full h-32 sm:h-40 md:h-48 absolute bottom-0 px-4 z-20'>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="bg-black w-fit h-fit px-4 sm:px-6 py-2 rounded-full text-xs text-white font-light cursor-pointer hover:bg-gray-800 transition-colors"
      >
        BACK TO TOP
      </button>
    </div>
  )
}