import { addEventListeners, clientEntry, css, on, ref, type Handle } from 'remix/ui'
import { animateEntrance, animateExit } from 'remix/ui/animation'

import {
  IconCard,
  IconCart,
  IconCode,
  IconDesign,
  IconGauge,
  IconServer,
  IconUsers,
} from '../ui/icons.tsx'
import { ShowcaseAnim } from '../ui/showcase-graphics.tsx'
import { Container, Eyebrow, GradientText } from '../ui/theme.tsx'

const GENERAL = {
  eyebrow: 'Was wir bauen',
  title: 'Alles für deinen Web-Auftritt — aus einer Hand.',
  body: 'Sieben Leistungen, ein Team — vom ersten Pixel bis zur Datenbank. Bewege die Maus über ein Icon oder scrolle, um jede Leistung im Detail zu sehen.',
}

const SERVICES = [
  {
    title: 'Webdesign & UX',
    body: 'Markenstarke Interfaces, die Vertrauen schaffen und Besucher gezielt zum Abschluss führen.',
    Icon: IconDesign,
  },
  {
    title: 'Vereinsseiten',
    body: 'Geschützter Mitgliedschaftsbereich, automatische Erstellung von Spendenquittungen und komfortable Mitgliederverwaltung — DSGVO-konform für deinen Verein.',
    Icon: IconUsers,
  },
  {
    title: 'Frontend-Entwicklung',
    body: 'Pixelgenaue, blitzschnelle Umsetzung mit modernen Frameworks — barrierefrei und responsiv.',
    Icon: IconCode,
  },
  {
    title: 'Backend & APIs',
    body: 'Datenbanken, Auth und APIs, die mitwachsen. Dein Produkt steht auf einem soliden Fundament.',
    Icon: IconServer,
  },
  {
    title: 'E-Commerce & Shops',
    body: 'Verkaufsstarke Shops mit Zahlungsanbindung, Checkout-Optimierung und Warenwirtschaft.',
    Icon: IconCart,
  },
  {
    title: 'Zahlungsabwicklungen',
    body: 'Zahlungen direkt auf deiner Seite: Apple Pay, Google Pay, PayPal, Kartenzahlung und Banküberweisung — sicher und reibungslos.',
    Icon: IconCard,
  },
  {
    title: 'Performance & SEO',
    body: 'Core Web Vitals im grünen Bereich und technisches SEO, damit du gefunden wirst.',
    Icon: IconGauge,
  },
]

// Overview constellation positions (percent of the panel box) — one per service.
const POS = [
  { x: 20, y: 28 },
  { x: 50, y: 17 },
  { x: 80, y: 28 },
  { x: 31, y: 53 },
  { x: 69, y: 53 },
  { x: 31, y: 82 },
  { x: 69, y: 82 },
]

// Colors used to paint the connection lines.
const CONN_COLORS = ['#20AAFF', '#80E464', '#FFDF5F', '#FF65DB', '#FF5148']

// Orthogonal (right-angle) route between two points: horizontal → vertical →
// horizontal. Axis-aligned segments stay axis-aligned under the panel's
interface Edge {
  a: number
  b: number
  id: string
  color: string
  slot: number
}

// Round-robin schedule (circle method). In every round each icon has at most
// one connection (a matching), and across all rounds every pair of icons gets
// connected exactly once.
const ROUNDS: Edge[][] = (() => {
  const n = POS.length
  const bye = n
  const m = n % 2 === 1 ? n + 1 : n
  let arr = Array.from({ length: m }, (_, i) => i)
  const rounds: Edge[][] = []
  for (let r = 0; r < m - 1; r++) {
    const edges: Edge[] = []
    for (let i = 0; i < m / 2; i++) {
      const a = arr[i]
      const b = arr[m - 1 - i]
      if (a !== bye && b !== bye) {
        const lo = Math.min(a, b)
        const hi = Math.max(a, b)
        edges.push({ a: lo, b: hi, id: `${lo}-${hi}`, color: CONN_COLORS[edges.length], slot: edges.length })
      }
    }
    rounds.push(edges)
    arr = [arr[0], arr[m - 1], ...arr.slice(1, m - 1)]
  }
  return rounds
})()

function currentConnections(tick: number): Edge[] {
  return ROUNDS[tick % ROUNDS.length] ?? []
}

const ICON_HALF = 36 // px — connect to the icon edge, never its center
const CORNER = 16 // px corner radius

