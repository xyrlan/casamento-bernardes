'use client'
import { useReduzir } from './movimento';
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import React, { useRef } from 'react';
import { Varal } from "./Varal";

const suave = [0.22, 1, 0.36, 1] as const;

const frase = "O nosso amor é um testemunho de fé, e é nessa fé que decidimos construir o nosso futuro. Um casamento com alicerces na rocha, que é Deus.";
const palavras = frase.split(" ");
// "na rocha, que é Deus." ganha a cor e o itálico
const inicioDestaque = palavras.indexOf("rocha,") - 1;

/* Cada palavra acende conforme a rolagem passa por ela */
function Palavra({
  children,
  progresso,
  inicio,
  fim,
  destaque,
}: {
  children: string;
  progresso: MotionValue<number>;
  inicio: number;
  fim: number;
  destaque: boolean;
}) {
  const opacity = useTransform(progresso, [inicio, fim], [0.16, 1]);
  return (
    <>
      <motion.span style={{ opacity }} className={destaque ? "italic text-rosa" : undefined}>
        {children}
      </motion.span>{" "}
    </>
  );
}

const entrar = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 1, ease: suave },
};

const AboutSection = () => {
  const fraseRef = useRef<HTMLQuoteElement>(null);
  const reduzir = useReduzir();

  const { scrollYProgress } = useScroll({
    target: fraseRef,
    offset: ["start 0.85", "end 0.5"],
  });

  return (
    <section id='about' aria-labelledby="fe-titulo" className='relative z-10 px-[var(--margem)] py-[clamp(110px,15vw,220px)]'>
      <div className="mx-auto max-w-[1120px]">
        <Varal className="mx-auto max-w-[min(440px,80vw)]" />

        <motion.h2 {...entrar} id="fe-titulo" className="mt-[clamp(40px,6vw,72px)] text-center">
          <span className="block font-display text-[clamp(24px,3.2vw,42px)] uppercase leading-tight tracking-[0.16em] text-creme">
            Uma união edificada
          </span>
          <span className="mt-1 block font-script text-[clamp(68px,9.5vw,136px)] leading-[1.1] text-rosa">
            na Rocha
          </span>
        </motion.h2>

        <motion.p {...entrar} className="texto-corrido mx-auto mt-[clamp(28px,4vw,48px)] max-w-[36em] text-pretty text-center">
          Desde o início, nosso relacionamento foi mais do que a união de dois corações: foi a junção de duas
          almas chamadas a construir uma vida juntas, sob a bênção divina. Conhecemo-nos por acaso, mas, desde
          aquele momento, cada passo que demos juntos nos trouxe para mais perto não apenas um do outro, mas
          também de Deus.
        </motion.p>

        <blockquote
          ref={fraseRef}
          className="mt-[clamp(90px,13vw,180px)] max-w-[22ch] text-pretty font-display text-[clamp(36px,5.6vw,86px)] leading-[1.08] tracking-[-0.01em] text-creme"
        >
          {reduzir ? (
            <>
              {palavras.slice(0, inicioDestaque).join(" ")}{" "}
              <span className="italic text-rosa">{palavras.slice(inicioDestaque).join(" ")}</span>
            </>
          ) : (
            palavras.map((p, i) => (
              <Palavra
                key={i}
                progresso={scrollYProgress}
                inicio={i / palavras.length}
                fim={(i + 1.5) / palavras.length}
                destaque={i >= inicioDestaque}
              >
                {p}
              </Palavra>
            ))
          )}
        </blockquote>
      </div>
    </section>
  )
}

export default AboutSection;
