'use client'
import { motion, useScroll } from "framer-motion";
import React, { useRef } from 'react';

const AboutSection = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'start end']
  });

  const frase = "O nosso amor é um testemunho de fé, e é nessa fé que decidimos construir o nosso futuro. Um casamento com alicerces na rocha, que é Deus.";
  const palavras = frase.split(" ");
  const numLetters = palavras.length;

  return (
    <motion.section ref={targetRef} id='about' className='min-h-screen text-white py-40 px-20 flex flex-col w-full'>
      <div>
        <h2 className='text-3xl'>UMA UNIÃO EDIFICADA NA ROCHA</h2>
        <p className="text-xl max-w-4xl mt-10 tracking-tight text-white/70">Desde o início, nosso relacionamento foi mais do que apenas a união de dois corações; foi a junção de duas almas chamadas a construir uma vida juntas sob a bênção divina. Conhecemo-nos por acaso, mas desde aquele momento, cada passo que demos juntos nos trouxe para mais perto não apenas um do outro, mas também de Deus.</p>
      </div>
      <motion.div className='text-end text-9xl max-w-[70%] self-end mt-20 text-balance underline underline-offset-4'>
        {palavras.map((palavra, index) => {
          const start = index / numLetters;
          const end = (index + 1) / numLetters;
          const opacity = scrollYProgress ? Math.max(0, Math.min(1, (scrollYProgress.get() - start) / (end - start))) : 0;
          return (
            <motion.span key={index} initial={{ opacity: 0 }} whileInView={{ opacity: 1  }} transition={{ delay: index * 0.01 }} className='inline-block'>
              {palavra.toUpperCase()}{index < palavras.length - 1 && '\u00A0'}
            </motion.span>
          );
        })}
      </motion.div>
    </motion.section>
  )
}

export default AboutSection;