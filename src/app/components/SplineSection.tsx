'use client'
import Image from 'next/image'
import React from 'react'
import Spline from '@splinetool/react-spline';




const SplineSection = () => {
  return (
    <section className='min-h-screen '>
      <Spline scene="https://prod.spline.design/4avDiOeXGW2HK-ml/scene.splinecode" />
    </section>
  )
}

export default SplineSection