// Builds an orthogonal polyline with rounded corners through the waypoints.
function roundedPath(pts: Array<{ x: number; y: number }>, r: number): string {
  let d = `M${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`
  for (let i = 1; i < pts.length - 1; i++) {
    const p0 = pts[i - 1]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const d1 = Math.hypot(p1.x - p0.x, p1.y - p0.y)
    const d2 = Math.hypot(p2.x - p1.x, p2.y - p1.y)
    const r1 = Math.min(r, d1 / 2)
    const r2 = Math.min(r, d2 / 2)
    const a = { x: p1.x - ((p1.x - p0.x) / (d1 || 1)) * r1, y: p1.y - ((p1.y - p0.y) / (d1 || 1)) * r1 }
    const b = { x: p1.x + ((p2.x - p1.x) / (d2 || 1)) * r2, y: p1.y + ((p2.y - p1.y) / (d2 || 1)) * r2 }
    d += ` L${a.x.toFixed(1)} ${a.y.toFixed(1)} Q${p1.x.toFixed(1)} ${p1.y.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`
  }
  const last = pts[pts.length - 1]
  d += ` L${last.x.toFixed(1)} ${last.y.toFixed(1)}`
  return d
}

// Pixel-space orthogonal route between two icons. Exits one icon edge, runs
// along a per-edge channel (offset by slot so two lines never share a track),
// and enters the other icon edge. Routes along the dominant axis so short gaps
// don't get squished.
function routeEdge(edge: Edge, w: number, h: number): string {
  const A = { x: (POS[edge.a].x / 100) * w, y: (POS[edge.a].y / 100) * h }
  const B = { x: (POS[edge.b].x / 100) * w, y: (POS[edge.b].y / 100) * h }
  const dx = B.x - A.x
  const dy = B.y - A.y
  const off = (edge.slot - 1) * 22
  let pts: Array<{ x: number; y: number }>
  if (Math.abs(dy) >= Math.abs(dx)) {
    const sy = dy >= 0 ? 1 : -1
    const start = { x: A.x, y: A.y + sy * ICON_HALF }
    const end = { x: B.x, y: B.y - sy * ICON_HALF }
    const chY = (A.y + B.y) / 2 + off
    pts = [start, { x: A.x, y: chY }, { x: B.x, y: chY }, end]
  } else {
    const sx = dx >= 0 ? 1 : -1
    const start = { x: A.x + sx * ICON_HALF, y: A.y }
    const end = { x: B.x - sx * ICON_HALF, y: B.y }
    const chX = (A.x + B.x) / 2 + off
    pts = [start, { x: chX, y: A.y }, { x: chX, y: B.y }, end]
  }
  return roundedPath(pts, CORNER)
}

