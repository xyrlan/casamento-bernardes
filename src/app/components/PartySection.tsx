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

// Componente para controle de áudio
const DiscoAudioPlayer = ({ 
  isVisible, 
  hasAudioPermission 
}: { 
  isVisible: boolean; 
  hasAudioPermission: boolean;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Atualizar duração quando o áudio carregar
    const handleLoadedMetadata = () => {
      console.log('Duração carregada:', audio.duration);
      setDuration(audio.duration || 0);
    };

    // Atualizar progresso e tempo durante a reprodução
    const handleTimeUpdate = () => {
      const current = audio.currentTime;
      const total = audio.duration;
      
      setCurrentTime(current);
      
      if (total > 0) {
        setProgress((current / total) * 100);
      }
    };

    // Eventos para garantir que a duração seja capturada
    const handleCanPlay = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleDurationChange = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    // Tentar tocar automaticamente quando se torna visível e tem permissão
    const tryAutoPlay = async () => {
      if (isVisible && hasAudioPermission) {
        try {
          await audio.play();
          setIsPlaying(true);
        } catch (error) {
          console.log('Autoplay bloqueado pelo navegador');
          setIsPlaying(false);
        }
      }
    };

    // Adicionar múltiplos listeners para garantir que a duração seja capturada
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('durationchange', handleDurationChange);
    audio.addEventListener('timeupdate', handleTimeUpdate);

    if (isVisible && hasAudioPermission) {
      tryAutoPlay();
    }

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('durationchange', handleDurationChange);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [isVisible, hasAudioPermission]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log('Erro ao reproduzir áudio:', error);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || time === 0) return '0:00';
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="absolute top-8 right-8 z-50"
    >
      <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl p-4 shadow-2xl min-w-[280px]">

        {/* Cabeçalho com informações da música */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center bg-white/5">
            <Music className="text-white/70" size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className={`text-white text-sm font-medium truncate ${script.className}`}>
              I Love You Baby
            </h4>
            <p className={`text-white/60 text-xs truncate ${elegant.className}`}>
              Frank Sinatra
            </p>
          </div>
        </div>

        {/* Barra de progresso */}
        <div className="mb-3">
          <div className="w-full bg-white/20 rounded-full h-1.5 mb-2">
            <div
              className="bg-gradient-to-r from-rose-400 to-rose-300 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-white/60">
            <span>{formatTime(currentTime)}</span>
            <span>{duration > 0 ? formatTime(duration) : '--:--'}</span>
          </div>
        </div>

        {/* Controles */}
        <div className="flex justify-center">
          <motion.button
            onClick={togglePlay}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-rose-500 to-rose-400 text-white flex items-center justify-center shadow-lg hover:from-rose-400 hover:to-rose-300 transition-all duration-300"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
          </motion.button>
        </div>
      </div>

      <audio
        ref={audioRef}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        {/* Você precisará adicionar o arquivo de áudio na pasta public */}
        <source src="/i-love-you-baby.mp3" type="audio/mpeg" />
        <source src="/i-love-you-baby.ogg" type="audio/ogg" />
      </audio>
    </motion.div>
  );
};

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
  const photo1Opacity = useTransform(scrollYProgress, [0.5, 0.54, 0.56], [0, 1, 0]);
  const photo1Scale = useTransform(scrollYProgress, [0.5, 0.54], [0.8, 1]);
  const photo1Y = useTransform(scrollYProgress, [0.5, 0.54], [30, 0]);

  // Foto 2  
  const photo2Opacity = useTransform(scrollYProgress, [0.56, 0.6, 0.62], [0, 1, 0]);
  const photo2Scale = useTransform(scrollYProgress, [0.56, 0.6], [0.8, 1]);
  const photo2Y = useTransform(scrollYProgress, [0.56, 0.6], [30, 0]);

  // Foto 3
  const photo3Opacity = useTransform(scrollYProgress, [0.62, 0.66, 0.68], [0, 1, 0]);
  const photo3Scale = useTransform(scrollYProgress, [0.62, 0.66], [0.8, 1]);
  const photo3Y = useTransform(scrollYProgress, [0.62, 0.66], [30, 0]);

  // Foto 4
  const photo4Opacity = useTransform(scrollYProgress, [0.68, 0.72, 0.74], [0, 1, 0]);
  const photo4Scale = useTransform(scrollYProgress, [0.68, 0.72], [0.8, 1]);
  const photo4Y = useTransform(scrollYProgress, [0.68, 0.72], [30, 0]);

  // Foto 5
  const photo5Opacity = useTransform(scrollYProgress, [0.74, 0.78, 0.8], [0, 1, 0]);
  const photo5Scale = useTransform(scrollYProgress, [0.74, 0.78], [0.8, 1]);
  const photo5Y = useTransform(scrollYProgress, [0.74, 0.78], [30, 0]);

  // Foto 6 (última permanece visível)
  const photo6Opacity = useTransform(scrollYProgress, [0.8, 0.84, 0.86], [0, 1, 1]);
  const photo6Scale = useTransform(scrollYProgress, [0.8, 0.84], [0.8, 1]);
  const photo6Y = useTransform(scrollYProgress, [0.8, 0.84], [30, 0]);

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

                 <motion.div
           style={{
             opacity: playerOpacity
           }}
           className="absolute inset-0 flex items-center justify-center"
         >
           <DiscoAudioPlayer isVisible={true} hasAudioPermission={hasAudioPermission} />
         </motion.div>

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

        {/* Disco Spline - Animação para se encaixar perfeitamente no player */}
        <motion.div
          style={{
            scale: discoScale,
            x: discoX,
            y: discoY,
            opacity: discoOpacity
          }}
          className="absolute flex items-center justify-center"
        >
          <div className="relative">
            {/* Glow effect atrás do disco */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-gradient-radial from-rose-400/40 via-purple-400/30 to-transparent rounded-full blur-3xl"
            />

            <div className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px]">
              <Spline scene="https://prod.spline.design/izhCP-LKVLxojqDU/scene.splinecode" />
            </div>
          </div>
        </motion.div>

        {/* Informações da música */}
        <motion.div
          style={{
            opacity: musicInfoOpacity
          }}
          className="absolute top-1/2 -translate-y-1/2 backdrop-blur-sm bg-white/10 rounded-2xl p-6 border border-white/20 shadow-xl max-w-xs"
        >
          <h3 className={`text-2xl md:text-3xl text-white mb-2 ${script.className}`}>
            Frank Sinatra
          </h3>
          <p className={`text-lg text-rose-300 flex items-center gap-2 ${elegant.className}`}>
            <Music size={16} />
            &quot;I Love You Baby&quot;
          </p>
          <div className="mt-4 h-px bg-gradient-to-r from-transparent via-rose-300/40 to-transparent" />
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

       {/* Modal de permissão de áudio */}
       <AudioPermissionModal 
         isOpen={showAudioModal}
         onAccept={handleAudioAccept}
         onDecline={handleAudioDecline}
       />
     </section>
  )
}

export default PartySection