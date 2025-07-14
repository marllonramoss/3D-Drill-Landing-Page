import React from 'react'

type Props = {}

export function Header({}: Props) {
  return (
    <div className='flex justify-between bg-transparent px-4 sm:px-6 md:px-8 lg:px-12 mx-auto h-20 sm:h-24 md:h-28 absolute inset-0 items-center z-50'>
        <span className='cursor-pointer text-sm sm:text-base md:text-lg font-medium'>Drill4u.material</span>
        <button className='bg-black w-fit h-fit px-4 sm:px-6 py-2 rounded-full text-xs text-white font-light cursor-pointer hover:bg-gray-800 transition-colors'>
      BUY NOW
    </button>
    </div>
  )
}