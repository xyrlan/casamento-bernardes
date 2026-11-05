'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { ParallaxImages } from './ParallaxImages'
import { Varal } from './Varal'

const entrar = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const },
}

function ParallaxSection() {
  return (
    <section id='parallax' aria-labelledby="semana-titulo" className='relative z-10 pb-[clamp(60px,9vw,140px)]'>
      <div className='mx-auto max-w-[1000px] px-[var(--margem)] text-center'>
        <Varal className="mx-auto max-w-[min(440px,80vw)]" />
        <motion.h2 {...entrar} id="semana-titulo" className="mt-[clamp(40px,6vw,72px)]">
          <span className="block font-display text-[clamp(24px,3.2vw,42px)] uppercase leading-tight tracking-[0.16em] text-creme">
            Uma semana
          </span>
          <span className="mt-1 block font-script text-[clamp(68px,9.5vw,136px)] leading-[1.1] text-rosa">
            Mágica
          </span>
        </motion.h2>

        <motion.p {...entrar} className="texto-corrido mx-auto mt-[clamp(28px,4vw,48px)] max-w-[34em] text-pretty">
          <span className="destaque-script">Débora</span>, irmã de Erica, tem um talento notável para organizar
          eventos. Surpreendentemente, ela planejou o nosso casamento com apenas{' '}
          <strong>uma semana e meia de antecedência</strong> e conseguiu que tudo fosse perfeito, criando uma{' '}
          <span className="destaque-script">noite mágica e inesquecível</span> para nós.
        </motion.p>
      </div>

      <ParallaxImages baseVelocity={55} />
    </section>
  )
}

export default ParallaxSection
