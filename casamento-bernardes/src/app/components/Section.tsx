import Image from 'next/image'
import React from 'react'
import { motion, useScroll } from "framer-motion"

const Section = () => {
  return (
    <motion.div className=" h-[70vh] relative">
    <Image src="/EricaePedro0004.jpg" alt="logo" width={2000} height={2000} className='object-cover object-center h-full w-full' />
  </motion.div>
  )
}

export default Section