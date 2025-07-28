import Image from 'next/image'
import React from 'react'
import { Cormorant_Garamond, Great_Vibes } from "next/font/google"

const elegant = Cormorant_Garamond({ weight: ['300', '400', '500'], subsets: ["latin"] });
const script = Great_Vibes({ weight: ['400'], subsets: ["latin"] });

const PhotosSection = () => {
  return (
    <div className='flex flex-col gap-40 px-6 md:px-20 pb-40 z-10'>

      {/* Seção 1 - Primeiro Beijo */}
      <div className='z-10 flex flex-col md:flex-row items-center justify-between gap-8'>
        <div className='relative border-8 border-white/10 border-opacity-20 backdrop-blur-lg overflow-hidden group w-full md:w-fit md:max-2xl:w-[50%] shadow shadow-white/20 rounded-lg'>
          <Image src="/EricaePedro0023.jpg" alt="Pedro e Erica primeiro beijo" width={1000} height={700} className='absolute group-hover:opacity-0 duration-300 transition-all group-hover:-translate-x-40' priority />
          <Image src="/EricaePedro0040.jpg" alt="Pedro e Erica momento romântico" width={1000} height={700} className='transition-all duration-300' />
          
          {/* Efeito de brilho no hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 bg-gradient-to-tl from-rose-200/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className='text-white flex items-center justify-center flex-grow'>
          <div className='max-w-md text-center backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10'>
            <p className={`text-lg md:text-xl leading-relaxed ${elegant.className}`}>
              Nosso primeiro beijo aconteceu no dia{' '}
              <span className={`text-rose-300 ${script.className} text-2xl`}>
                10 de julho de 2016
              </span>
              , e coincidentemente nos casamos exatamente{' '}
              <span className="text-rose-300 font-medium">7 anos depois</span>{' '}
              no mesmo dia mágico de 2023.
            </p>
          </div>
        </div>
      </div>

      {/* Seção 2 - Primeiro Encontro */}
      <div className='z-10 flex flex-col md:flex-row-reverse items-center justify-between gap-8'>
        <div className='relative border-8 border-white/10 border-opacity-20 backdrop-blur-lg overflow-hidden group w-full md:w-fit md:max-2xl:w-[60%] shadow shadow-white/20 rounded-lg'>
          <Image src="/EricaePedro0047.jpg" alt="Pedro e Erica primeiro encontro" width={800} height={600} className='absolute group-hover:opacity-0 duration-300 transition-all group-hover:translate-x-40' priority />
          <Image src="/EricaePedro0041.jpg" alt="Pedro e Erica momentos especiais" width={800} height={600} className='transition-all duration-300' />
          
          {/* Efeito de brilho no hover */}
          <div className="absolute inset-0 bg-gradient-to-bl from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 bg-gradient-to-tr from-rose-200/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className='text-white flex items-center justify-center flex-grow'>
          <div className='max-w-md text-center backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10'>
            <p className={`text-lg md:text-xl leading-relaxed ${elegant.className}`}>
              Nosso primeiro encontro foi{' '}
              <span className={`text-rose-300 ${script.className} text-2xl`}>
                mágico e inesquecível
              </span>
              . Desde aquele momento soubemos que algo muito especial estava nascendo entre nós.
            </p>
          </div>
        </div>
      </div>

      {/* Seção 3 - Momentos de Crescimento */}
      <div className='z-10 flex flex-col md:flex-row items-center justify-around gap-8'>
        <div className='z-10 relative w-full md:w-fit border-8 border-white/10 border-opacity-20 backdrop-blur-lg overflow-hidden group shadow shadow-white/20 rounded-lg'>
          <Image src="/EricaePedro0013.jpg" alt="Pedro e Erica crescimento do relacionamento" width={400} height={600} className='absolute group-hover:opacity-0 duration-300 transition-all group-hover:-translate-x-40' priority />
          <Image src="/EricaePedro0006.jpg" alt="Pedro e Erica momentos íntimos" width={400} height={600} className='transition-all duration-300' />
          
          {/* Efeito de brilho no hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 bg-gradient-to-tl from-rose-200/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className='text-white flex items-center justify-center'>
          <div className='max-w-md text-center backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10'>
            <p className={`text-lg md:text-xl leading-relaxed ${elegant.className}`}>
              Cada momento juntos fortaleceu nosso amor. Descobrimos que{' '}
              <span className={`text-rose-300 ${script.className} text-2xl`}>
                éramos perfeitos
              </span>{' '}
              um para o outro, complementando-nos em todos os aspectos da vida.
            </p>
          </div>
        </div>
      </div>

      {/* Seção 4 - Noivado */}
      <div className='z-10 flex flex-col md:flex-row-reverse items-center justify-between gap-8'>
        <div className='z-10 relative border-8 border-white/10 border-opacity-20 backdrop-blur-lg overflow-hidden group w-full md:w-fit md:max-2xl:w-[60%] shadow shadow-white/20 rounded-lg'>
          <Image src="/EricaePedro0591.jpg" alt="Pedro e Erica pedido de casamento" width={800} height={600} className='absolute group-hover:opacity-0 duration-300 transition-all group-hover:translate-x-40' priority />
          <Image src="/EricaePedro0167.jpg" alt="Pedro e Erica noivado" width={800} height={600} className='transition-all duration-300' />
          
          {/* Efeito de brilho no hover */}
          <div className="absolute inset-0 bg-gradient-to-bl from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 bg-gradient-to-tr from-rose-200/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className='text-white flex items-center justify-center flex-grow'>
          <div className='max-w-md text-center backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10'>
            <p className={`text-lg md:text-xl leading-relaxed ${elegant.className}`}>
              O pedido de casamento foi um momento{' '}
              <span className={`text-rose-300 ${script.className} text-2xl`}>
                inesquecível
              </span>
              . Decidimos oficializar nosso amor e construir um futuro juntos sob as bênçãos de Deus.
            </p>
          </div>
        </div>
      </div>

      {/* Seção 5 - Casamento */}
      <div className='z-10 flex flex-col md:flex-row items-center justify-between gap-8'>
        <div className='z-10 relative border-8 border-white/10 border-opacity-20 backdrop-blur-lg overflow-hidden group w-full md:w-fit md:max-2xl:w-[50%] shadow shadow-white/20 rounded-lg'>
          <Image src="/EricaePedro0112.jpg" alt="Pedro e Erica dia do casamento" width={1000} height={700} className='absolute group-hover:opacity-0 duration-300 transition-all group-hover:-translate-x-40' priority />
          <Image src="/EricaePedro0156.jpg" alt="Pedro e Erica cerimônia" width={1000} height={700} className='transition-all duration-300' />
          
          {/* Efeito de brilho no hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 bg-gradient-to-tl from-rose-200/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className='text-white flex items-center justify-center flex-grow'>
          <div className='max-w-md text-center backdrop-blur-sm bg-white/5 rounded-xl p-6 border border-white/10'>
            <p className={`text-lg md:text-xl leading-relaxed ${elegant.className}`}>
              Nosso casamento foi a{' '}
              <span className={`text-rose-300 ${script.className} text-2xl`}>
                celebração perfeita
              </span>{' '}
              do nosso amor. Prometemos um ao outro amor eterno, fidelidade e companheirismo para toda a vida.
            </p>
          </div>
        </div>
      </div>

    </div>

  )
}

export default PhotosSection