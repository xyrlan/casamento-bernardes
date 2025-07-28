'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Cormorant_Garamond, Great_Vibes } from "next/font/google"
import { ParallaxImages } from './ParallaxImages'

const elegant = Cormorant_Garamond({ weight: ['300', '400', '500'], subsets: ["latin"] });
const script = Great_Vibes({ weight: ['400'], subsets: ["latin"] });

function ParallaxSection() {
  return (
    <section id='parallax' className='py-20 md:py-32'>
      
      {/* Seção de texto */}
      <motion.div 
        className='mb-20 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto'
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {/* Título da seção */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl md:text-5xl lg:text-6xl text-white mb-4 font-light ${elegant.className}`}>
            Uma Semana
            <span className={`block text-rose-300 ${script.className} text-4xl md:text-6xl lg:text-7xl mt-2`}>
              Mágica
            </span>
          </h2>
        </motion.div>

        {/* Texto principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 md:p-12 border border-white/10 shadow-2xl max-w-4xl mx-auto">
            <p className={`text-lg md:text-xl lg:text-2xl leading-relaxed text-white/90 font-light ${elegant.className}`}>
              <span className={`text-rose-300 ${script.className} text-2xl md:text-3xl`}>Débora</span>, 
              irmã de Erica, possui um talento notável para organizar eventos. Surpreendentemente, ela foi responsável por planejar nosso casamento com apenas{' '}
              <span className="text-rose-300 font-medium">uma semana e meia de antecedência</span>{' '}
              e conseguiu que tudo fosse perfeito, criando uma{' '}
              <span className={`text-rose-300 ${script.className} text-2xl md:text-3xl`}>
                noite mágica e inesquecível
              </span>{' '}
              para nós.
            </p>
          </div>
        </motion.div>

        {/* Ornamento decorativo */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <div className="flex items-center gap-4">
            <div className="h-px bg-gradient-to-r from-transparent via-rose-300/40 to-transparent w-16" />
            <div className="w-2 h-2 bg-rose-300/60 rounded-full" />
            <div className="h-px bg-gradient-to-r from-transparent via-rose-300/40 to-transparent w-16" />
          </div>
        </motion.div>
      </motion.div>

      {/* Seção de imagens parallax */}
      <ParallaxImages baseVelocity={150} />
    </section>
  )
}

export default ParallaxSection