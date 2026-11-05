'use client'
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Varal } from "./Varal";

const CASAMENTO = new Date(2023, 6, 10);
const PRIMEIRO_BEIJO = new Date(2016, 6, 10);

/* Anos, meses e dias entre duas datas, como se conta no calendário */
function intervalo(de: Date, ate: Date) {
  let anos = ate.getFullYear() - de.getFullYear();
  let meses = ate.getMonth() - de.getMonth();
  let dias = ate.getDate() - de.getDate();
  if (dias < 0) {
    meses -= 1;
    dias += new Date(ate.getFullYear(), ate.getMonth(), 0).getDate();
  }
  if (meses < 0) {
    anos -= 1;
    meses += 12;
  }
  return { anos, meses, dias };
}

const plural = (n: number, um: string, varios: string) => `${n} ${n === 1 ? um : varios}`;

function emPalavras({ anos, meses, dias }: { anos: number; meses: number; dias: number }) {
  const partes = [
    anos && plural(anos, "ano", "anos"),
    meses && plural(meses, "mês", "meses"),
    dias && plural(dias, "dia", "dias"),
  ].filter(Boolean) as string[];
  if (partes.length < 2) return partes[0] ?? "";
  return `${partes.slice(0, -1).join(", ")} e ${partes[partes.length - 1]}`;
}

/*
  O tempo contado a partir de hoje. Só é calculado no navegador, com a data de
  quem está lendo; até lá a linha fica reservada para nada pular.
*/
function TempoJuntos() {
  const [hoje, setHoje] = useState<Date | null>(null);
  useEffect(() => setHoje(new Date()), []);

  const caixa = "mx-auto mt-9 min-h-[4.6em] max-w-[30em] text-balance font-display italic text-creme-suave";
  if (!hoje) return <div aria-hidden className={caixa} />;

  const casados = intervalo(CASAMENTO, hoje);
  const desdeBeijo = plural(intervalo(PRIMEIRO_BEIJO, hoje).anos, "ano", "anos");
  const aniversario = hoje.getMonth() === 6 && hoje.getDate() === 10;

  return (
    <div className={caixa}>
      <p className="text-[clamp(21px,2.2vw,28px)] leading-[1.4]">
        {aniversario ? (
          <>
            Hoje é 10 de julho: <span className="not-italic text-creme">{plural(casados.anos, "ano", "anos")} de casados</span>.
          </>
        ) : (
          <>
            Casados há <span className="not-italic text-creme">{emPalavras(casados)}</span>.
          </>
        )}
      </p>
      <p className="mt-2 text-[clamp(18px,1.6vw,21px)] leading-[1.5]">
        {aniversario ? `E ${desdeBeijo} do primeiro beijo.` : `E, desde o primeiro beijo, já são ${desdeBeijo}.`}
      </p>
    </div>
  );
}

/* A despedida: o varal, os nomes, as duas datas e o tempo que já passou */
export function Rodape() {
  return (
    <footer className="relative z-10 px-[var(--margem)] pb-[clamp(56px,8vw,96px)] pt-[clamp(20px,4vw,48px)] text-center">
      <Varal lampadas={7} queda={14} className="mx-auto max-w-[min(300px,64vw)]" />
      <p className="mt-8 font-script text-[clamp(52px,6vw,80px)] leading-[1.15] text-creme">
        Pedro <span className="text-rosa">&amp;</span> Erica
      </p>
      <p className="rotulo mt-3 text-creme-suave">
        Primeiro beijo em 10.07.2016 <span aria-hidden className="mx-2 text-luz">·</span> Casamento em 10.07.2023
      </p>
      <TempoJuntos />
      <a
        href="#topo"
        className="mt-8 inline-flex min-h-[44px] items-center gap-2 text-[17px] italic text-creme-suave underline decoration-creme/30 transition-colors duration-200 hover:text-creme hover:decoration-rosa"
      >
        Voltar ao início
        <ArrowUp aria-hidden size={16} strokeWidth={1.75} />
      </a>
    </footer>
  );
}
