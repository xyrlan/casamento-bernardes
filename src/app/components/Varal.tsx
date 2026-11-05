/*
  O varal de lâmpadas dos arcos da festa, usado como ornamento entre os blocos
  (no lugar da linha com brilhinho). O fio cai numa curva e as lâmpadas piscam devagar.
*/
const LARGURA = 600;

function pontoNaCurva(t: number, queda: number) {
  // Bézier quadrática de (0,8) a (600,8) com controle em (300, 8 + 2*queda): o meio desce "queda"
  return { x: LARGURA * t, y: 8 + 4 * queda * t * (1 - t) };
}

export function Varal({
  lampadas = 11,
  queda = 18,
  className = "",
}: {
  lampadas?: number;
  queda?: number;
  className?: string;
}) {
  const pontos = Array.from({ length: lampadas }, (_, i) => pontoNaCurva((i + 0.5) / lampadas, queda));
  const controle = 8 + 2 * queda;
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${LARGURA} ${queda + 30}`}
      className={`block h-auto w-full overflow-visible ${className}`}
    >
      <defs>
        <radialGradient id="lampada-brilho">
          <stop offset="0%" stopColor="#fff1d2" />
          <stop offset="30%" stopColor="#f6cf8e" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#f6cf8e" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path
        d={`M 0 8 Q ${LARGURA / 2} ${controle} ${LARGURA} 8`}
        fill="none"
        stroke="#8a6f62"
        strokeOpacity="0.55"
        strokeWidth="1"
      />
      {pontos.map((p, i) => (
        <g key={i} className="lampada" style={{ ["--atraso" as string]: `${(i * 0.73) % 4.8}s` }}>
          <circle cx={p.x} cy={p.y + 5} r="11" fill="url(#lampada-brilho)" />
          <circle cx={p.x} cy={p.y + 5} r="2.4" fill="#fff4dc" />
        </g>
      ))}
    </svg>
  );
}
