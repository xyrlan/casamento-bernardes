'use client'
import { useState } from "react";
import { DiscoAudioPlayer } from "./components/DiscoAudioPlayer";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { Music, Heart, X } from "lucide-react";
import { Cormorant_Garamond, Great_Vibes } from "next/font/google";
const elegant = Cormorant_Garamond({ weight: ['300', '400', '500'], subsets: ["latin"] });
const script = Great_Vibes({ weight: ['400'], subsets: ["latin"] });

const AudioPermissionModal = ({
  isOpen,
  onAccept,
  onDecline
}: {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
            onClick={onDecline}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed inset-0 flex items-center justify-center z-[101] p-4"
          >
            <div className="relative max-w-md w-full">
              {/* Efeito de brilho atrás do modal */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-gradient-radial from-rose-400/40 via-purple-400/30 to-transparent rounded-3xl blur-2xl"
              />

              <div className="relative backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
                {/* Ícone de música animado */}
                <div className="flex justify-center mb-6">
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-16 h-16 rounded-full bg-gradient-to-r from-rose-500 to-rose-400 flex items-center justify-center shadow-xl"
                  >
                    <Music className="text-white" size={32} />
                  </motion.div>
                </div>

                {/* Título */}
                <h2 className={`text-3xl md:text-4xl text-white text-center mb-4 ${script.className}`}>
                  Experiência Musical
                </h2>

                {/* Descrição */}
                <div className="text-center mb-8">
                  <p className={`text-white/90 text-lg leading-relaxed mb-4 ${elegant.className}`}>
                    Nosso site possui uma trilha sonora especial com{' '}
                    <span className={`text-rose-300 ${script.className} text-xl`}>
                      &quot;I Love You Baby&quot;
                    </span>{' '}
                    do Frank Sinatra.
                  </p>

                  <p className={`text-white/70 text-base ${elegant.className}`}>
                    Gostaria de ativar a música para uma experiência mais envolvente?
                  </p>
                </div>

                {/* Botões */}
                <div className="flex gap-4 justify-center">
                  <motion.button
                    onClick={onDecline}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-white/10 border border-white/30 rounded-2xl text-white/80 hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
                  >
                    <X size={16} />
                    <span className={elegant.className}>Não, obrigado</span>
                  </motion.button>

                  <motion.button
                    onClick={onAccept}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-rose-500 to-rose-400 rounded-2xl text-white font-medium shadow-lg hover:from-rose-400 hover:to-rose-300 transition-all duration-300 flex items-center gap-2"
                  >
                    <Heart size={16} />
                    <span className={elegant.className}>Sim, ativar música</span>
                  </motion.button>
                </div>

                {/* Nota pequena */}
                <p className={`text-white/50 text-xs text-center mt-4 ${elegant.className}`}>
                  Você pode controlar a música a qualquer momento
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default function Template({ children }: { children: React.ReactNode }) {
  // const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
  // const [visible, setVisible] = useState<boolean>(true);
  // const [isNavbarAtTop, setIsNavbarAtTop] = useState<boolean>(true);
  const [showAudioModal, setShowAudioModal] = useState(true);
  const [hasAudioPermission, setHasAudioPermission] = useState(false);

  const handleAudioAccept = () => {
    setHasAudioPermission(true);
    setShowAudioModal(false);
  };

  const handleAudioDecline = () => {
    setHasAudioPermission(false);
    setShowAudioModal(false);
  };

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollPos = window.scrollY;
  //     setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
  //     setPrevScrollPos(currentScrollPos);
  //     setIsNavbarAtTop(currentScrollPos === 0);
  //   };

  //   if (typeof window !== 'undefined') {
  //     window.addEventListener('scroll', handleScroll);

  //     return () => window.removeEventListener('scroll', handleScroll);
  //   }
  // }, [prevScrollPos, visible]);

  return (
    <>
      {/* <Navbar visible={visible} isNavbarAtTop={isNavbarAtTop} /> */}
      <DiscoAudioPlayer isVisible={true} hasAudioPermission={hasAudioPermission} />
      <AudioPermissionModal
        isOpen={showAudioModal}
        onAccept={handleAudioAccept}
        onDecline={handleAudioDecline}
      />
      {children}
    </>
  )
}