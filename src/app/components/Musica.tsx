"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";

type Musica = {
  /** O convidado já passou pelo convite de entrada */
  entrou: boolean;
  entrar: (comMusica: boolean) => void;
  tocando: boolean;
  jaTocou: boolean;
  erro: boolean;
  atual: number;
  duracao: number;
  alternar: () => void;
};

const MusicaContext = createContext<Musica | null>(null);

export function useMusica() {
  const ctx = useContext(MusicaContext);
  if (!ctx) throw new Error("useMusica precisa estar dentro de <MusicaProvider>");
  return ctx;
}

/*
  Um único <audio> para o site inteiro: o convite, o player do canto e o botão
  da primeira dança controlam a mesma música. Nada toca sem um toque do convidado.
*/
export function MusicaProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [entrou, setEntrou] = useState(false);
  const [tocando, setTocando] = useState(false);
  const [jaTocou, setJaTocou] = useState(false);
  const [erro, setErro] = useState(false);
  const [atual, setAtual] = useState(0);
  const [duracao, setDuracao] = useState(0);

  const tocar = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      setErro(false);
      await audio.play();
      setJaTocou(true);
    } catch {
      setErro(true);
    }
  }, []);

  const alternar = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) void tocar();
    else audio.pause();
  }, [tocar]);

  const entrar = useCallback(
    (comMusica: boolean) => {
      setEntrou(true);
      if (comMusica) void tocar();
    },
    [tocar],
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const aoTocar = () => setTocando(true);
    const aoPausar = () => setTocando(false);
    const aoAvancar = () => setAtual(audio.currentTime);
    const aoMedir = () => {
      if (Number.isFinite(audio.duration)) setDuracao(audio.duration);
    };
    audio.addEventListener("play", aoTocar);
    audio.addEventListener("pause", aoPausar);
    audio.addEventListener("timeupdate", aoAvancar);
    audio.addEventListener("loadedmetadata", aoMedir);
    audio.addEventListener("durationchange", aoMedir);
    return () => {
      audio.removeEventListener("play", aoTocar);
      audio.removeEventListener("pause", aoPausar);
      audio.removeEventListener("timeupdate", aoAvancar);
      audio.removeEventListener("loadedmetadata", aoMedir);
      audio.removeEventListener("durationchange", aoMedir);
    };
  }, []);

  return (
    <MusicaContext.Provider value={{ entrou, entrar, tocando, jaTocou, erro, atual, duracao, alternar }}>
      {children}
      {/* preload="none": os 3,9 MB da música só baixam quando alguém pede para ouvir */}
      <audio ref={audioRef} src="/i-love-you-baby.mp3" loop preload="none" />
    </MusicaContext.Provider>
  );
}

export function formatarTempo(segundos: number) {
  if (!Number.isFinite(segundos) || segundos <= 0) return "0:00";
  const m = Math.floor(segundos / 60);
  const s = Math.floor(segundos % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}
