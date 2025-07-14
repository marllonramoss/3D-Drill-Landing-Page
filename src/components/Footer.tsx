import React from 'react'

type Props = {}

export function Footer({}: Props) {
  return (
    <div className='flex justify-center items-center bg-black w-full h-32 sm:h-40 md:h-48 absolute bottom-0 px-4'>
            <button className='bg-white w-fit h-fit px-4 sm:px-6 py-2 rounded-full text-xs text-black font-light hover:bg-gray-100 transition-colors'>
      BACK TO TOP
    </button>
    </div>
  )
}