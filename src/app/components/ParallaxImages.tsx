'use client'
import { useReduzir } from './movimento';
import { useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { wrap } from "@motionone/utils";
import Image from "next/image";
import { Grip, LayoutGrid } from "lucide-react";
import { fotos } from "./photos";

interface ParallaxProps {
  baseVelocity: number;
}

const detalhes = [fotos.mesa, fotos.arranjo, fotos.lugar, fotos.boloArco, fotos.bilhetes, fotos.bolo, fotos.violino];

/*
  O carrossel infinito dos detalhes da festa. Como no original, anda sozinho,
  acelera com a rolagem e troca de sentido quando o convidado rola para cima;
  o botão alterna entre fotos alinhadas e espalhadas. Agora mede a própria
  largura (antes eram números fixos), para de animar fora da tela e, com
  "reduzir movimento", vira uma fileira que se arrasta com o dedo.
*/
export function ParallaxImages({ baseVelocity = 60 }: ParallaxProps) {
  const [espalhado, setEspalhado] = useState(false);
  const reduzir = useReduzir();
  const areaRef = useRef<HTMLDivElement>(null);
  const conjuntoRef = useRef<HTMLDivElement>(null);
  const largura = useRef(0);
  const visivel = useRef(false);

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocidade = useVelocity(scrollY);
  const velocidadeSuave = useSpring(velocidade, { damping: 50, stiffness: 400 });
  const fator = useTransform(velocidadeSuave, [0, 1000], [0, 5], { clamp: false });
  const x = useTransform(baseX, (v) => (largura.current ? `${wrap(-largura.current, 0, v)}px` : "0px"));
  const sentido = useRef(-1);

  useEffect(() => {
    const conjunto = conjuntoRef.current;
    const area = areaRef.current;
    if (!conjunto || !area) return;
    const medir = new ResizeObserver(() => {
      largura.current = conjunto.offsetWidth;
    });
    medir.observe(conjunto);
    const olhar = new IntersectionObserver(([e]) => {
      visivel.current = e.isIntersecting;
    });
    olhar.observe(area);
    return () => {
      medir.disconnect();
      olhar.disconnect();
    };
  }, [reduzir]);

  useAnimationFrame((_, delta) => {
    if (reduzir || !visivel.current || !largura.current) return;
    if (fator.get() < 0) sentido.current = 1;
    else if (fator.get() > 0) sentido.current = -1;
    let mover = sentido.current * baseVelocity * (delta / 1000);
    mover += mover * Math.abs(fator.get());
    baseX.set(baseX.get() + mover);
  });

  const conjunto = (copia: boolean) => (
    <div
      ref={copia ? undefined : conjuntoRef}
      aria-hidden={copia || undefined}
      className={`flex shrink-0 items-center transition-[gap,padding] duration-700 ease-out ${
        espalhado ? "gap-[clamp(40px,8vw,140px)] pr-[clamp(40px,8vw,140px)]" : "gap-[clamp(12px,1.6vw,24px)] pr-[clamp(12px,1.6vw,24px)]"
      }`}
    >
      {detalhes.map((foto, i) => (
        <figure
          key={foto.src.src}
          className={`group relative aspect-[2/3] h-[clamp(260px,34vw,460px)] shrink-0 overflow-hidden rounded-[12px] bg-noite-alta shadow-[var(--sombra-foto)] transition-transform duration-700 ease-out ${
            espalhado ? (i % 2 ? "translate-y-[9%]" : "-translate-y-[9%]") : ""
          }`}
        >
          <Image
            src={foto.src}
            alt={copia ? "" : foto.alt}
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 24vw, 46vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </figure>
      ))}
    </div>
  );

  if (reduzir) {
    return (
      <div className="mt-[clamp(48px,7vw,96px)] overflow-x-auto px-[var(--margem)] pb-6 [scrollbar-width:thin]">
        <div className="flex w-max">{conjunto(false)}</div>
      </div>
    );
  }

  return (
    <div ref={areaRef} className="relative mt-[clamp(40px,6vw,80px)] select-none">
      <div className="flex justify-center px-[var(--margem)]">
        <button
          type="button"
          onClick={() => setEspalhado((v) => !v)}
          aria-pressed={espalhado}
          className="inline-flex min-h-[44px] items-center gap-2.5 rounded-full px-5 text-[15px] italic text-creme-suave ring-1 ring-creme/15 transition-colors duration-200 hover:text-creme hover:ring-rosa/50"
        >
          {espalhado ? <LayoutGrid aria-hidden size={16} /> : <Grip aria-hidden size={16} />}
          {espalhado ? "Alinhar as fotos" : "Espalhar as fotos"}
        </button>
      </div>
      <div className="overflow-hidden py-[clamp(48px,7vw,96px)]">
        <motion.div className="flex w-max flex-nowrap" style={{ x }}>
          {conjunto(false)}
          {conjunto(true)}
        </motion.div>
      </div>
    </div>
  );
}
