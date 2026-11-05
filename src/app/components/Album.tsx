'use client'
import Image from 'next/image'
import { AnimatePresence, motion, type PanInfo } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { album } from './photos'
import { useReduzir } from './movimento'

const suave = [0.22, 1, 0.36, 1] as const
const total = album.length

const entrar = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 1, ease: suave },
}

/*
  Todas as fotos do site num só lugar, sem nada se mexendo. As fileiras são
  justificadas como num álbum: cada foto aparece inteira, na proporção dela,
  e todas as fotos de uma fileira têm a mesma altura. Tocar numa foto abre
  o visor, que passa de uma em uma.
*/
const proporcoes = album.map((f) => f.src.width / f.src.height)

type Fileira = { itens: number[]; altura: number; largura?: number }

/*
  Monta as fileiras: vai juntando fotos até a fileira ficar baixa o bastante
  para caber na largura, e fecha com ou sem a última foto, o que ficar mais
  perto da altura desejada. A última fileira só estica se estiver quase cheia;
  se não, fica na altura normal e centralizada.
*/
function montarFileiras(largura: number, alvo: number, vao: number): Fileira[] {
  const alturaDe = (n: number, soma: number) => (largura - vao * (n - 1)) / soma
  const fileiras: Fileira[] = []
  let atual: number[] = []
  let soma = 0
  proporcoes.forEach((r, i) => {
    const altura = alturaDe(atual.length + 1, soma + r)
    if (altura > alvo) {
      atual.push(i)
      soma += r
      return
    }
    const alturaSem = atual.length ? alturaDe(atual.length, soma) : Infinity
    if (Math.abs(alturaSem - alvo) < Math.abs(altura - alvo)) {
      fileiras.push({ itens: atual, altura: alturaSem })
      atual = [i]
      soma = r
    } else {
      fileiras.push({ itens: [...atual, i], altura })
      atual = []
      soma = 0
    }
  })
  if (atual.length) {
    const altura = alturaDe(atual.length, soma)
    const anterior = fileiras[fileiras.length - 1]
    const juntos = anterior ? [...anterior.itens, ...atual] : []
    const alturaJuntos = anterior ? alturaDe(juntos.length, juntos.reduce((s, i) => s + proporcoes[i], 0)) : 0
    if (altura <= alvo * 1.25) fileiras.push({ itens: atual, altura })
    // Uma sobra pequena entra na fileira de cima, em vez de ficar sozinha no fim
    else if (anterior && alturaJuntos >= alvo * 0.65) fileiras[fileiras.length - 1] = { itens: juntos, altura: alturaJuntos }
    else fileiras.push({ itens: atual, altura: alvo, largura: alvo * soma + vao * (atual.length - 1) })
  }
  return fileiras
}

function Miniatura({
  i,
  abrir,
  guardar,
  style,
}: {
  i: number
  abrir: (i: number) => void
  guardar: (i: number, el: HTMLButtonElement | null) => void
  style: React.CSSProperties
}) {
  const foto = album[i]
  return (
    <button
      ref={(el) => guardar(i, el)}
      type="button"
      onClick={() => abrir(i)}
      aria-label={`Ver foto ${i + 1} de ${total}: ${foto.alt}`}
      style={style}
      className="group relative block overflow-hidden rounded-[10px] bg-noite-alta"
    >
      <Image
        src={foto.src}
        alt=""
        fill
        placeholder="blur"
        sizes="(min-width: 1024px) 34vw, (min-width: 640px) 46vw, 72vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
    </button>
  )
}

