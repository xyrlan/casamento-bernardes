'use client'
import Spline from '@splinetool/react-spline';
import { useScroll, motion, useTransform } from 'framer-motion';
import { Music } from 'lucide-react';
import { Kristi } from 'next/font/google';
import Image from 'next/image'
import React, { useRef } from 'react'

const dancing = Kristi({ weight: ['400'], subsets: ["latin"] });

function PartySection() {

  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end']
  })
  const position = useTransform(scrollYProgress, (pos) => {
    console.log(pos)
    return pos <= 0 ? "relative" : "fixed"
  })

  const x = useTransform(scrollYProgress, [0, 0.15, 0.3], ["-100%", "50%", "100%"])
  const topTitle = useTransform(scrollYProgress, [0, 0.3], ["50%", "0%"])

  // disco
  const height = useTransform(scrollYProgress, [0.3, 0.4, 0.5], [500, 250, 100])
  const width = useTransform(scrollYProgress, [0.3, 0.4, 0.5], [500, 250, 100])
  const scale = useTransform(scrollYProgress, [0.3, 0.4, 0.5], [1, 1, 0.3])
  const top = useTransform(scrollYProgress, [0.3, 0.4, 0.5], ["50%", "25%", "-10%"])
  const left = useTransform(scrollYProgress, [0.3, 0.4, 0.5], ["50%", "25%", "-5%"])
  const discoOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  // disco details
  const opacity = useTransform(scrollYProgress, [0, 0.5, 0.6], [0, 0, 1])
  const discox = useTransform(scrollYProgress, [0, 0.5, 0.6], [0, 0, -120])

  // frase 
  const opacityFrase = useTransform(scrollYProgress, [0.3, 0.6], [0, 1])


  return (


    <section ref={targetRef} className='h-[600vh] relative text-white text-center overflow-hidden'>
      <motion.div style={{ position }} className='w-full h-full top-0 flex items-center justify-center' >

        <motion.div style={{ top: topTitle }} className='absolute w-full ' >
          <h2 className={`text-9xl ${dancing.className}`}>A Festa</h2>
          {/* <p className='text-2xl text-gray-300'>A escolha da musica da dança foi I love you baby de Frank Sinatra</p> */}
        </motion.div>

        <motion.div style={{ top, left, opacity: discoOpacity }} className='absolute text-start flex items-center'>

            <motion.div style={{ scale }} className='h-[400px] w-[400px] flex-none' >
              <Spline scene=" https://prod.spline.design/izhCP-LKVLxojqDU/scene.splinecode" />
            </motion.div>
            <motion.div style={{ opacity, x: discox }} className='space-y-4 '>
              <h3>Frank Sinatra</h3>
              <p className='text-gray-400 inline-flex items-center gap-3'>I Love you baby <Music /> </p>
            </motion.div>
   
        </motion.div>

        <motion.div style={{ opacity: opacityFrase }} className='absolute justify-center items-center'>
          <p className='max-w-xs text-xl'>
            A a musica I love you baby do iluste Frank Sinatra, foi a escolhida para a nossa dança.
            Esta belissima musica marcou nosso casamento e foi o inicio de uma noite inesquecivel.
          </p>
        </motion.div>

        {/* <div className='absolute '>
          <Image src="/EricaePedro0535.jpg" alt="imagem-pedro-e-erica11" width={2000} height={1200} className='h-full w-full' />
        </div> */}
        <div className='absolute left-full'>
          <Image src="/EricaePedro0542.jpg" alt="imagem-pedro-e-erica12" width={1000} height={700} className='' />
          <Image src="/EricaePedro0552.jpg" alt="imagem-pedro-e-erica13" width={1000} height={700} className='' />
          <Image src="/EricaePedro0558.jpg" alt="imagem-pedro-e-erica14" width={1000} height={700} className='' />
          <Image src="/EricaePedro0559.jpg" alt="imagem-pedro-e-erica15" width={1000} height={700} className='' />
          <Image src="/EricaePedro0565.jpg" alt="imagem-pedro-e-erica16" width={1000} height={700} className='' />
          <Image src="/EricaePedro0580.jpg" alt="imagem-pedro-e-erica17" width={1000} height={700} className='' />
        </div>

      </motion.div>

    </section >
  )
}

export default PartySection