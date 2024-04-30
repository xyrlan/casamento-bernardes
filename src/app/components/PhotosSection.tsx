import Image from 'next/image'
import React from 'react'

const PhotosSection = () => {
  return (
    <div className='flex flex-col gap-40 px-20 pb-40'>

      <div className='z-10 inline-flex justify-between'>
        <div className='relative border-8 border-white/10 border-opacity-20 backdrop-blur-lg overflow-hidden group w-fit max-2xl:w-[50%]'>
          <Image src="/EricaePedro0023.jpg" alt="imagem-pedro-e-erica1" width={1000} height={700} className='absolute group-hover:opacity-0 duration-300 transition-all group-hover:-translate-x-40 ' priority />
          <Image src="/EricaePedro0040.jpg" alt="imagem-pedro-e-erica2" width={1000} height={700} className='' />
        </div>
        <div className='text-gray-300 flex items-center justify-center flex-grow'>
          <p className='max-w-md text-center text-lg backdrop-blur-lg'>Nosso primeiro beijo aconteceu dia 10 de julho de 2016, e coincidentemente nos casamos exatamente 7 anos depois dia 10 de julho de 2023</p>
        </div>
      </div>

      <div className='z-10 inline-flex justify-between'>
        <div className='text-gray-300 flex items-center justify-center flex-grow'>
          <p className='max-w-md text-center text-lg backdrop-blur-lg'>Nosso primeiro beijo aconteceu dia 10 de julho de 2016, e coincidentemente nos casamos exatamendo 7 anos depois dia 10 de julho de 2023</p>
        </div>
        <div className='relative border-8 border-white/10 border-opacity-20 backdrop-blur-lg overflow-hidden group self-end  max-2xl:w-[60%]'>
          <Image src="/EricaePedro0047.jpg" alt="imagem-pedro-e-erica3" width={800} height={600} className='absolute group-hover:opacity-0 duration-300 transition-all group-hover:translate-x-40' priority />
          <Image src="/EricaePedro0041.jpg" alt="imagem-pedro-e-erica4" width={800} height={600} className='' />
        </div>
      </div>

      <div className='z-10 inline-flex justify-around'>
        <div className='z-10  relative w-fit border-8 border-white/10 border-opacity-20 backdrop-blur-lg overflow-hidden group'>
          <Image src="/EricaePedro0013.jpg" alt="imagem-pedro-e-erica5" width={400} height={700} className='absolute group-hover:opacity-0 duration-300 transition-all group-hover:-translate-x-40' priority />
          <Image src="/EricaePedro0014.jpg" alt="imagem-pedro-e-erica6" width={400} height={700} className='' />
        </div>
        <div className='text-gray-300 flex items-center justify-center'>
          <p className='max-w-md text-center text-lg backdrop-blur-lg'>Nosso primeiro beijo aconteceu dia 10 de julho de 2016, e coincidentemente nos casamos exatamendo 7 anos depois dia 10 de julho de 2023</p>
        </div>
      </div>

      <div className='z-10 inline-flex justify-between'>
        <div className='text-gray-300 flex items-center justify-center flex-grow'>
          <p className='max-w-md text-center text-lg backdrop-blur-lg'>Nosso primeiro beijo aconteceu dia 10 de julho de 2016, e coincidentemente nos casamos exatamendo 7 anos depois dia 10 de julho de 2023</p>
        </div>
        <div className='z-10 relative border-8 border-white/10 border-opacity-20 backdrop-blur-lg overflow-hidden group self-end max-2xl:w-[60%]'>
          <Image src="/EricaePedro0591.jpg" alt="imagem-pedro-e-erica7" width={800} height={600} className='absolute group-hover:opacity-0 duration-300 transition-all group-hover:translate-x-40' priority />
          <Image src="/EricaePedro0167.jpg" alt="imagem-pedro-e-erica8" width={800} height={600} className='' />
        </div>
      </div>

      <div className='z-10 inline-flex justify-between'>
        <div className='z-10 relative border-8 border-white/10 border-opacity-20 backdrop-blur-lg overflow-hidden group w-fit max-2xl:w-[50%]'>
          <Image src="/EricaePedro0112.jpg" alt="imagem-pedro-e-erica9" width={1000} height={700} className='absolute group-hover:opacity-0 duration-300 transition-all group-hover:-translate-x-40' priority />
          <Image src="/EricaePedro0156.jpg" alt="imagem-pedro-e-erica10" width={1000} height={700} className='' />
        </div>
        <div className='text-gray-300 flex items-center justify-center flex-grow'>
          <p className='max-w-md text-center text-lg backdrop-blur-lg'>Nosso primeiro beijo aconteceu dia 10 de julho de 2016, e coincidentemente nos casamos exatamente 7 anos depois dia 10 de julho de 2023</p>
        </div>
      </div>

    </div>

  )
}

export default PhotosSection