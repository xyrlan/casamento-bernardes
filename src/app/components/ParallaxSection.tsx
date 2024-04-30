import React from 'react'
import { ParallaxImages } from './ParallaxImages'

function ParallaxSection() {
  return (
    <section id='paralax' className='py-20'>
      <div className='my-20 px-20'>
        <h2></h2>
        <p className="text-lg 2xl:text-xl max-w-xl 2xl:max-w-2xl mt-10 tracking-tight text-white/70">Débora, irmã de Erica, possui um talento notável para organizar eventos. Surpreendentemente, ela foi responsável por planejar o casamento com apenas uma semana e meia de antecedência e conseguiu que tudo fosse perfeito e uma noite mágica e inesquecivel para nós</p>
      </div>
      <ParallaxImages baseVelocity={5} />
    </section>
  )
}

export default ParallaxSection