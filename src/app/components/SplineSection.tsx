'use client'
import Image from 'next/image'
import React, { useRef } from 'react'
import Spline from '@splinetool/react-spline';
import { useScroll, useTransform, motion } from 'framer-motion';
import AboutSection from './AboutSection';
import PhotosSection from './PhotosSection';


const SplineSection = () => {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'start end']
  })

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  // const position = useTransform(scrollYProgress, (pos) => {
  //   console.log(pos)
  //   return pos >= 0.5 ? "sticky" : "relative"
  // })
  // console.log(position.get())


  return (
    <div ref={targetRef} className='relative z-10'>
      <motion.section className='min-h-screen h-screen sticky top-0 ' >
        <Spline scene="https://prod.spline.design/4avDiOeXGW2HK-ml/scene.splinecode" />
      </motion.section>
      <div>
        <motion.div
          initial={{ scaleX: '100%' }}
          whileInView={{ scaleX: '0%' }}
          className='origin-left'
        />
        <Image src={'/heart.png'} alt="coração" width={500} height={250} className='absolute h-28 w-auto top-0 right-1/2 translate-x-1/2' />
      </div>
      <PhotosSection />

    </div>
  )
}

export default SplineSection