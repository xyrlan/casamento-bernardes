'use client'
import Image from 'next/image'
import React, { useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { fotos, type Foto } from './photos'

type Momento = {
  titulo: string
  texto: ReactNode
  fotos: [Foto, Foto]
  retrato?: boolean
}

const momentos: Momento[] = [
  {
    titulo: 'O primeiro beijo',
    texto: (
      <>
        Nosso primeiro beijo aconteceu em <span className="destaque-script">10 de julho de 2016</span>. E,
        coincidentemente, nos casamos <strong>exatamente sete anos depois</strong>, no mesmo dia, em 2023.
      </>
    ),
    fotos: [fotos.beijoParque, fotos.caminhando],
  },
  {
    titulo: 'O primeiro encontro',
    texto: (
      <>
        Nosso primeiro encontro foi <span className="destaque-script">mágico e inesquecível</span>. Desde
        aquele momento, soubemos que algo muito especial estava nascendo entre nós.
      </>
    ),
    fotos: [fotos.flores, fotos.quadriculado],
  },
  {
    titulo: 'Crescendo juntos',
    texto: (
      <>
        Cada momento juntos fortaleceu nosso amor. Descobrimos que{' '}
        <span className="destaque-script">éramos perfeitos</span> um para o outro, complementando-nos em todos
        os aspectos da vida.
      </>
    ),
    fotos: [fotos.abraco, fotos.parque],
    retrato: true,
  },
  {
    titulo: 'O pedido',
    texto: (
      <>
        O pedido de casamento foi um momento <span className="destaque-script">inesquecível</span>. Decidimos
        oficializar nosso amor e construir um futuro juntos, sob as bênçãos de Deus.
      </>
    ),
    fotos: [fotos.salao, fotos.arcosPB],
  },
  {
    titulo: 'O casamento',
    texto: (
      <>
        Nosso casamento foi a <span className="destaque-script">celebração perfeita</span> do nosso amor.
        Prometemos um ao outro amor eterno, fidelidade e companheirismo para toda a vida.
      </>
    ),
    fotos: [fotos.janela, fotos.beijoLuzes],
  },
]

/*
  Duas fotos por momento, como no site original (onde a segunda aparecia no hover).
  Agora a segunda fica visível atrás da primeira, e trocar funciona no mouse,
  no toque e no teclado.
*/
function ParDeFotos({ par, retrato, lado }: { par: [Foto, Foto]; retrato?: boolean; lado: 1 | -1 }) {
  const [frente, setFrente] = useState(0)
  const outra = par[1 - frente]

  return (
    <div className={lado === 1 ? 'pr-[5%] lg:pr-0' : 'pl-[5%] lg:pl-0'}>
      <div
        className={`relative ${retrato ? 'aspect-[2/3]' : 'aspect-[3/2]'}`}
        // Mouse: passar por cima mostra a outra foto. Toque: tocar troca.
        onPointerEnter={(e) => e.pointerType === 'mouse' && setFrente(1)}
        onPointerLeave={(e) => e.pointerType === 'mouse' && setFrente(0)}
        onPointerUp={(e) => e.pointerType !== 'mouse' && setFrente((f) => 1 - f)}
      >
        {par.map((foto, i) => {
          const naFrente = frente === i
          return (
            <motion.figure
              key={foto.src.src}
              initial={false}
              animate={
                naFrente
                  ? { x: '0%', y: '0%', rotate: 0, scale: 1 }
                  : { x: `${lado * 6}%`, y: '-6%', rotate: lado * 3.5, scale: 0.92 }
              }
              transition={{ type: 'spring', stiffness: 160, damping: 22 }}
              style={{ zIndex: naFrente ? 2 : 1 }}
              className="absolute inset-0 overflow-hidden rounded-[14px] bg-noite-alta shadow-[var(--sombra-foto)]"
            >
              <Image
                src={foto.src}
                alt={naFrente ? foto.alt : ''}
                fill
                placeholder="blur"
                sizes={retrato ? '(min-width: 1024px) 34vw, 86vw' : '(min-width: 1024px) 56vw, 92vw'}
                className="object-cover"
              />
              <motion.span
                aria-hidden
                initial={false}
                animate={{ opacity: naFrente ? 0 : 0.5 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-noite"
              />
            </motion.figure>
          )
        })}
      </div>
      <button
        type="button"
        onClick={() => setFrente((f) => 1 - f)}
        aria-label={`Ver a outra foto: ${outra.alt}`}
        className={`mt-5 flex items-center gap-3 text-[15px] italic text-creme-suave transition-colors duration-200 hover:text-creme ${lado === 1 ? '' : 'ml-auto'}`}
      >
        <span aria-hidden className="flex gap-1.5">
          {[0, 1].map((i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${frente === i ? 'w-5 bg-rosa' : 'w-1.5 bg-creme/35'}`}
            />
          ))}
        </span>
        <span className="[@media(hover:hover)]:hidden">Toque na foto para ver a outra</span>
        <span className="hidden [@media(hover:hover)]:inline">Passe o mouse na foto para ver a outra</span>
      </button>
    </div>
  )
}

const PhotosSection = () => {
  return (
    <div className='flex flex-col gap-[clamp(96px,13vw,190px)] px-[var(--margem)] pb-[clamp(110px,15vw,220px)] pt-[clamp(72px,10vw,140px)]'>
      {momentos.map((m, i) => {
        const espelho = i % 2 === 1
        return (
          <article
            key={m.titulo}
            className="mx-auto grid w-full max-w-[1240px] items-center gap-y-10 lg:grid-cols-12 lg:gap-x-[clamp(32px,4vw,64px)]"
          >
            <div
              className={`${m.retrato ? 'mx-auto w-[min(100%,420px)] lg:col-span-4 lg:w-full' : 'lg:col-span-7'} ${
                espelho ? 'lg:order-2 lg:col-start-6' : ''
              } ${espelho && m.retrato ? 'lg:col-start-8' : ''}`}
            >
              <ParDeFotos par={m.fotos} retrato={m.retrato} lado={espelho ? -1 : 1} />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className={`${m.retrato ? 'lg:col-span-5' : 'lg:col-span-4'} ${
                espelho ? 'lg:order-1 lg:col-start-1' : m.retrato ? 'lg:col-start-7' : 'lg:col-start-9'
              }`}
            >
              <h3 className="text-balance font-display text-[clamp(34px,3.6vw,54px)] leading-[1.05] text-creme">
                {m.titulo}
              </h3>
              <p className="texto-corrido mt-5 max-w-[30em] text-pretty">{m.texto}</p>
            </motion.div>
          </article>
        )
      })}
    </div>
  )
}

export default PhotosSection
