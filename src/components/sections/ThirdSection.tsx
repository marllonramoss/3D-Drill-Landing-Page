"use client"

import React, { useState, useEffect } from 'react'

type Props = {
  setOnCustomizerScreen: React.Dispatch<React.SetStateAction<boolean>>
}

export function ThirdSection({ setOnCustomizerScreen }: Props) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const handler = () => setVisible(false)
    window.addEventListener('hideSections', handler)
    return () => window.removeEventListener('hideSections', handler)
  }, [])

  if (!visible) return null

  return (
    <div id="third-section" className='leading-none relative z-30'>
      <div className='grid grid-cols-1 md:grid-cols-12 h-screen gap-x-2 sm:gap-x-3 md:gap-x-5 container-max justify-center w-full items-start md:items-center pt-24 sm:pt-28 md:pt-0 px-4 sm:px-6 md:px-8 lg:px-12'>
        <div className='col-span-1 md:col-span-6 flex w-full justify-center md:justify-start'>

        <div className='flex flex-col gap-3 sm:gap-4 w-full max-w-md md:max-w-none text-center md:text-left'>

        <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-none'>
            <span>Professional</span> <br/>
            <span>Quality</span>
        </h2>
    <p className='max-w-[360px] text-sm sm:text-base md:text-lg mx-auto md:mx-0'>Built for professionals who demand the best. Superior craftsmanship and reliable performance in every project, every time.</p>
        <button
          onClick={() => {
            const event = new CustomEvent('animateToAnim3')
            window.dispatchEvent(event)
            const hideEvent = new CustomEvent('hideSections')
            window.dispatchEvent(hideEvent)
            setOnCustomizerScreen(true)
          }}
          className="bg-black w-fit h-fit px-4 sm:px-6 py-2 rounded-full text-xs text-white font-light cursor-pointer hover:bg-gray-800 transition-colors mt-4 mx-auto md:mx-0"
        >
          Customize
        </button>
        </div>
        </div>
      </div>

    </div>
  )
} 