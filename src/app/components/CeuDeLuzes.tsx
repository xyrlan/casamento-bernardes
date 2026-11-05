/*
  O fundo da noite: dois clarões quentes (as lâmpadas ao longe) e luzinhas que
  sobem devagar, como o bokeh das fotos da festa. Só CSS, posições fixas
  (nada de Math.random, para o servidor e o navegador desenharem igual).
*/
const LUZES = Array.from({ length: 16 }, (_, i) => {
  const dur = 24 + ((i * 7) % 14);
  return {
    left: `${(i * 37 + 11) % 97}%`,
    tam: `${4 + ((i * 5) % 6)}px`,
    dur: `${dur}s`,
    // atraso negativo: quando a página abre, as luzes já estão no meio do caminho
    atraso: `${-((i * 5.3) % dur)}s`,
    deriva: `${((i % 5) - 2) * 14}px`,
    brilho: (0.45 + ((i * 3) % 5) * 0.1).toFixed(2),
    pos: (i * 23) % 90,
    soDesktop: i % 2 === 1,
  };
});

export function CeuDeLuzes() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_50%_at_12%_-5%,rgba(246,207,142,0.11),transparent_65%),radial-gradient(ellipse_70%_55%_at_105%_105%,rgba(240,166,160,0.10),transparent_65%)]" />
      {LUZES.map((l, i) => (
        <span
          key={i}
          className={`ceu-luz ${l.soDesktop ? "max-md:hidden" : ""}`}
          style={
            {
              left: l.left,
              "--tam": l.tam,
              "--dur": l.dur,
              "--atraso": l.atraso,
              "--deriva": l.deriva,
              "--brilho": l.brilho,
              "--pos": l.pos,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
