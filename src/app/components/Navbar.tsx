import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { AnimatePresence, motion, useScroll } from "framer-motion"


const Navbar = ({ visible, isNavbarAtTop }: any) => {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <>
      <nav className={`w-full fixed top-0 duration-200 transition-all z-30 px-4 py-2 bg-primary ${isNavbarAtTop && !isOpen ? 'bg-opacity-40 hover:bg-opacity-100 -translate-y-0' : 'bg-opacity-100 '}`}>
        <div className="flex justify-between items-center">
          <Link href="/">
            <Image src="/logo3.png" alt="logo" width={70} height={70} className=' bg-gradient-radial from-white to-transparent to-70% rounded-full' />
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
      <AnimatePresence>

        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            transition={{ duration: 0.5 }}
            exit={{ x: '100%' }}
            className={`bg-primary fixed h-screen w-screen z-20 py-20 md:py-40`}
          >
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
        )}

      </AnimatePresence>
    </>
  )
}

export default Navbar