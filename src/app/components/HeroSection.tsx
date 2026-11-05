'use client'
import { useReduzir } from './movimento';
import Image from 'next/image'
import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from "framer-motion"
import { Infinity as Infinito } from 'lucide-react';
import { fotos } from './photos';
import { useMusica } from './Musica';

const suave = [0.22, 1, 0.36, 1] as const;

/*
  A abertura: a foto das mãos dadas sob as árvores, a frase, os nomes e a data.
  Os nomes são "escritos" (revelados da esquerda para a direita) quando o convidado
  passa pelo convite. Ao rolar, a foto se recolhe num quadro de cantos arredondados.
*/
const HeroSection = () => {
  const targetRef = useRef<HTMLElement>(null)
  const { entrou } = useMusica()
  const reduzir = useReduzir()

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start']
  })

  const recolher = useTransform(scrollYProgress, [0, 0.8], [0, 1])
  const clipPath = useTransform(recolher, (v) => `inset(${v * 4}% ${v * 4}% ${v * 4}% ${v * 4}% round ${v * 32}px)`)
  const escala = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const conteudoY = useTransform(scrollYProgress, [0, 0.7], ['0%', '-16%'])
  const conteudoOpacidade = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const aparecer = (atraso: number) => ({
    initial: { opacity: 0, y: reduzir ? 0 : 18 },
    animate: entrou ? { opacity: 1, y: 0 } : { opacity: 0, y: reduzir ? 0 : 18 },
    transition: { duration: reduzir ? 0.3 : 1.1, delay: entrou && !reduzir ? atraso : 0, ease: suave },
  })

  // Os nomes surgem como se fossem escritos, da esquerda para a direita
  const escrever = (atraso: number) => ({
    initial: { clipPath: 'inset(-30% 112% -30% -12%)' },
    animate: { clipPath: entrou ? 'inset(-30% -12% -30% -12%)' : 'inset(-30% 112% -30% -12%)' },
    transition: { duration: reduzir ? 0 : 1.2, delay: entrou && !reduzir ? atraso : 0, ease: [0.65, 0, 0.35, 1] as const },
  })

  return (
    <section
      ref={targetRef}
      aria-label="Pedro e Erica, 10 de julho de 2023"
      className="relative z-10 h-[100svh] min-h-[600px]"
    >
      <motion.div style={reduzir ? { clipPath: 'none' } : { clipPath }} className="absolute inset-0 overflow-hidden">
        <motion.div style={reduzir ? { scale: 1 } : { scale: escala }} className="absolute inset-0">
          <Image
            src={fotos.maosDadas.src}
            alt={fotos.maosDadas.alt}
            fill
            priority
            placeholder="blur"
            sizes="100vw"
            className="object-cover object-[50%_42%]"
          />
        </motion.div>
        {/* A noite sobe do pé da foto para os nomes ficarem legíveis */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,#1c1418_0%,rgba(28,20,24,0.86)_30%,rgba(28,20,24,0.42)_62%,rgba(28,20,24,0.28)_100%)]" />
      </motion.div>

      <motion.div
        style={reduzir ? { y: 0, opacity: 1 } : { y: conteudoY, opacity: conteudoOpacidade }}
        className="relative flex h-full flex-col items-center justify-end px-6 pb-[clamp(56px,10svh,120px)] text-center"
      >
        <motion.blockquote
          {...aparecer(0.15)}
          className="max-w-[32ch] text-balance font-display text-[clamp(18px,1.9vw,24px)] italic leading-snug text-creme/90"
        >
          “Duas almas que se encontraram, dois corações que se uniram, uma história de amor que se eterniza.”
        </motion.blockquote>

        <h1 className="mt-[clamp(14px,2.4svh,28px)] flex flex-col items-center font-script text-[clamp(76px,12.5vw,184px)] leading-[1.02] text-creme [text-shadow:0_2px_30px_rgba(28,20,24,0.45)] sm:block">
          <motion.span {...escrever(0.4)} className="inline-block px-[0.12em]">
            Pedro
          </motion.span>
          <motion.span
            {...aparecer(1.1)}
            className="-my-[0.18em] inline-block text-[0.62em] text-rosa sm:mx-[0.06em] sm:my-0 sm:text-[0.8em]"
          >
            &amp;
          </motion.span>
          <motion.span {...escrever(1.25)} className="inline-block px-[0.12em]">
            Erica
          </motion.span>
        </h1>

        <motion.div {...aparecer(2)} className="mt-[clamp(10px,2svh,22px)] flex items-center gap-4">
          <span aria-hidden className="h-px w-8 bg-luz/60 sm:w-14" />
          <time dateTime="2023-07-10" className="rotulo text-[14px] text-creme sm:text-[15px]">
            10 de julho de 2023
          </time>
          <span aria-hidden className="h-px w-8 bg-luz/60 sm:w-14" />
        </motion.div>

        <motion.p {...aparecer(2.25)} className="mt-3 flex items-center gap-2 text-[18px] italic text-creme-suave">
          <Infinito aria-hidden size={20} strokeWidth={1.5} className="text-rosa" />
          Uma celebração de amor eterno
        </motion.p>
      </motion.div>
    </section>
  )
}

export default HeroSection
