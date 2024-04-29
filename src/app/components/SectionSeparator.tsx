'use client'
import Image from 'next/image'
import React from 'react'
import { motion, useScroll } from "framer-motion"


const SectionSeparator = () => {

  return (
      <div className='flex justify-center my-5 absolute left-1/2 -translate-x-1/2 -bottom-16 max-sm:-bottom-12'>
        <Image src="/undernames.png" alt="budget" width={300} height={300} className='' />
      </div>
  )
}

export default SectionSeparator