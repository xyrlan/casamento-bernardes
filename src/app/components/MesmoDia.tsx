'use client'
import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { fotos } from './photos'
import { useReduzir } from './movimento'

// De 10/07/2016 a 10/07/2023: sete anos, com o 29 de fevereiro de 2020 no meio
const DIAS = 2556

/*
  A coincidência que a história conta: o primeiro beijo e o casamento caem no
  mesmo 10 de julho, sete anos depois. A rolagem conta os dias entre as duas
  datas, e a segunda data só acende quando a conta chega lá.
*/
export default function MesmoDia() {
  const reduzir = useReduzir()
  const datasRef = useRef<HTMLDivElement>(null)
  const fotoRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({ target: datasRef, offset: ['start 0.8', 'end 0.6'] })
  const linha = useTransform(scrollYProgress, [0.08, 0.72], [0, 1])
  const dias = useTransform(scrollYProgress, [0.08, 0.72], [0, DIAS])
  const diasTexto = useTransform(dias, (v) => Math.round(v).toLocaleString('pt-BR'))
  // A segunda data acende junto com o fim da contagem
  const segunda = useTransform(scrollYProgress, [0.58, 0.72], [0.22, 1])

  const { scrollYProgress: passagem } = useScroll({ target: fotoRef, offset: ['start end', 'end start'] })
  const yFoto = useTransform(passagem, [0, 1], ['-5%', '5%'])

  return (
    <section
      aria-labelledby="mesmo-dia-titulo"
      className="relative z-10 px-[var(--margem)] py-[clamp(110px,15vw,210px)]"
    >
      <div className="mx-auto grid max-w-[1180px] items-center gap-y-14 lg:grid-cols-12 lg:gap-x-[clamp(40px,6vw,96px)]">
        <div
          ref={fotoRef}
          className="relative mx-auto aspect-[4/5] w-full max-w-[520px] overflow-hidden rounded-[18px] bg-noite-alta shadow-[var(--sombra-foto)] lg:col-span-5 lg:aspect-[2/3] lg:max-w-none"
        >
          <motion.div style={reduzir ? { y: 0 } : { y: yFoto }} className="absolute inset-x-0 -bottom-[7%] -top-[7%]">
            <Image
              src={fotos.ombro.src}
              alt={fotos.ombro.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 38vw, (min-width: 640px) 520px, 92vw"
              className="object-cover object-[50%_45%]"
            />
          </motion.div>
        </div>

        <div className="mx-auto w-full max-w-[520px] lg:col-span-7 lg:max-w-none">
          <h2 id="mesmo-dia-titulo">
            <span className="block font-display text-[clamp(30px,3.6vw,52px)] leading-[1.1] text-creme">
              Sete anos depois,
            </span>
            <span className="block font-script text-[clamp(64px,8vw,116px)] leading-[1.08] text-rosa">
              no mesmo dia
            </span>
          </h2>

          <div ref={datasRef} className="mt-[clamp(40px,5vw,64px)]">
            <p className="font-display text-[clamp(54px,7.4vw,108px)] leading-none tracking-[-0.01em] text-creme">
              10.07.2016
            </p>
            <p className="mt-3 font-display text-[clamp(19px,1.8vw,24px)] italic text-creme-suave">o primeiro beijo</p>

            <div className="flex items-center gap-5 py-[clamp(20px,2.6vw,32px)] pl-[0.35em]">
              <motion.span
                aria-hidden
                style={reduzir ? { scaleY: 1 } : { scaleY: linha }}
                className="block h-[clamp(64px,8vw,112px)] w-px origin-top bg-luz/70"
              />
              <p className="font-display text-[clamp(19px,1.8vw,24px)] italic text-creme-suave">
                {reduzir ? (
                  <span className="not-italic tabular-nums text-luz">2.556</span>
                ) : (
                  <motion.span className="not-italic tabular-nums text-luz">{diasTexto}</motion.span>
                )}{' '}
                dias depois
              </p>
            </div>

            <motion.div style={reduzir ? { opacity: 1 } : { opacity: segunda }}>
              <p className="font-display text-[clamp(54px,7.4vw,108px)] leading-none tracking-[-0.01em] text-creme">
                10.07.2023
              </p>
              <p className="mt-3 font-display text-[clamp(19px,1.8vw,24px)] italic text-creme-suave">o casamento</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
