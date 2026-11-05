'use client'
import { useReduzir } from './movimento';
import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion';
import PhotosSection from './PhotosSection';

/*
  A abertura da nossa história. O título é escrito à mão conforme a rolagem
  chega nele, do mesmo jeito que os nomes são escritos na abertura do site.
*/
const SplineSection = () => {
  const tituloRef = useRef<HTMLHeadingElement>(null)
  const reduzir = useReduzir()

  const { scrollYProgress } = useScroll({
    target: tituloRef,
    offset: ['start 0.95', 'start 0.4']
  })
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ['inset(-30% 104% -30% -6%)', 'inset(-30% -6% -30% -6%)']
  )

  return (
    <div className='relative z-10'>
      <section aria-labelledby="historia-titulo" className="px-[var(--margem)] pt-[clamp(24px,4vw,64px)]">
        <motion.h2
          ref={tituloRef}
          id="historia-titulo"
          style={reduzir ? { clipPath: 'none' } : { clipPath }}
          className="text-center font-script text-[clamp(76px,12vw,176px)] leading-[1.1] text-creme"
        >
          Nossa história
        </motion.h2>
      </section>

      <PhotosSection />
    </div>
  )
}

export default SplineSection
