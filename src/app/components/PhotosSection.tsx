import Image from 'next/image'
import React from 'react'

const PhotosSection = () => {
  return (
    <div className='flex flex-col gap-40 px-20'>
      <div className='z-10 relative w-fit border-8 border-white/10 border-opacity-20 backdrop-blur-lg overflow-hidden group'>
        <Image src="/EricaePedro0023.jpg" alt="logo" width={1000} height={700} className='absolute group-hover:opacity-0 duration-300 transition-all group-hover:-translate-x-40' />
        <Image src="/EricaePedro0040.jpg" alt="logo" width={1000} height={700} className='' />
      </div>
      <div className='z-10 relative w-fit border-8 border-white/10 border-opacity-20 backdrop-blur-lg overflow-hidden group self-end'>
        <Image src="/EricaePedro0047.jpg" alt="logo" width={800} height={600} className='absolute group-hover:opacity-0 duration-300 transition-all group-hover:translate-x-40' />
        <Image src="/EricaePedro0041.jpg" alt="logo" width={800} height={600} className='' />
      </div>
      <div className='z-10 relative w-fit border-8 border-white/10 border-opacity-20 backdrop-blur-lg overflow-hidden group translate-x-[100%]'>
        <Image src="/EricaePedro0013.jpg" alt="logo" width={400} height={700} className='absolute group-hover:opacity-0 duration-300 transition-all group-hover:-translate-x-40' />
        <Image src="/EricaePedro0014.jpg" alt="logo" width={400} height={700} className='' />
      </div>
    </div>

  )
}

export default PhotosSection