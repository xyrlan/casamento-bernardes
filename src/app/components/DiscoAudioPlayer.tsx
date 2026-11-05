'use client'
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { formatarTempo, useMusica } from "./Musica";

/* No celular, depois da abertura, o player encolhe para só o disco e não cobre os títulos */
function useCompacto() {
  const [compacto, setCompacto] = useState(false);
  useEffect(() => {
    const medir = () => setCompacto(window.scrollY > window.innerHeight * 0.7);
    medir();
    window.addEventListener("scroll", medir, { passive: true });
    return () => window.removeEventListener("scroll", medir);
  }, []);
  return compacto;
}

/*
  O player do canto: um disco de vinil que gira enquanto "I Love You Baby" toca.
  O disco inteiro é o botão; a linha rosé embaixo mostra o andamento da música.
*/
export const DiscoAudioPlayer = () => {
  const { entrou, tocando, jaTocou, erro, atual, duracao, alternar } = useMusica();
  const compacto = useCompacto();
  const progresso = duracao > 0 ? Math.min(1, atual / duracao) : 0;

  const linha = erro
    ? "Não tocou. Toque de novo."
    : jaTocou
      ? `${formatarTempo(atual)}${duracao > 0 ? ` / ${formatarTempo(duracao)}` : ""}`
      : "Frank Sinatra";

  return (
    <motion.div
      initial={false}
      animate={{ opacity: entrou ? 1 : 0, y: entrou ? 0 : -14 }}
      transition={{ duration: 0.6, delay: entrou ? 0.6 : 0, ease: [0.22, 1, 0.36, 1] }}
      className="fixed z-50"
      style={{
        top: "max(12px, env(safe-area-inset-top))",
        right: "max(12px, env(safe-area-inset-right))",
        pointerEvents: entrou ? "auto" : "none",
      }}
    >
      <button
        type="button"
        onClick={alternar}
        aria-pressed={tocando}
        aria-label={tocando ? "Pausar “I Love You Baby”" : "Tocar “I Love You Baby”, de Frank Sinatra"}
        className={`group relative flex items-center gap-3 overflow-hidden rounded-full bg-noite-alta/[0.92] py-1.5 pl-1.5 pr-5 text-left shadow-[0_14px_30px_-14px_rgba(0,0,0,0.9)] ring-1 ring-creme/10 backdrop-blur-sm transition-[transform,box-shadow] duration-200 hover:ring-rosa/40 active:scale-[0.98] md:gap-3.5 md:py-2 md:pl-2 md:pr-6 ${
          compacto ? "max-sm:p-1.5" : ""
        }`}
      >
        <span aria-hidden className="relative h-11 w-11 shrink-0 md:h-12 md:w-12">
          <span className="vinil absolute inset-0 rounded-full shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]" data-tocando={tocando} />
          <span className="absolute inset-0 flex items-center justify-center text-noite">
            {tocando ? (
              <Pause size={11} fill="currentColor" strokeWidth={0} />
            ) : (
              <Play size={11} fill="currentColor" strokeWidth={0} className="translate-x-[1px]" />
            )}
          </span>
        </span>
        <span className={`flex min-w-0 flex-col ${compacto ? "max-sm:hidden" : ""}`}>
          <span className="font-script text-[21px] leading-[1.15] text-creme md:text-[23px]">I Love You Baby</span>
          <span className="text-[13px] leading-tight tabular-nums text-creme-suave">{linha}</span>
        </span>
        <span aria-hidden className={`absolute inset-x-6 bottom-0 h-[2px] bg-creme/10 ${compacto ? "max-sm:hidden" : ""}`}>
          <span
            className="block h-full origin-left bg-rosa transition-transform duration-300 ease-linear"
            style={{ transform: `scaleX(${progresso})` }}
          />
        </span>
      </button>
    </motion.div>
  );
};