export const Showcase = clientEntry(import.meta.url, function Showcase(handle: Handle) {
  // State (overview by default; SSR renders the stacked, no-JS-friendly list).
  let pinned = false
  let mode: 'overview' | 'focus' = 'overview'
  let index = 0
  let hover: number | null = null
  let pulse = 0
  let tick = 0
  let panelW = 0
  let panelH = 0

  function observeSize(node: HTMLElement, signal: AbortSignal) {
    const ro = new ResizeObserver(() => {
      const w = node.clientWidth
      const h = node.clientHeight
      if (Math.abs(w - panelW) > 1 || Math.abs(h - panelH) > 1) {
        panelW = w
        panelH = h
        handle.update()
      }
    })
    ro.observe(node)
    signal.addEventListener('abort', () => ro.disconnect())
  }

  function setupScroll(section: HTMLElement, signal: AbortSignal) {
    const mq = window.matchMedia('(min-width: 960px)')

    const applyProgress = () => {
      if (!pinned) return
      const total = section.offsetHeight - window.innerHeight
      const scrolled = Math.min(Math.max(-section.getBoundingClientRect().top, 0), Math.max(total, 1))
      const p = total > 0 ? scrolled / total : 0
      const band = 0.16
      let m: 'overview' | 'focus'
      let i = index
      if (p < band) {
        m = 'overview'
      } else {
        m = 'focus'
        i = Math.min(SERVICES.length - 1, Math.floor(((p - band) / (1 - band)) * SERVICES.length))
      }
      if (m !== mode || i !== index) {
        mode = m
        index = i
        if (m === 'focus') hover = null
        handle.update()
      }
    }

    const syncMode = () => {
      const next = mq.matches
      if (next !== pinned) {
        pinned = next
        if (!pinned) {
          mode = 'overview'
          hover = null
        }
        handle.update()
      }
      applyProgress()
    }

    addEventListeners(window, signal, { scroll: applyProgress, resize: syncMode })
    syncMode()

    // Rotates the highlighted icon and the visible set of connection lines.
    const timer = setInterval(() => {
      if (pinned && mode === 'overview' && hover === null) {
        tick += 1
        pulse = tick % SERVICES.length
        handle.update()
      }
    }, 1900)
    signal.addEventListener('abort', () => clearInterval(timer))
  }

  return () => {
    const active = mode === 'focus' ? index : hover
    const focused = active !== null

    if (!pinned) {
      // SSR / mobile / no-JS: a clean stacked list with every service + animation.
      return (
        <section
          id="leistungen"
          mix={ref((node, signal) => setupScroll(node, signal))}
          style={{ background: 'var(--bg-soft)' }}
        >
          <div mix={css({ paddingBlock: '96px', '@media (min-width: 768px)': { paddingBlock: '120px' } })}>
            <Container>
              <div mix={css({ maxWidth: '720px', marginBottom: '48px', display: 'flex', flexDirection: 'column', gap: '18px' })}>
                <Eyebrow>{GENERAL.eyebrow}</Eyebrow>
                <h2 mix={headingStyle}>
                  Alles für deinen Web-Auftritt — <GradientText>aus einer Hand.</GradientText>
                </h2>
                <p mix={css({ fontSize: '18px', color: 'var(--muted)' })}>{GENERAL.body}</p>
              </div>
              <div mix={css({ display: 'flex', flexDirection: 'column', gap: '20px' })}>
                {SERVICES.map((s, i) => (
                  <div mix={stackRow}>
                    <div mix={stackIcon}>
                      <s.Icon />
                    </div>
                    <div mix={css({ flex: '1 1 240px' })}>
                      <h3 mix={css({ fontSize: '20px', fontWeight: 700, marginBottom: '8px' })}>
                        {s.title}
                      </h3>
                      <p mix={css({ color: 'var(--muted)', fontSize: '15px' })}>{s.body}</p>
                    </div>
                    <div mix={css({ flex: '0 0 200px', display: 'grid', placeItems: 'center', color: '#F4EEE8' })}>
                      <ShowcaseAnim index={i} />
                    </div>
                  </div>
                ))}
              </div>
            </Container>
          </div>
        </section>
      )
    }

    // Desktop: pinned scrollytelling.
    const leftText = focused ? SERVICES[active] : GENERAL
    return (
      <section
        id="leistungen"
        mix={ref((node, signal) => setupScroll(node, signal))}
        style={{ height: `${(SERVICES.length + 1) * 100}vh`, background: 'var(--bg-soft)' }}
      >
        <div mix={stickyWrap}>
          <Container wide>
            <div mix={gridStyle}>
              {/* Left: text */}
              <div mix={css({ display: 'flex', flexDirection: 'column', gap: '20px' })}>
                <Eyebrow>{focused ? `0${active + 1} / 0${SERVICES.length}` : GENERAL.eyebrow}</Eyebrow>
                <h2 mix={headingStyle}>
                  {focused ? (
                    <GradientText>{leftText.title}</GradientText>
                  ) : (
                    <>
                      Alles für deinen Web-Auftritt — <GradientText>aus einer Hand.</GradientText>
                    </>
                  )}
                </h2>
                <p mix={css({ fontSize: '18px', color: 'var(--muted)', maxWidth: '46ch' })}>
                  {leftText.body}
                </p>
                <div mix={css({ display: 'flex', gap: '8px', marginTop: '8px' })}>
                  {SERVICES.map((_, i) => (
                    <span
                      mix={dotStyle}
                      style={{
                        width: focused && i === active ? '28px' : '8px',
                        background:
                          focused && i === active ? 'var(--brand-grad)' : 'rgba(255,255,255,0.18)',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Right: constellation panel */}
              <div mix={panelStyle}>
                <div
                  mix={[
                    panelInner,
                    ref((node, signal) => observeSize(node, signal)),
                    on('pointerleave', () => {
                      if (hover !== null) {
                        hover = null
                        handle.update()
                      }
                    }),
                  ]}
                >
                  <svg
                    viewBox={`0 0 ${panelW || 100} ${panelH || 100}`}
                    preserveAspectRatio="none"
                    mix={linesStyle}
                    style={{ opacity: focused ? 0 : 1 }}
                  >
                    {(focused || !panelW ? [] : currentConnections(tick)).map((edge) => (
                      <path
                        key={edge.id}
                        d={routeEdge(edge, panelW, panelH)}
                        fill="none"
                        stroke={edge.color}
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        mix={[
                          animateEntrance({ opacity: 0, duration: 420 }),
                          animateExit({ opacity: 0, duration: 220 }),
                        ]}
                        style={{ filter: `drop-shadow(0 0 5px ${edge.color}aa)` }}
                      />
                    ))}
                  </svg>

                  {SERVICES.map((s, i) => {
                    const isActive = focused && i === active
                    const highlighted = !focused && (hover === i || (hover === null && pulse === i))
                    const pos = POS[i]
                    return (
                      <div
                        mix={[
                          nodeStyle,
                          on('pointerenter', () => {
                            if (mode === 'overview') {
                              hover = i
                              handle.update()
                            }
                          }),
                        ]}
                        style={{
                          left: isActive ? '50%' : `${pos.x}%`,
                          top: isActive ? '17%' : `${pos.y}%`,
                          opacity: focused && !isActive ? 0 : 1,
                          transform: `translate(-50%, -50%) scale(${isActive ? 1.35 : highlighted ? 1.12 : 1})`,
                          pointerEvents: focused && !isActive ? 'none' : 'auto',
                          borderColor: highlighted || isActive ? '#F0965A' : 'rgba(255,255,255,0.16)',
                          boxShadow: highlighted || isActive ? '0 0 30px rgba(240,150,90,0.5)' : 'none',
                          color: highlighted || isActive ? '#F4EEE8' : 'var(--muted)',
                          background:
                            highlighted || isActive
                              ? 'linear-gradient(rgba(240,150,90,0.18), rgba(240,150,90,0.18)), #13151d'
                              : 'var(--surface)',
                        }}
                      >
                        <s.Icon />
                      </div>
                    )
                  })}

                  <div
                    mix={animWrap}
                    style={{
                      opacity: focused ? 1 : 0,
                      transform: focused ? 'translate(-50%, 0) scale(1)' : 'translate(-50%, 12px) scale(0.96)',
                    }}
                  >
                    {focused ? <ShowcaseAnim index={active} /> : null}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </section>
    )
  }
})

const headingStyle = css({
  fontSize: 'clamp(30px, 4.4vw, 48px)',
  lineHeight: 1.08,
  fontWeight: 800,
  letterSpacing: '-0.025em',
})

const stickyWrap = css({
  position: 'sticky',
  top: 0,
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden',
})

const gridStyle = css({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '56px',
  alignItems: 'center',
})

const panelStyle = css({
  position: 'relative',
})

const panelInner = css({
  position: 'relative',
  width: '100%',
  height: 'min(62vh, 560px)',
  borderRadius: '24px',
  border: '1px solid var(--border)',
  background: 'radial-gradient(120% 120% at 50% 0%, rgba(240,150,90,0.06), transparent 55%), var(--surface)',
  overflow: 'hidden',
})

const linesStyle = css({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  transition: 'opacity 500ms ease',
  pointerEvents: 'none',
})

const nodeStyle = css({
  position: 'absolute',
  display: 'grid',
  placeItems: 'center',
  width: '64px',
  height: '64px',
  borderRadius: '18px',
  border: '1px solid var(--border)',
  cursor: 'pointer',
  willChange: 'transform, opacity',
  transition:
    'left 650ms cubic-bezier(0.2,0.8,0.2,1), top 650ms cubic-bezier(0.2,0.8,0.2,1), transform 400ms cubic-bezier(0.2,0.8,0.2,1), opacity 450ms ease, color 300ms ease, background 300ms ease, border-color 300ms ease, box-shadow 300ms ease',
})

const animWrap = css({
  position: 'absolute',
  left: '50%',
  top: '40%',
  width: '74%',
  display: 'grid',
  placeItems: 'center',
  color: '#F4EEE8',
  transition: 'opacity 500ms ease 120ms, transform 500ms cubic-bezier(0.2,0.8,0.2,1) 120ms',
  pointerEvents: 'none',
})

const stackRow = css({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '24px',
  padding: '24px',
  borderRadius: '20px',
  border: '1px solid var(--border)',
  background: 'var(--surface)',
})

const stackIcon = css({
  flex: '0 0 auto',
  display: 'grid',
  placeItems: 'center',
  width: '56px',
  height: '56px',
  borderRadius: '16px',
  color: '#F4EEE8',
  border: '1px solid var(--border)',
  background: 'rgba(240,150,90,0.1)',
})

const dotStyle = css({
  height: '8px',
  borderRadius: '999px',
  transition: 'width 400ms cubic-bezier(0.2,0.8,0.2,1), background 400ms ease',
})
