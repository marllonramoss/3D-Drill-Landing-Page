import React from 'react'

type Props = {}

export function Footer({}: Props) {
  return (
    <div className='flex justify-center items-center bg-black w-full h-48 absolute bottom-0'>
            <button className='bg-white w-fit h-fit px-6 py-2 rounded-full text-xs text-black font-light'>
      BACK TO TOP
    </button>
    </div>
  )
}