import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { motion, useScroll } from "framer-motion"


const Navbar = ({ visible, isNavbarAtTop }: any) => {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <>
      <nav className={`w-full fixed top-0 duration-200 transition-all z-30 px-4 py-2 bg-primary ${isNavbarAtTop && !isOpen ? 'bg-opacity-40 hover:bg-opacity-100 -translate-y-0' : 'bg-opacity-100 '}`}>
        <motion.div initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Image src="/flores.png" alt="logo" width={1000} height={1000} className={`absolute md:h-[500px] w-auto md:-top-44 md:-left-64 -top-16 -left-32 -z-20 transition-all duration-1000 ${isNavbarAtTop && !isOpen ? 'bg-opacity-40 hover:bg-opacity-100 -translate-y-0 scale-100' : 'bg-opacity-100 -translate-y-10 md:-translate-y-20 scale-90 '}`} />
        </motion.div>
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image src="/logo3.png" alt="logo" width={150} height={150} className='w-auto h-12 md:h-28 bg-gradient-radial from-white to-transparent to-70% rounded-full' />
          </Link>
          <div className="">
            <button onClick={() => setIsOpen(!isOpen)} type="button" className="block text-black focus:outline-none">
              <svg className="sm:h-7 sm:w-7 h-6 w-6  text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <motion.div initial={{ x: '-100%' }}
        whileInView={{ x: '0%' }}
        transition={{ duration: 0.5 }} className={`${isOpen ? 'block' : 'hidden'} bg-primary fixed h-screen w-screen z-20 py-20 md:py-40`}>
        
    
        <div className="flex flex-col items-center space-y-4">
          <Link href="#home">
            <p className="text-gray-700 dark:text-gray-400">Home</p>
          </Link>
          <Link href="#about">
            <p className="text-gray-700 dark:text-gray-400">About</p>
          </Link>
          <Link href="#gallery">
            <p className="text-gray-700 dark:text-gray-400">Gallery</p>
          </Link>
          <Link href="#rsvp">
            <p className="text-gray-700 dark:text-gray-400">RSVP</p>
          </Link>
        </div>
      </motion.div>
    </>
  )
}

export default Navbar