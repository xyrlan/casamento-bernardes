'use client'
import Spline from '@splinetool/react-spline';
import { useScroll, motion, useTransform, AnimatePresence } from 'framer-motion';
import { Music, Volume2, VolumeX, Play, Pause, Heart, X } from 'lucide-react';
import { Cormorant_Garamond, Great_Vibes } from 'next/font/google';
import Image from 'next/image'
import React, { useRef, useEffect, useState } from 'react'

const elegant = Cormorant_Garamond({ weight: ['300', '400', '500'], subsets: ["latin"] });
const script = Great_Vibes({ weight: ['400'], subsets: ["latin"] });

// Modal para permissão de áudio


function PartySection() {
  const targetRef = useRef<HTMLDivElement>(null);

  // Estados para controle do modal de permissão de áudio
  const [showAudioModal, setShowAudioModal] = useState(true);
  const [hasAudioPermission, setHasAudioPermission] = useState(false);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end']
  });

  // Handlers para o modal de permissão
  const handleAudioAccept = () => {
    setHasAudioPermission(true);
    setShowAudioModal(false);
  };

  const handleAudioDecline = () => {
    setHasAudioPermission(false);
    setShowAudioModal(false);
  };

  // Animações do título principal
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.8]);

  // Animações do disco Spline - posicionamento preciso para encaixar no player
  const discoScale = useTransform(scrollYProgress, [0.1, 0.25, 0.4], [1, 0.4, 0.16]);
  const discoX = useTransform(scrollYProgress, [0.15, 0.4], ["0vw", "37vw"]);
  const discoY = useTransform(scrollYProgress, [0.15, 0.4], ["0vh", "-42vh"]);
  const discoOpacity = useTransform(scrollYProgress, [0, 0.1, 0.45, 0.5], [0, 1, 1, 0]);

  const playerOpacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);

  // Animações das informações da música
  const musicInfoOpacity = useTransform(scrollYProgress, [0.15, 0.3, 0.45, 0.55], [0, 1, 1, 0]);

  // Controlar quando o container deve ser fixo
  const containerPosition = useTransform(scrollYProgress, (value) => {
    return value > 0 && value <= 1 ? "fixed" : "absolute";
  });

  // Lista de fotos para exibir sequencialmente
  const photos = [
    { src: "/EricaePedro0542.jpg", alt: "Pedro e Erica na festa - momento 1" },
    { src: "/EricaePedro0552.jpg", alt: "Pedro e Erica na festa - momento 2" },
    { src: "/EricaePedro0558.jpg", alt: "Pedro e Erica na festa - momento 3" },
    { src: "/EricaePedro0559.jpg", alt: "Pedro e Erica na festa - momento 4" },
    { src: "/EricaePedro0565.jpg", alt: "Pedro e Erica na festa - momento 5" },
    { src: "/EricaePedro0580.jpg", alt: "Pedro e Erica na festa - momento 6" }
  ];

  // Animações das fotos sequenciais - cada foto individualmente
  // Foto 1
  const photo1Opacity = useTransform(scrollYProgress, [0.15, 0.25, 0.30], [0, 1, 0]);
  const photo1Scale = useTransform(scrollYProgress, [0.15, 0.25], [0.8, 1]);
  const photo1Y = useTransform(scrollYProgress, [0.15, 0.25], [30, 0]);

  // Foto 2  
  const photo2Opacity = useTransform(scrollYProgress, [0.25, 0.35, 0.40], [0, 1, 0]);
  const photo2Scale = useTransform(scrollYProgress, [0.25, 0.35], [0.8, 1]);
  const photo2Y = useTransform(scrollYProgress, [0.21, 0.25], [30, 0]);

  // Foto 3
  const photo3Opacity = useTransform(scrollYProgress, [0.35, 0.45, 0.50], [0, 1, 0]);
  const photo3Scale = useTransform(scrollYProgress, [0.35, 0.45], [0.8, 1]);
  const photo3Y = useTransform(scrollYProgress, [0.35, 0.45], [30, 0]);

  // Foto 4
  const photo4Opacity = useTransform(scrollYProgress, [0.45, 0.55, 0.60], [0, 1, 0]);
  const photo4Scale = useTransform(scrollYProgress, [0.45, 0.55], [0.8, 1]);
  const photo4Y = useTransform(scrollYProgress, [0.45, 0.55], [30, 0]);

  // Foto 5
  const photo5Opacity = useTransform(scrollYProgress, [0.55, 0.65, 0.70], [0, 1, 0]);
  const photo5Scale = useTransform(scrollYProgress, [0.55, 0.65], [0.8, 1]);
  const photo5Y = useTransform(scrollYProgress, [0.55, 0.65], [30, 0]);

  // Foto 6 (última permanece visível)
  const photo6Opacity = useTransform(scrollYProgress, [0.65, 0.75, 0.80], [0, 1, 1]);
  const photo6Scale = useTransform(scrollYProgress, [0.65, 0.75], [0.8, 1]);
  const photo6Y = useTransform(scrollYProgress, [0.65, 0.75], [30, 0]);

  // Array com todas as animações
  const photosAnimations = [
    { opacity: photo1Opacity, scale: photo1Scale, y: photo1Y },
    { opacity: photo2Opacity, scale: photo2Scale, y: photo2Y },
    { opacity: photo3Opacity, scale: photo3Scale, y: photo3Y },
    { opacity: photo4Opacity, scale: photo4Scale, y: photo4Y },
    { opacity: photo5Opacity, scale: photo5Scale, y: photo5Y },
    { opacity: photo6Opacity, scale: photo6Scale, y: photo6Y }
  ];

  // Animação do texto final
  const finalTextOpacity = useTransform(scrollYProgress, [0.88, 1], [0, 1]);
  const finalTextY = useTransform(scrollYProgress, [0.88, 1], ["50%", "0%"]);

  return (
    <section ref={targetRef} className='relative h-[1200vh] overflow-hidden'>

      {/* Container que só é fixo quando estamos na seção */}
      <motion.div
        style={{ position: containerPosition }}
        className="inset-0 flex items-center justify-center z-10 h-screen "
      >

        {/* Título principal */}
        <motion.div
          style={{
            opacity: titleOpacity,
            scale: titleScale
          }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
        >
          <div className="backdrop-blur-sm bg-white/5 rounded-3xl p-12 border border-white/10 shadow-2xl max-w-4xl">
            <h2 className={`text-6xl md:text-8xl lg:text-9xl text-white mb-6 ${script.className}`}>
              A Festa
            </h2>

            <div className="flex items-center justify-center gap-4 text-rose-300">
              <Music size={24} />
              <p className={`text-2xl md:text-3xl ${elegant.className}`}>
                Uma noite mágica ao som de Frank Sinatra
              </p>
              <Music size={24} />
            </div>
          </div>
        </motion.div>

        {/* Fotos sequenciais no centro - tamanho quase da tela */}
        {photos.map((photo, index) => {
          const { opacity, scale, y } = photosAnimations[index];

          return (
            <motion.div
              key={index}
              style={{
                opacity,
                scale,
                y
              }}
              className="absolute inset-0 flex items-center justify-center p-4 md:p-8"
            >
              <div className="relative group w-full h-full max-w-6xl max-h-[85vh]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="border-8 border-white/20 backdrop-blur-sm shadow-2xl rounded-xl transition-all duration-300 group-hover:border-white/40 group-hover:scale-[1.02] object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 95vw, (max-width: 1200px) 85vw, 80vw"
                />

                {/* Overlay com efeito de brilho no hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                <div className="absolute inset-0 bg-gradient-to-tl from-rose-200/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

                {/* Contador de foto */}
                <div className="absolute bottom-6 right-6 backdrop-blur-sm bg-black/60 rounded-full px-4 py-2 text-white text-lg font-medium border border-white/20">
                  {index + 1} / {photos.length}
                </div>

              </div>
            </motion.div>
          );
        })}

        {/* Texto final */}
        <motion.div
          style={{
            opacity: finalTextOpacity,
            y: finalTextY
          }}
          className="absolute inset-0 flex items-center justify-center px-6"
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="backdrop-blur-md bg-white/20 rounded-3xl p-12 border border-white/20 shadow-2xl">
              <p className={`text-xl md:text-2xl leading-relaxed text-white/90 font-light ${elegant.className}`}>
                A música{' '}
                <span className={`text-rose-300 ${script.className} text-2xl md:text-3xl`}>
                  &quot;I Love You Baby&quot;
                </span>{' '}
                do ilustre Frank Sinatra foi a escolhida para nossa primeira dança como marido e mulher.
                Esta belíssima canção marcou nosso casamento e foi o início de uma{' '}
                <span className={`text-rose-300 ${script.className} text-2xl md:text-3xl`}>
                  noite inesquecível
                </span>
                , repleta de amor, alegria e celebração ao lado de nossos entes queridos.
              </p>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  )
}

export default PartySection