export default function Album() {
  const [aberta, setAberta] = useState<number | null>(null)
  const [direcao, setDirecao] = useState(1)
  const [montado, setMontado] = useState(false)
  const [medida, setMedida] = useState<{ largura: number; alvo: number; vao: number } | null>(null)
  const botoes = useRef<(HTMLButtonElement | null)[]>([])
  const gradeRef = useRef<HTMLDivElement>(null)

  useEffect(() => setMontado(true), [])

  // Mede a largura do álbum e refaz as fileiras quando a tela muda
  useEffect(() => {
    const grade = gradeRef.current
    if (!grade) return
    const medir = () => {
      const vw = window.innerWidth
      const largura = grade.clientWidth
      setMedida((m) =>
        m && m.largura === largura
          ? m
          : { largura, alvo: Math.min(280, Math.max(165, vw * 0.19)), vao: Math.min(12, Math.max(6, vw * 0.008)) }
      )
    }
    medir()
    const observador = new ResizeObserver(medir)
    observador.observe(grade)
    return () => observador.disconnect()
  }, [])

  const fileiras = useMemo(
    () => (medida ? montarFileiras(medida.largura, medida.alvo, medida.vao) : null),
    [medida]
  )

  const abrir = useCallback((i: number) => {
    setDirecao(1)
    setAberta(i)
  }, [])
  const guardar = useCallback((i: number, el: HTMLButtonElement | null) => {
    botoes.current[i] = el
  }, [])

  const ir = useCallback((passo: 1 | -1) => {
    setDirecao(passo)
    setAberta((i) => (i === null ? i : (i + passo + total) % total))
  }, [])

  const fechar = useCallback(() => {
    setAberta((i) => {
      // Volta o foco para a miniatura da última foto vista
      if (i !== null) requestAnimationFrame(() => botoes.current[i]?.focus())
      return null
    })
  }, [])

  return (
    <section
      aria-labelledby="album-titulo"
      className="relative z-10 px-[var(--margem)] pb-[clamp(64px,8vw,120px)] pt-[clamp(30px,5vw,70px)]"
    >
      <div className="mx-auto max-w-[1280px]">
        <motion.h2 {...entrar} id="album-titulo" className="text-center">
          <span className="block font-display text-[clamp(24px,3.2vw,42px)] uppercase leading-tight tracking-[0.16em] text-creme">
            Todas as fotos,
          </span>
          <span className="mt-1 block font-script text-[clamp(68px,9.5vw,136px)] leading-[1.1] text-rosa">
            com calma
          </span>
        </motion.h2>
        <motion.p {...entrar} className="texto-corrido mx-auto mt-[clamp(20px,3vw,32px)] max-w-[28em] text-pretty text-center">
          As {total} fotos deste site, uma depois da outra. Toque em qualquer uma para vê-la inteira.
        </motion.p>

        <div ref={gradeRef} className="mt-[clamp(44px,6vw,80px)]">
          {fileiras && medida ? (
            <div className="flex flex-col" style={{ gap: medida.vao }}>
              {fileiras.map((fileira) => (
                <div
                  key={fileira.itens[0]}
                  className="mx-auto flex w-full"
                  style={{ gap: medida.vao, height: fileira.altura, maxWidth: fileira.largura }}
                >
                  {fileira.itens.map((i) => (
                    <Miniatura
                      key={i}
                      i={i}
                      abrir={abrir}
                      guardar={guardar}
                      style={{ flexGrow: proporcoes[i], flexBasis: 0, minWidth: 0, height: '100%' }}
                    />
                  ))}
                </div>
              ))}
            </div>
          ) : (
            // Antes de medir a tela (e sem JavaScript): fileiras aproximadas só com CSS
            <div className="flex flex-wrap gap-[clamp(6px,0.8vw,12px)] [--alt:clamp(165px,19vw,280px)]">
              {album.map((foto, i) => (
                <Miniatura
                  key={i}
                  i={i}
                  abrir={abrir}
                  guardar={guardar}
                  style={{
                    flexGrow: proporcoes[i] * 100,
                    width: `calc(var(--alt) * ${proporcoes[i].toFixed(4)})`,
                    aspectRatio: `${foto.src.width} / ${foto.src.height}`,
                  }}
                />
              ))}
              <span aria-hidden style={{ flexGrow: 100000 }} />
            </div>
          )}
        </div>
      </div>

      {montado &&
        createPortal(
          <AnimatePresence>
            {aberta !== null && (
              <Visor key="visor" indice={aberta} direcao={direcao} ir={ir} fechar={fechar} />
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  )
}

function Visor({
  indice,
  direcao,
  ir,
  fechar,
}: {
  indice: number
  direcao: number
  ir: (passo: 1 | -1) => void
  fechar: () => void
}) {
  const reduzir = useReduzir()
  const caixaRef = useRef<HTMLDivElement>(null)
  const foto = album[indice]

  // Prende a rolagem da página e o foco enquanto o visor está aberto
  useEffect(() => {
    caixaRef.current?.focus()
    const html = document.documentElement
    const antes = html.style.overflow
    html.style.overflow = 'hidden'
    return () => {
      html.style.overflow = antes
    }
  }, [])

  useEffect(() => {
    const tecla = (e: KeyboardEvent) => {
      if (e.key === 'Escape') fechar()
      else if (e.key === 'ArrowRight') ir(1)
      else if (e.key === 'ArrowLeft') ir(-1)
    }
    window.addEventListener('keydown', tecla)
    return () => window.removeEventListener('keydown', tecla)
  }, [ir, fechar])

  const manterFoco = (e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !caixaRef.current) return
    const focaveis = Array.from(caixaRef.current.querySelectorAll<HTMLElement>('button'))
    const primeiro = focaveis[0]
    const ultimo = focaveis[focaveis.length - 1]
    if (e.shiftKey && (document.activeElement === primeiro || document.activeElement === caixaRef.current)) {
      e.preventDefault()
      ultimo.focus()
    } else if (!e.shiftKey && document.activeElement === ultimo) {
      e.preventDefault()
      primeiro.focus()
    }
  }

  const arrastou = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60 || info.velocity.x < -500) ir(1)
    else if (info.offset.x > 60 || info.velocity.x > 500) ir(-1)
  }

  const deslocamento = reduzir ? 0 : 70
  const vizinhas = [album[(indice + 1) % total], album[(indice - 1 + total) % total]]

  return (
    <motion.div
      ref={caixaRef}
      role="dialog"
      aria-modal="true"
      aria-label="Álbum de fotos"
      tabIndex={-1}
      onKeyDown={manterFoco}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: suave }}
      className="fixed inset-0 z-[90] flex flex-col bg-noite/[0.97] outline-none"
    >
      <div className="flex shrink-0 items-center justify-end px-[clamp(12px,3vw,32px)] pt-[max(12px,env(safe-area-inset-top))]">
        <button
          type="button"
          onClick={fechar}
          aria-label="Fechar o álbum"
          className="flex h-12 w-12 items-center justify-center rounded-full text-creme ring-1 ring-creme/15 transition-colors duration-200 hover:ring-rosa/60"
        >
          <X aria-hidden size={20} strokeWidth={1.75} />
        </button>
      </div>

      <div className="relative mx-[clamp(8px,3vw,48px)] my-3 flex-1 overflow-hidden">
        <AnimatePresence initial={false} custom={direcao}>
          <motion.div
            key={indice}
            custom={direcao}
            variants={{
              entra: (d: number) => ({ opacity: 0, x: d * deslocamento }),
              centro: { opacity: 1, x: 0 },
              sai: (d: number) => ({ opacity: 0, x: d * -deslocamento }),
            }}
            initial="entra"
            animate="centro"
            exit="sai"
            transition={{ duration: 0.5, ease: suave }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.5}
            onDragEnd={arrastou}
            className="absolute inset-0 cursor-grab touch-pan-y active:cursor-grabbing"
          >
            <Image
              src={foto.src}
              alt={foto.alt}
              fill
              placeholder="blur"
              sizes="100vw"
              draggable={false}
              className="pointer-events-none select-none object-contain"
            />
          </motion.div>
        </AnimatePresence>

        {/* As vizinhas já vêm carregando, para a troca ser imediata */}
        <div aria-hidden className="invisible absolute inset-0">
          {vizinhas.map((v) => (
            <Image key={v.src.src} src={v.src} alt="" fill sizes="100vw" loading="eager" className="object-contain" />
          ))}
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-center gap-6 pb-[max(16px,env(safe-area-inset-bottom))] pt-1">
        <button
          type="button"
          onClick={() => ir(-1)}
          aria-label="Foto anterior"
          className="flex h-12 w-12 items-center justify-center rounded-full text-creme ring-1 ring-creme/15 transition-colors duration-200 hover:ring-rosa/60"
        >
          <ChevronLeft aria-hidden size={22} strokeWidth={1.75} />
        </button>
        <p aria-live="polite" className="min-w-[5.5ch] text-center font-display text-[17px] tabular-nums text-creme">
          {indice + 1} <span className="text-creme-suave">/ {total}</span>
        </p>
        <button
          type="button"
          onClick={() => ir(1)}
          aria-label="Próxima foto"
          className="flex h-12 w-12 items-center justify-center rounded-full text-creme ring-1 ring-creme/15 transition-colors duration-200 hover:ring-rosa/60"
        >
          <ChevronRight aria-hidden size={22} strokeWidth={1.75} />
        </button>
      </div>
    </motion.div>
  )
}
