'use client'
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/*
  "Reduzir movimento" só é conhecido no navegador. Até a página montar, todos
  (servidor e navegador) desenham a versão com movimento; depois, quem pediu
  menos movimento recebe a versão calma. Assim a hidratação não quebra.
*/
export function useReduzir() {
  const reduzir = useReducedMotion();
  const [montado, setMontado] = useState(false);
  useEffect(() => setMontado(true), []);
  return montado && reduzir === true;
}
