'use client'
import Image from 'next/image'
import React from 'react'
import { motion, useScroll } from "framer-motion"
import { Dancing_Script, Fraunces, Kristi } from "next/font/google";

const dancing = Kristi({ weight: ['400'], subsets: ["latin"] });



const HeroSection = () => {
  return (
    <div id='home' className="min-h-screen relative">

      <Image src="/EricaePedro0031-2.jpg" alt="logo" width={2000} height={2000} className='object-cover absolute h-full w-full' priority />
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}
        className='flex flex-col items-center justify-center h-full w-full to-transparent from-white absolute bg-gradient-radial' />
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1 }}
        className='flex flex-col items-center justify-center h-full w-full to-white from-transparent from-70% absolute bg-gradient-radial' />
      <div className='flex flex-col justify-center items-center h-full w-full absolute'>
        <h1 className={`md:text-8xl text-6xl text-gray-800 my-2 font-extralight ${dancing.className}`}>Pedro & Erica</h1>
        <h2 className='md:text-xl text-sm text-gray-800 my-2 font-medium'>10 DE JULHO, 2023 - SEMPRE</h2>
        <Image src="/undernames.png" alt="budget" width={300} height={300} className='' />
      </div>
    </div>
  )
}

export default HeroSection