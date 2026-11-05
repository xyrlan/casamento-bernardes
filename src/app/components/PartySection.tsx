'use client'
import { useReduzir } from './movimento';
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { Music, Pause, Play } from 'lucide-react';
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { fotos, type Foto } from './photos';
import { useMusica } from './Musica';

const festa: { foto: Foto; posicao: string }[] = [
  { foto: fotos.faiscas, posicao: 'object-[42%_50%]' },
  { foto: fotos.pista, posicao: 'object-[56%_50%]' },
  { foto: fotos.roda, posicao: 'object-[56%_50%]' },
  { foto: fotos.giro, posicao: 'object-[60%_50%]' },
  { foto: fotos.fonte, posicao: 'object-[50%_50%]' },
  { foto: fotos.coracoes, posicao: 'object-[44%_50%]' },
];

/* Onde cada foto começa a entrar, dentro da rolagem da seção (0..1) */
const INICIO = 0.1;
const PASSO = 0.145;
const ENTRADA = 0.075;
const entradaDa = (i: number) => INICIO + i * PASSO;

function FotoDaFesta({ i, progresso }: { i: number; progresso: MotionValue<number> }) {
  const { foto, posicao } = festa[i];
  const a = entradaDa(i);
  const proxima = i < festa.length - 1 ? entradaDa(i + 1) : 2;
  // Sobe de baixo, levemente girada, e assenta; quando a próxima chega, recua e escurece
  const y = useTransform(progresso, [a, a + ENTRADA], ['105vh', '0vh']);
  const rotate = useTransform(progresso, [a, a + ENTRADA], [i % 2 ? -5 : 5, 0]);
  const scale = useTransform(progresso, [proxima, proxima + ENTRADA], [1, 0.92]);
  const sombra = useTransform(progresso, [proxima, proxima + ENTRADA], [0, 0.55]);

  return (
    <motion.div style={{ y, rotate, scale }} className="absolute inset-0 flex items-center justify-center">
      <figure className="relative aspect-[4/5] w-[min(calc(100vw-2*var(--margem)),calc(70svh*0.8))] overflow-hidden rounded-[18px] bg-noite-alta shadow-[var(--sombra-foto)] sm:aspect-[3/2] sm:w-[min(calc(100vw-2*var(--margem)),1180px,calc(74svh*1.5))]">
        <Image
          src={foto.src}
          alt={foto.alt}
          fill
          placeholder="blur"
          sizes="(min-width: 640px) 82vw, 92vw"
          className={`object-cover ${posicao} sm:object-center`}
        />
        <motion.span aria-hidden style={{ opacity: sombra }} className="absolute inset-0 bg-noite" />
      </figure>
    </motion.div>
  );
}

function Titulo({ progresso }: { progresso: MotionValue<number> }) {
  const opacity = useTransform(progresso, [0.03, 0.11], [1, 0]);
  const scale = useTransform(progresso, [0.03, 0.11], [1, 0.9]);
  return (
    <motion.div style={{ opacity, scale }} className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
      <TituloConteudo />
    </motion.div>
  );
}

function TituloConteudo() {
  return (
    <>
      <h2 id="festa-titulo" className="font-script text-[clamp(96px,16vw,230px)] leading-[1.05] text-creme">
        A Festa
      </h2>
      <p className="mt-2 flex items-center gap-3 font-display text-[clamp(19px,2.2vw,28px)] italic text-creme-suave">
        <Music aria-hidden size={18} className="shrink-0 text-luz" />
        Uma noite mágica ao som de Frank Sinatra
        <Music aria-hidden size={18} className="shrink-0 text-luz" />
      </p>
    </>
  );
}

function Contador({ progresso }: { progresso: MotionValue<number> }) {
  const [atual, setAtual] = useState(0);
  const opacity = useTransform(progresso, [INICIO, INICIO + ENTRADA], [0, 1]);
  useMotionValueEvent(progresso, 'change', (v) => {
    let n = 0;
    festa.forEach((_, i) => {
      if (v >= entradaDa(i) + ENTRADA * 0.5) n = i + 1;
    });
    setAtual(n);
  });
  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-x-0 bottom-[max(18px,3svh)] flex items-center justify-center gap-4"
    >
      <span className="font-display text-[17px] tabular-nums text-creme">
        {Math.max(1, atual)} <span className="text-creme-suave">/ {festa.length}</span>
      </span>
      <span aria-hidden className="flex gap-1.5">
        {festa.map((_, i) => (
          <span
            key={i}
            className={`h-[3px] rounded-full transition-all duration-300 ${i < atual ? 'w-6 bg-rosa' : 'w-3 bg-creme/25'}`}
          />
        ))}
      </span>
    </motion.div>
  );
}

