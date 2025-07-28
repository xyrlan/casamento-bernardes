import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Music, Pause, Play } from "lucide-react";
import { Cormorant_Garamond, Great_Vibes } from "next/font/google";

const elegant = Cormorant_Garamond({ weight: ['300', '400', '500'], subsets: ["latin"] });
const script = Great_Vibes({ weight: ['400'], subsets: ["latin"] });

export const DiscoAudioPlayer = ({
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
      className="fixed top-4 right-4 md:top-8 md:right-8 z-50"
    >
      <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl md:rounded-2xl p-3 md:p-4 shadow-2xl min-w-[200px] md:min-w-[280px] max-w-[280px] md:max-w-none">

        {/* Cabeçalho com informações da música - mobile otimizado */}
        <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/30 flex items-center justify-center bg-white/5">
            <Music className="text-white/70" size={14} />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className={`text-white text-xs md:text-sm font-medium truncate ${script.className}`}>
              I Love You Baby
            </h4>
            <p className={`text-white/60 text-xs truncate ${elegant.className}`}>
              Frank Sinatra
            </p>
          </div>
          <div className="flex justify-center">
            <motion.button
              onClick={togglePlay}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-rose-500 to-rose-400 text-white flex items-center justify-center shadow-lg hover:from-rose-400 hover:to-rose-300 transition-all duration-300"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
            </motion.button>
          </div>
        </div>

        {/* Barra de progresso - mobile otimizada */}
        <div className="">
          <div className="w-full bg-white/20 rounded-full h-1 md:h-1.5 mb-1 md:mb-2">
            <div
              className="bg-gradient-to-r from-rose-400 to-rose-300 h-1 md:h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-white/60">
            <span>{formatTime(currentTime)}</span>
            <span>{duration > 0 ? formatTime(duration) : '--:--'}</span>
          </div>
        </div>

        {/* Controles - mobile otimizado */}
        {/* <div className="flex justify-center">
          <motion.button
            onClick={togglePlay}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r from-rose-500 to-rose-400 text-white flex items-center justify-center shadow-lg hover:from-rose-400 hover:to-rose-300 transition-all duration-300"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
          </motion.button>
        </div> */}
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

