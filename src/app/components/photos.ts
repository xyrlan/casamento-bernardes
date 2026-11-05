import type { StaticImageData } from "next/image";

import f0004 from "../../../public/EricaePedro0004.jpg";
import f0006 from "../../../public/EricaePedro0006.jpg";
import f0013 from "../../../public/EricaePedro0013.jpg";
import f0014 from "../../../public/EricaePedro0014.jpg";
import f0023 from "../../../public/EricaePedro0023.jpg";
import f0031 from "../../../public/EricaePedro0031-2.jpg";
import f0040 from "../../../public/EricaePedro0040.jpg";
import f0041 from "../../../public/EricaePedro0041.jpg";
import f0047 from "../../../public/EricaePedro0047.jpg";
import f0073 from "../../../public/EricaePedro0073.jpg";
import f0112 from "../../../public/EricaePedro0112.jpg";
import f0149 from "../../../public/EricaePedro0149.jpg";
import f0156 from "../../../public/EricaePedro0156.jpg";
import f0167 from "../../../public/EricaePedro0167.jpg";
import f0168 from "../../../public/EricaePedro0168.jpg";
import f0180 from "../../../public/EricaePedro0180.jpg";
import f0181 from "../../../public/EricaePedro0181.jpg";
import f0183 from "../../../public/EricaePedro0183.jpg";
import f0185 from "../../../public/EricaePedro0185.jpg";
import f0187 from "../../../public/EricaePedro0187.jpg";
import f0309 from "../../../public/EricaePedro0309.jpg";
import f0535 from "../../../public/EricaePedro0535.jpg";
import f0542 from "../../../public/EricaePedro0542.jpg";
import f0552 from "../../../public/EricaePedro0552.jpg";
import f0558 from "../../../public/EricaePedro0558.jpg";
import f0559 from "../../../public/EricaePedro0559.jpg";
import f0565 from "../../../public/EricaePedro0565.jpg";
import f0580 from "../../../public/EricaePedro0580.jpg";
import f0591 from "../../../public/EricaePedro0591.jpg";

export type Foto = { src: StaticImageData; alt: string };

export const fotos = {
  beijoParque: { src: f0023, alt: "Pedro e Erica, rosto com rosto, sob a copa florida das árvores" },
  maosDadas: { src: f0031, alt: "As mãos de Pedro e Erica dadas, vistas de baixo, contra a copa das árvores" },
  caminhando: { src: f0040, alt: "Pedro e Erica caminhando lado a lado por um parque" },
  quadriculado: { src: f0041, alt: "Pedro e Erica diante de uma parede quadriculada, em preto e branco" },
  flores: { src: f0047, alt: "Erica de olhos fechados, abraçada por Pedro entre flores e luzes, em preto e branco" },
  abraco: { src: f0013, alt: "Erica abraçada a Pedro, os dois sorrindo, num parque" },
  parque: { src: f0006, alt: "Pedro beija o rosto de Erica entre as árvores" },
  salao: { src: f0591, alt: "Pedro e Erica de pé no salão da festa, sob arcos de luzes" },
  arcosPB: { src: f0167, alt: "Erica e Pedro sob arcos de luzes, em preto e branco" },
  janela: { src: f0112, alt: "Pedro e Erica abraçados junto a uma janela, entre heras e tijolos" },
  beijoLuzes: { src: f0156, alt: "Pedro e Erica se beijando sob arcos de luzes" },
  dePe: { src: f0004, alt: "Erica e Pedro de pé, lado a lado, num gramado entre árvores" },
  ombro: { src: f0014, alt: "Pedro sorrindo, com Erica de olhos fechados encostada no ombro dele" },
  calcada: { src: f0073, alt: "Erica e Pedro abraçados numa calçada, diante de uma fachada de vidro" },
  vidro: { src: f0168, alt: "Erica e Pedro olhando através de um vidro que reflete arcos de luzes" },
  mesa: { src: f0149, alt: "Mesa comprida posta com toalhas brancas, taças e arranjos de flores" },
  arranjo: { src: f0180, alt: "Arranjo de flores em tons de pêssego sobre a mesa posta" },
  lugar: { src: f0181, alt: "Um lugar à mesa, com prato, talheres e cadeira forrada de pele de carneiro" },
  boloArco: { src: f0183, alt: "O bolo de casamento sob um arco de flores e luz" },
  bilhetes: { src: f0185, alt: "Bilhetes em forma de coração escritos à mão" },
  bolo: { src: f0187, alt: "Bolo branco de dois andares decorado com folhagens" },
  violino: { src: f0309, alt: "Um violino sob luz quente" },
  primeiraDanca: { src: f0535, alt: "Pedro e Erica dançando cercados pelos convidados" },
  faiscas: { src: f0542, alt: "Convidados erguem velas faiscantes ao redor de Pedro e Erica" },
  pista: { src: f0552, alt: "Pedro e Erica dançando de mãos dadas na pista, entre os convidados" },
  roda: { src: f0558, alt: "Pista de dança cheia sob os arcos de luzes" },
  giro: { src: f0559, alt: "Erica gira na pista de dança, entre rastros de luz" },
  fonte: { src: f0565, alt: "A fonte iluminada à noite, com os convidados ao fundo" },
  coracoes: { src: f0580, alt: "Erica e Pedro, à noite, inclinados sobre bilhetes iluminados em forma de coração" },
} satisfies Record<string, Foto>;

/* Todas as fotos, na ordem em que a história acontece: nós dois, os detalhes, a festa */
export const album: Foto[] = [
  fotos.maosDadas,
  fotos.beijoParque,
  fotos.caminhando,
  fotos.dePe,
  fotos.ombro,
  fotos.abraco,
  fotos.parque,
  fotos.calcada,
  fotos.quadriculado,
  fotos.flores,
  fotos.janela,
  fotos.vidro,
  fotos.salao,
  fotos.arcosPB,
  fotos.beijoLuzes,
  fotos.mesa,
  fotos.arranjo,
  fotos.lugar,
  fotos.boloArco,
  fotos.bilhetes,
  fotos.bolo,
  fotos.violino,
  fotos.primeiraDanca,
  fotos.faiscas,
  fotos.pista,
  fotos.roda,
  fotos.giro,
  fotos.fonte,
  fotos.coracoes,
];
