'use client'
import { useReduzir } from "./components/movimento";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play } from "lucide-react";
import { DiscoAudioPlayer } from "./components/DiscoAudioPlayer";
import { MusicaProvider, useMusica } from "./components/Musica";
import { Varal } from "./components/Varal";

/*
  O convite da entrada (antes era um modal de vidro com "Experiência Musical").
  Continua perguntando sobre a música antes de tudo, mas como a porta do site:
  o nome dos dois, a data e a escolha de entrar com ou sem música.
*/
const ConviteDeEntrada = () => {
  const { entrou, entrar } = useMusica();
  const reduzir = useReduzir();
  const dialogoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (entrou) return;
    const html = document.documentElement;
    const antes = html.style.overflow;
    html.style.overflow = "hidden";
    // O foco vai para o convite (sem anel visível); o Tab leva direto aos dois botões
    dialogoRef.current?.focus({ preventScroll: true });
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") entrar(false);
    };
    window.addEventListener("keydown", aoTeclar);
    return () => {
      html.style.overflow = antes;
      window.removeEventListener("keydown", aoTeclar);
    };
  }, [entrou, entrar]);

  const saida = { duration: reduzir ? 0.2 : 0.9, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <AnimatePresence>
      {!entrou && (
        <motion.div
          ref={dialogoRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby="convite-titulo"
          aria-describedby="convite-texto"
          initial={false}
          exit={{ opacity: 0 }}
          transition={saida}
          className="fixed inset-0 z-[100] flex flex-col items-center overflow-y-auto bg-noite/[0.94] px-6 outline-none"
        >
          <motion.div
            exit={reduzir ? undefined : { y: -28 }}
            transition={saida}
            className="my-auto flex w-full max-w-[40rem] flex-col items-center py-12 text-center"
          >
            <Varal lampadas={9} queda={14} className="max-w-[280px]" />
            <p className="rotulo mt-9 text-luz">10 de julho de 2023</p>
            <h2
              id="convite-titulo"
              className="mt-2 whitespace-nowrap font-script text-[clamp(52px,13.5vw,96px)] leading-[1.15] text-creme"
            >
              Pedro <span className="text-rosa">&amp;</span> Erica
            </h2>
            <p
              id="convite-texto"
              className="mt-5 max-w-[30ch] text-pretty text-[clamp(19px,4.8vw,22px)] leading-relaxed text-creme-suave"
            >
              Este site tem trilha sonora: <span className="destaque-script">I Love You Baby</span>, de Frank
              Sinatra, a música da nossa primeira dança.
            </p>
            <div className="mt-10 flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-6">
              <button

                type="button"
                onClick={() => entrar(true)}
                className="inline-flex min-h-[52px] w-full max-w-[300px] items-center justify-center gap-2.5 rounded-full bg-rosa px-8 font-display text-[17px] text-noite shadow-[0_14px_30px_-14px_rgba(240,166,160,0.7)] transition-[transform,background-color] duration-200 hover:bg-[#f5b9b3] active:scale-[0.98] sm:w-auto"
              >
                <Play aria-hidden size={16} fill="currentColor" strokeWidth={0} />
                Entrar com música
              </button>
              <button
                type="button"
                onClick={() => entrar(false)}
                className="min-h-[52px] px-4 font-display text-[17px] text-creme-suave underline decoration-creme/30 transition-colors duration-200 hover:text-creme hover:decoration-rosa"
              >
                Entrar sem música
              </button>
            </div>
            <p className="mt-7 max-w-[34ch] text-[15px] leading-snug text-creme-suave/80">
              Você pode tocar ou pausar a música quando quiser, no disco do canto da tela.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <MusicaProvider>
      <ConviteDeEntrada />
      <DiscoAudioPlayer />
      {children}
    </MusicaProvider>
  );
}
