import React from 'react'

type Props = {}

export function Header({}: Props) {
  return (
    <div className='flex justify-between bg-transparent px-12 mx-auto h-28   absolute inset-0 items-center'>
        <span className='cursor-pointer'>Drill4u.material</span>
        <button className='bg-black w-fit h-fit px-6 py-2 rounded-full text-xs text-white font-light cursor-pointer'>
      BUY NOW
    </button>
    </div>
  )
}