/* O fechamento: a primeira dança e o convite para ouvir a música */
function PrimeiraDanca() {
  const { tocando, alternar } = useMusica();
  return (
    <section aria-labelledby="danca-titulo" className="relative z-10 px-[var(--margem)] py-[clamp(90px,12vw,180px)]">
      <div className="mx-auto grid max-w-[1180px] items-center gap-y-12 lg:grid-cols-12 lg:gap-x-[clamp(32px,4vw,64px)]">
        <motion.figure
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/5] overflow-hidden rounded-[18px] shadow-[var(--sombra-foto)] sm:aspect-[3/2] lg:col-span-7"
        >
          <Image
            src={fotos.primeiraDanca.src}
            alt={fotos.primeiraDanca.alt}
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 56vw, 92vw"
            className="object-cover object-[52%_50%]"
          />
        </motion.figure>
        <div className="lg:col-span-5">
          <h2 id="danca-titulo" className="font-display text-[clamp(34px,3.6vw,54px)] leading-[1.05] text-creme">
            A primeira dança
          </h2>
          <p className="texto-corrido mt-5 text-pretty">
            A música <span className="destaque-script">I Love You Baby</span>, do ilustre Frank Sinatra, foi a
            escolhida para a nossa primeira dança como marido e mulher. Esta belíssima canção marcou o nosso
            casamento e foi o início de uma <span className="destaque-script">noite inesquecível</span>, repleta
            de amor, alegria e celebração ao lado de nossos entes queridos.
          </p>
          <button
            type="button"
            onClick={alternar}
            aria-pressed={tocando}
            className="mt-8 inline-flex min-h-[52px] items-center gap-3 rounded-full bg-rosa py-2 pl-2 pr-7 font-display text-[17px] text-noite shadow-[0_14px_30px_-14px_rgba(240,166,160,0.7)] transition-[transform,background-color] duration-200 hover:bg-[#f5b9b3] active:scale-[0.98]"
          >
            <span aria-hidden className="vinil relative h-10 w-10 rounded-full" data-tocando={tocando}>
              <span className="absolute inset-0 flex items-center justify-center text-noite">
                {tocando ? (
                  <Pause size={10} fill="currentColor" strokeWidth={0} />
                ) : (
                  <Play size={10} fill="currentColor" strokeWidth={0} className="translate-x-[1px]" />
                )}
              </span>
            </span>
            {tocando ? 'Pausar a nossa música' : 'Ouvir a nossa música'}
          </button>
        </div>
      </div>
    </section>
  );
}

/* Sem animação: o título e as seis fotos em sequência, sem prender a rolagem */
function FestaEstatica() {
  return (
    <section aria-labelledby="festa-titulo" className="relative z-10 px-[var(--margem)] pt-[clamp(90px,12vw,180px)]">
      <div className="flex flex-col items-center text-center">
        <TituloConteudo />
      </div>
      <div className="mx-auto mt-16 grid max-w-[1180px] gap-6 sm:grid-cols-2">
        {festa.map(({ foto }) => (
          <figure key={foto.src.src} className="relative aspect-[3/2] overflow-hidden rounded-[14px]">
            <Image src={foto.src} alt={foto.alt} fill placeholder="blur" sizes="(min-width: 640px) 46vw, 92vw" className="object-cover" />
          </figure>
        ))}
      </div>
    </section>
  );
}

function PartySection() {
  const targetRef = useRef<HTMLElement>(null);
  const reduzir = useReduzir();
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end']
  });

  return (
    <>
      {reduzir ? (
        <FestaEstatica />
      ) : (
        // Antes eram 1200vh para seis fotos; agora cada foto pede pouco menos de uma tela
        <section ref={targetRef} aria-labelledby="festa-titulo" className='relative z-10 h-[620svh]'>
          <div className="sticky top-0 h-[100svh] overflow-hidden">
            <Titulo progresso={scrollYProgress} />
            {festa.map((_, i) => (
              <FotoDaFesta key={i} i={i} progresso={scrollYProgress} />
            ))}
            <Contador progresso={scrollYProgress} />
          </div>
        </section>
      )}
      <PrimeiraDanca />
    </>
  )
}

export default PartySection
