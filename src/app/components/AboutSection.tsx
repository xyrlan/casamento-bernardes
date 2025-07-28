'use client'
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from 'react';
import { Heart, Sparkles, Quote } from 'lucide-react';
import { Cormorant_Garamond, Great_Vibes, Crimson_Text } from "next/font/google";

const elegant = Cormorant_Garamond({ weight: ['300', '400', '500', '600'], subsets: ["latin"] });
const script = Great_Vibes({ weight: ['400'], subsets: ["latin"] });
const serif = Crimson_Text({ weight: ['400', '600'], subsets: ["latin"] });

// Componente para ornamento decorativo
const Ornament = ({ delay = 0 }: { delay?: number }) => (
  <motion.div 
    initial={{ scaleX: 0, opacity: 0 }}
    whileInView={{ scaleX: 1, opacity: 1 }}
    transition={{ duration: 1.5, delay, ease: "easeOut" }}
    className="flex items-center gap-4 my-8"
  >
    <div className="h-px bg-gradient-to-r from-transparent via-rose-300/50 to-transparent flex-1" />
    <motion.div 
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      className="text-rose-300/60"
    >
      <Sparkles size={16} />
    </motion.div>
    <div className="h-px bg-gradient-to-r from-transparent via-rose-300/50 to-transparent flex-1" />
  </motion.div>
)

// Componente para partículas flutuantes sutis
const FloatingElement = ({ delay = 0, className = "" }: { delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0 }}
    animate={{ 
      opacity: [0, 0.3, 0],
      y: [-20, -100, -180],
      scale: [0, 1, 0],
      rotate: [0, 180, 360]
    }}
    transition={{
      duration: 12,
      delay,
      repeat: Number.POSITIVE_INFINITY,
      repeatDelay: Math.random() * 5,
      ease: "easeOut"
    }}
    className={`absolute text-rose-200/20 ${className}`}
  >
    <Heart size={8} fill="currentColor" />
  </motion.div>
)

const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });



  // Transformações para parallax e efeitos
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  const frase = "O nosso amor é um testemunho de fé, e é nessa fé que decidimos construir o nosso futuro. Um casamento com alicerces na rocha, que é Deus.";
  const palavras = frase.split(" ");

  // Criando elementos flutuantes
  const floatingElements = Array.from({ length: 8 }, (_, i) => (
    <FloatingElement 
      key={i} 
      delay={i * 1.5} 
      className={`${i % 4 === 0 ? 'left-10' : i % 4 === 1 ? 'right-10' : i % 4 === 2 ? 'left-1/4' : 'right-1/4'} ${i % 2 === 0 ? 'top-20' : 'bottom-20'}`}
    />
  ));

  return (
    <section 
      ref={containerRef}
      id='about' 
      className='min-h-screen relative overflow-hidden'
    >

      
      {/* Elementos flutuantes */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingElements}
      </div>

      {/* Container principal */}
      <motion.div 
        style={{ y, opacity, scale }}
        className='relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-20 py-20'
      >
        {/* Seção superior com título e descrição */}
        <div className="max-w-6xl mx-auto w-full">
          
          {/* Ornamento superior */}
          <Ornament delay={0.2} />

          {/* Título principal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              className={`text-2xl md:text-4xl lg:text-5xl text-white mb-6 font-light tracking-wide ${elegant.className}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              viewport={{ once: true }}
            >
              UMA UNIÃO EDIFICADA
              <motion.span 
                className={`block text-rose-300 ${script.className} text-3xl md:text-5xl lg:text-6xl mt-2`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
              >
                na Rocha
              </motion.span>
            </motion.h2>
            
            {/* Ícone decorativo */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
              className="flex justify-center"
              viewport={{ once: true }}
            >
              <div className="text-rose-300/60 bg-white/5 rounded-full p-4 backdrop-blur-sm border border-white/10">
                <Heart size={24} fill="currentColor" />
              </div>
            </motion.div>
          </motion.div>

          {/* Texto descritivo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto mb-20"
          >
            <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-8 md:p-12 border border-white/10 shadow-2xl">
              <Quote className="text-rose-300/60 mx-auto mb-6" size={32} />
              <p className={`text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed font-light ${serif.className}`}>
                Desde o início, nosso relacionamento foi mais do que apenas a união de dois corações; foi a junção de duas almas chamadas a construir uma vida juntas sob a bênção divina. Conhecemo-nos por acaso, mas desde aquele momento, cada passo que demos juntos nos trouxe para mais perto não apenas um do outro, mas também de Deus.
              </p>
            </div>
          </motion.div>

          {/* Ornamento central */}
          <Ornament delay={1.4} />
        </div>

        {/* Seção da citação com animação de scroll */}
        <motion.div 
          ref={targetRef}
          className='max-w-5xl mx-auto w-full mt-20'
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-center md:text-right">
            <motion.div 
              className={`text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-tight text-white ${elegant.className}`}
              style={{ textShadow: '0 0 30px rgba(0,0,0,0.5)' }}
            >
              {palavras.map((palavra, index) => {
                // Usando apenas animação de entrada sequencial simples
                return (
                  <motion.span 
                    key={index}
                    className='inline-block mr-3 md:mr-4'
                    initial={{ opacity: 0, filter: 'blur(8px)', y: 20 }}
                    whileInView={{ 
                      opacity: 1, 
                      filter: 'blur(0px)', 
                      y: 0,
                      transition: { 
                        delay: index * 0.1,
                        duration: 0.6,
                        ease: "easeOut"
                      }
                    }}
                    viewport={{ once: true, amount: 0.1 }}
                  >
                    {palavra.toUpperCase()}
                  </motion.span>
                );
              })}
            </motion.div>
            
            {/* Linha decorativa */}
            <motion.div 
              className="h-1 bg-gradient-to-r from-transparent via-rose-300 to-transparent mt-8 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 2, delay: 1, ease: "easeOut" }}
              style={{ transformOrigin: 'left' }}
              viewport={{ once: true }}
            />
          </div>
        </motion.div>

        {/* Ornamento inferior */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="mt-20"
        >
          <Ornament delay={0} />
        </motion.div>

        {/* Elementos decorativos de canto */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 2.2, type: "spring" }}
          className="absolute top-10 left-10 text-white/20"
        >
          <Heart size={20} fill="currentColor" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 2.4, type: "spring" }}
          className="absolute top-10 right-10 text-white/20"
        >
          <Sparkles size={18} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 2.6, type: "spring" }}
          className="absolute bottom-10 left-10 text-white/20 hidden md:block"
        >
          <Heart size={16} fill="currentColor" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 2.8, type: "spring" }}
          className="absolute bottom-10 right-10 text-white/20 hidden md:block"
        >
          <Sparkles size={16} />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default AboutSection;