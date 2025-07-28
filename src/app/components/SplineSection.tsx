'use client'
import Image from 'next/image'
import React, { useRef } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { Great_Vibes } from "next/font/google";
import PhotosSection from './PhotosSection';

const script = Great_Vibes({ weight: ['400'], subsets: ["latin"] });

// Componente para partículas flutuantes fixas
const FloatingParticle = ({ delay = 0, initialX = 0, initialY = 0 }: { delay?: number, initialX?: number, initialY?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: initialY + 50, x: initialX, scale: 0 }}
    animate={{ 
      opacity: [0, 0.6, 0],
      y: [initialY + 50, initialY - 100, initialY - 200],
      x: initialX + Math.sin(delay) * 20,
      scale: [0, 1, 0],
      rotate: [0, 180, 360]
    }}
    transition={{
      duration: 8,
      delay,
      repeat: Number.POSITIVE_INFINITY,
      repeatDelay: Math.random() * 3,
      ease: "easeOut"
    }}
    className="absolute text-rose-200/40 pointer-events-none z-10"
  >
    <Heart size={10} fill="currentColor" />
  </motion.div>
)

// Ornamento decorativo
const Ornament = () => (
  <motion.div 
    initial={{ scaleX: 0, opacity: 0 }}
    whileInView={{ scaleX: 1, opacity: 1 }}
    transition={{ duration: 2, ease: "easeOut" }}
    className="flex items-center gap-6 my-12"
  >
    <div className="h-px bg-gradient-to-r from-transparent via-rose-300/40 to-transparent flex-1" />
    <motion.div 
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      className="text-rose-300/50"
    >
      <Sparkles size={20} />
    </motion.div>
    <div className="h-px bg-gradient-to-r from-transparent via-rose-300/40 to-transparent flex-1" />
  </motion.div>
)

const SplineSection = () => {
  const targetRef = useRef<HTMLDivElement>(null)
  const heartRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start']
  })

  const { scrollYProgress: heartProgress } = useScroll({
    target: heartRef,
    offset: ['start end', 'end start']
  })

  // Animações de parallax e transformações
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 1, 0.8, 0.3])
  const scale = useTransform(heartProgress, [0, 0.5, 1], [0.8, 1.2, 0.9])
  const rotate = useTransform(heartProgress, [0, 1], [0, 5])

  return (
    <div ref={targetRef} className='relative z-10'>
      
      {/* Partículas flutuantes fixas que ficam no fundo durante todo o scroll */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Grid de partículas espalhadas pela tela */}
        <FloatingParticle delay={0} initialX={100} initialY={100} />
        <FloatingParticle delay={0.5} initialX={300} initialY={50} />
        <FloatingParticle delay={1} initialX={500} initialY={150} />
        <FloatingParticle delay={1.5} initialX={700} initialY={80} />
        <FloatingParticle delay={2} initialX={900} initialY={120} />
        <FloatingParticle delay={2.5} initialX={150} initialY={300} />
        <FloatingParticle delay={3} initialX={350} initialY={250} />
        <FloatingParticle delay={3.5} initialX={550} initialY={350} />
        <FloatingParticle delay={4} initialX={750} initialY={280} />
        <FloatingParticle delay={4.5} initialX={950} initialY={320} />
        <FloatingParticle delay={5} initialX={200} initialY={500} />
        <FloatingParticle delay={5.5} initialX={400} initialY={450} />
        <FloatingParticle delay={6} initialX={600} initialY={550} />
        <FloatingParticle delay={6.5} initialX={800} initialY={480} />
        <FloatingParticle delay={7} initialX={1000} initialY={520} />
      </div>

      {/* Seção do coração */}
      <motion.div 
        style={{ y, opacity }}
        className='relative z-20 flex flex-col items-center pb-20 px-4'
      >
        {/* Ornamento superior */}
        <Ornament />

        {/* Container do coração com efeitos */}
        <motion.div 
          ref={heartRef}
          style={{ scale, rotate }}
          className='relative mb-16'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Glow effect atrás do coração */}
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 3, 
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-rose-400/20 rounded-full blur-xl"
          />
          
          {/* Coração principal */}
          <motion.div
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.3 }
            }}
            className="relative backdrop-blur-sm bg-white/5 rounded-full p-8 border border-white/20 shadow-2xl"
          >
            <Image 
              src='/heart.png' 
              alt="coração decorativo" 
              width={500} 
              height={250} 
              className='h-20 md:h-28 w-auto drop-shadow-2xl' 
              priority
            />
          </motion.div>

          {/* Elementos decorativos ao redor do coração */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute -top-4 -left-4 text-rose-300/40"
          >
            <Heart size={16} fill="currentColor" />
          </motion.div>
          
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute -bottom-4 -right-4 text-rose-300/40"
          >
            <Sparkles size={14} />
          </motion.div>
          
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute top-1/2 -right-8 text-rose-300/30"
          >
            <Heart size={12} fill="currentColor" />
          </motion.div>
          
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 22, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute top-1/2 -left-8 text-rose-300/30"
          >
            <Sparkles size={12} />
          </motion.div>
        </motion.div>

        {/* Ornamento inferior */}
        <Ornament />
      </motion.div>

      {/* PhotosSection com z-index alto para ficar acima das partículas */}
      <div className="relative z-10">
        <PhotosSection />
      </div>
    </div>
  )
}

export default SplineSection