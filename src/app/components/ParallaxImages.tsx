'use client'
import { useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity, motion } from "framer-motion";
import { useRef, useState, useMemo, useCallback } from "react";
import { wrap } from "@motionone/utils";
import Image from "next/image";
import { LayoutGrid, Grip } from "lucide-react";

interface ParallaxProps {
  baseVelocity: number;
}

export function ParallaxImages({ baseVelocity = 100 }: ParallaxProps) {
  const [isAligned, setIsAligned] = useState(true);
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  // Restaurando o cálculo original do carousel infinito
  const totalWidth = isAligned ? 2320 : 3780;
  const x = useTransform(baseX, (v) => `${wrap(-totalWidth, 0, v)}px`);

  const directionFactor = useRef<number>(1);
  
  // Restaurando a lógica original do movimento infinito
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // Mudança de direção baseada no scroll
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  // Otimizado: toggle mais eficiente
  const toggleAlignment = useCallback(() => {
    setIsAligned(prev => !prev);
  }, []);

  // Restaurando as imagens originais com repetição para efeito infinito
  const originalImages = [
    '/EricaePedro0149.jpg',
    '/EricaePedro0180.jpg',
    '/EricaePedro0181.jpg',
    '/EricaePedro0183.jpg',
    '/EricaePedro0185.jpg',
    '/EricaePedro0187.jpg',
    '/EricaePedro0309.jpg',
  ];

  // Duplicando as imagens para criar o efeito de carousel infinito
  const images = useMemo(() => [
    ...originalImages,
    ...originalImages, // Repetição para carousel infinito
  ], []);

  return (
    <div className="flex flex-nowrap overflow-hidden relative py-20 md:py-40 select-none">
      
      {/* Botão de toggle responsivo */}
      <motion.button
        onClick={toggleAlignment}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="absolute top-4 md:top-8 left-1/2 transform -translate-x-1/2 z-10 p-3 rounded-full backdrop-blur-sm bg-white/10 border border-white/20 transition-all duration-300 hover:bg-white/20"
      >
        {isAligned ? (
          <LayoutGrid className="text-white w-5 h-5 md:w-6 md:h-6" />
        ) : (
          <Grip className="text-rose-300 w-5 h-5 md:w-6 md:h-6" />
        )}
      </motion.button>

      {/* Container das imagens com movimento parallax infinito */}
      <motion.div 
        className="flex flex-nowrap" 
        style={{ x }}
      >
        {images.map((src, index) => {
          const isOdd = index % 2 === 1;
          return (
            <motion.div
              key={index}
              className={`
                relative flex-shrink-0 transition-all duration-500 ease-out
                ${isAligned ? 
                  'mr-4 md:mr-8' : 
                  'mr-16 md:mr-60'
                }
                ${!isAligned && isOdd ? 
                  'transform translate-y-10 md:translate-y-20' : 
                  ''
                }
                ${!isAligned && !isOdd ? 
                  'transform -translate-y-10 md:-translate-y-20' : 
                  ''
                }
              `}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            >
              <div className="relative group">
                <Image
                  src={src}
                  alt={`Momento especial do casamento ${(index % originalImages.length) + 1}`}
                  width={300}
                  height={500}
                  className="
                    border-4 md:border-8 border-white/10 
                    backdrop-blur-sm shadow-xl 
                    rounded-lg md:rounded-xl
                    transition-all duration-300
                    group-hover:border-white/30
                  "
                  priority={index < 4} // Prioridade para as primeiras 4 imagens
                  loading={index < 4 ? "eager" : "lazy"}
                />
                
                {/* Overlay sutil no hover */}
                <div className="
                  absolute inset-0 
                  bg-gradient-to-t from-rose-900/20 via-transparent to-transparent 
                  opacity-0 group-hover:opacity-100 
                  transition-opacity duration-300
                  rounded-lg md:rounded-xl
                " />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

    </div>
  )
}