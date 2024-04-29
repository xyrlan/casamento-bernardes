'use client'
import Image from 'next/image'
import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from "framer-motion"
import { Dancing_Script, Fraunces, Kristi } from "next/font/google";
import { Infinity } from 'lucide-react';

const dancing = Kristi({ weight: ['400'], subsets: ["latin"] });



const HeroSection = () => {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['end end', 'end start']
  })

  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const borderRadius = useTransform(scrollYProgress, [0, 0.8], ["0%" , "80%"])

  
  return (
    <motion.section ref={targetRef} style={{ borderBottomLeftRadius: borderRadius, borderBottomRightRadius: borderRadius }} className="min-h-screen relative overflow-hidden">
      <Image src="/EricaePedro0031-2.jpg"  alt="logo" width={2000} height={2000} className='object-cover absolute h-full w-full' priority />
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}
        className='flex flex-col items-center justify-center h-full w-full absolute bg-gradient-radial from-white to-20%' />
      <div className='flex flex-col justify-center items-center h-full w-full absolute'>
        <h1 className={`md:text-9xl text-6xl text-gray-800 my-2 font-extralight ${dancing.className}`}>Pedro & Erica <span className='sr-only'>Casamento</span></h1>
        <h2 className='md:text-xl text-sm text-gray-800 my-2 font-medium inline-flex items-center gap-3'>10 DE JULHO, 2023 - <Infinity size={30} /></h2>
        <Image src="/undernames.png" alt="budget" width={300} height={300} className='select-none' />
      </div>
    </motion.section>
  )
}

export default HeroSection