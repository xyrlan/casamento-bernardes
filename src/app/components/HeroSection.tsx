'use client'
import Image from 'next/image'
import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Kristi, Great_Vibes, Cormorant_Garamond } from "next/font/google";
import { Heart, Infinity, Sparkles } from 'lucide-react';

const dancing = Kristi({ weight: ['400'], subsets: ["latin"] });
const romantic = Great_Vibes({ weight: ['400'], subsets: ["latin"] });
const elegant = Cormorant_Garamond({ weight: ['300', '400', '500'], subsets: ["latin"] });

// Componente para partículas flutuantes
const FloatingParticle = ({ delay = 0 }: { delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, x: Math.random() * 100 }}
      animate={{ 
        opacity: [0, 1, 0],
        y: -100,
        x: Math.random() * 200 - 100,
        rotate: 360
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: Math.random() * 3,
        ease: "easeOut"
      }}
      className="absolute text-pink-200/20"
    >
      <Heart size={12} fill="currentColor" />
    </motion.div>
  )
}

// Ornamento decorativo
const Ornament = ({ className = "" }: { className?: string }) => (
  <motion.div 
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    transition={{ duration: 1.5, ease: "easeOut" }}
    className={`flex items-center gap-4 ${className}`}
  >
    <div className="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent flex-1" />
    <Sparkles className="text-white/60 drop-shadow-lg" size={16} />
    <div className="h-px bg-gradient-to-r from-transparent via-white/40 to-transparent flex-1" />
  </motion.div>
)

const HeroSection = () => {
  const targetRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['end end', 'end start']
  })

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const borderRadius = useTransform(scrollYProgress, [0, 0.8], ["0%" , "80%"])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])

  useEffect(() => {
    setMounted(true)
  }, [])

  // Criando partículas com delays diferentes
  const particles = Array.from({ length: 12 }, (_, i) => (
    <FloatingParticle key={i} delay={i * 0.5} />
  ))

  return (
    <motion.section 
      ref={targetRef} 
      style={{ 
        borderBottomLeftRadius: borderRadius, 
        borderBottomRightRadius: borderRadius,
        scale 
      }} 
      className="min-h-screen relative overflow-hidden"
      aria-label="Seção principal do casamento"
    >
      {/* Imagem de fundo com parallax */}
      <motion.div style={{ scale }} className="absolute inset-0">
        <Image 
          src="/EricaePedro0031-2.jpg"  
          alt="Foto romântica de Pedro e Erica" 
          width={2000} 
          height={2000} 
          className='object-cover h-full w-full' 
          priority 
        />
      </motion.div>
      
      {/* Overlay escuro para melhor contraste */}
      <div className='absolute inset-0 bg-black/30' />
      <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-black/30' />
      <div className='absolute inset-0 bg-gradient-radial from-transparent via-black/10 to-black/40' />
      
      {/* Partículas flutuantes */}
      <AnimatePresence>
        {mounted && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {particles}
          </div>
        )}
      </AnimatePresence>
      
      {/* Conteúdo principal */}
      <div className='flex flex-col justify-center items-center h-full w-full absolute z-10 px-4'>
        
        {/* Container com fundo blur para o conteúdo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="backdrop-blur-sm bg-white/10 rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl max-w-4xl w-full"
        >
          {/* Ornamento superior */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="mb-8 w-64 mx-auto"
          >
            <Ornament />
          </motion.div>

          {/* Citação romântica */}
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            viewport={{ once: true }}
            className={`text-center mb-8 ${elegant.className}`}
          >
            <p className="text-white text-lg md:text-xl italic font-light max-w-2xl mx-auto drop-shadow-lg">
            &quot;Duas almas que se encontraram, dois corações que se uniram,<br />
              uma história de amor que se eterniza&quot;
            </p>
          </motion.blockquote>

          {/* Nomes principais com animação sequencial */}
          <div className="text-center">
            <motion.h1 
              className={`md:text-8xl text-5xl text-white font-extralight ${dancing.className} relative drop-shadow-2xl`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              style={{
                textShadow: '0 0 30px rgba(0,0,0,0.8), 0 0 60px rgba(0,0,0,0.5)'
              }}
            >
              <motion.span
                initial={{ opacity: 0, x: -50, rotateY: -90 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 1, delay: 1.2, ease: "backOut" }}
                viewport={{ once: true }}
                className="inline-block"
              >
                Pedro
              </motion.span>
              
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.8, type: "spring" }}
                viewport={{ once: true }}
                className="mx-4 text-rose-300 inline-block drop-shadow-lg"
              >
                &
              </motion.span>
              
              <motion.span
                initial={{ opacity: 0, x: 50, rotateY: 90 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 1, delay: 2.4, ease: "backOut" }}
                viewport={{ once: true }}
                className="inline-block"
              >
                Erica
              </motion.span>
              
              {/* Efeito de brilho sutil */}
              <motion.div
                animate={{ opacity: [0, 0.2, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
              />
            </motion.h1>
          </div>

          {/* Data com elementos decorativos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3 }}
            viewport={{ once: true }}
            className="mt-8 flex flex-col items-center gap-4"
          >
            <div className={`text-center ${elegant.className}`}>
              <time 
                dateTime="2023-07-10" 
                className="text-white md:text-2xl text-lg font-medium tracking-wider drop-shadow-lg"
              >
                10 DE JULHO, 2023
              </time>
            </div>
            
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="text-rose-300 drop-shadow-lg"
              aria-hidden="true"
            >
              <Infinity size={32} />
            </motion.div>
            
            <span className='sr-only'>Amor infinito</span>
            
            <p className={`text-white/90 text-sm md:text-base ${elegant.className} font-light drop-shadow-lg`}>
              Uma celebração de amor eterno
            </p>
          </motion.div>

          {/* Ornamento inferior */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 3.5 }}
            viewport={{ once: true }}
            className="mt-8 w-64 mx-auto"
          >
            <Ornament />
          </motion.div>
        </motion.div>

        {/* Elementos decorativos de canto - fora do container blur */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 4, type: "spring" }}
          className="absolute top-8 left-8 text-white/30 drop-shadow-lg"
          viewport={{ once: true }}
        >
          <Heart size={24} fill="currentColor" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 4.2, type: "spring" }}
          className="absolute top-8 right-8 text-white/30 drop-shadow-lg"
          viewport={{ once: true }}
        >
          <Heart size={24} fill="currentColor" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 4.4, type: "spring" }}
          className="absolute bottom-8 left-8 text-white/30 drop-shadow-lg hidden md:block"
          viewport={{ once: true }}
        >
          <Sparkles size={20} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 4.6, type: "spring" }}
          className="absolute bottom-8 right-8 text-white/30 drop-shadow-lg hidden md:block"
          viewport={{ once: true }}
        >
          <Sparkles size={20} />
        </motion.div>
      </div>
    </motion.section>
  )
}

export default HeroSection