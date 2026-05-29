import { addEventListeners, clientEntry, css, on, ref, type Handle } from 'remix/ui'

import { IconCart, IconCode, IconDesign, IconGauge, IconServer } from '../ui/icons.tsx'
import { ShowcaseAnim } from '../ui/showcase-graphics.tsx'
import { Container, Eyebrow, GradientText } from '../ui/theme.tsx'

const GENERAL = {
  eyebrow: 'Was wir bauen',
  title: 'Alles für deinen Web-Auftritt — aus einer Hand.',
  body: 'Fünf Disziplinen, ein Team — vom ersten Pixel bis zur Datenbank. Bewege die Maus über ein Icon oder scrolle, um jede Leistung im Detail zu sehen.',
}

const SERVICES = [
  {
    title: 'Webdesign & UX',
    body: 'Markenstarke Interfaces, die Vertrauen schaffen und Besucher gezielt zum Abschluss führen.',
    Icon: IconDesign,
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
    title: 'Performance & SEO',
    body: 'Core Web Vitals im grünen Bereich und technisches SEO, damit du gefunden wirst.',
    Icon: IconGauge,
  },
]

// Overview constellation positions (percent of the panel box).
const POS = [
  { x: 24, y: 30 },
  { x: 74, y: 24 },
  { x: 50, y: 53 },
  { x: 28, y: 77 },
  { x: 78, y: 74 },
]

const LINKS: Array<[number, number]> = [
  [2, 0],
  [2, 1],
  [2, 3],
  [2, 4],
  [0, 1],
  [3, 4],
]

function curve(a: { x: number; y: number }, b: { x: number; y: number }, k = 0.16): string {
  const mx = (a.x + b.x) / 2
  const my = (a.y + b.y) / 2
  const dx = b.x - a.x
  const dy = b.y - a.y
  const cx = mx - dy * k
  const cy = my + dx * k
  return `M${a.x} ${a.y} Q${cx} ${cy} ${b.x} ${b.y}`
}

const PATHS = LINKS.map(([a, b]) => curve(POS[a], POS[b]))

export const Showcase = clientEntry(import.meta.url, function Showcase(handle: Handle) {
  // State (overview by default; SSR renders the stacked, no-JS-friendly list).
  let pinned = false
  let mode: 'overview' | 'focus' = 'overview'
  let index = 0
  let hover: number | null = null
  let pulse = 0

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

    const timer = setInterval(() => {
      if (pinned && mode === 'overview' && hover === null) {
        pulse = (pulse + 1) % SERVICES.length
        handle.update()
      }
    }, 2200)
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
                  mix={[panelInner, on('pointerleave', () => {
                    if (hover !== null) {
                      hover = null
                      handle.update()
                    }
                  })]}
                >
                  <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    mix={linesStyle}
                    style={{ opacity: focused ? 0 : 0.7 }}
                  >
                    {PATHS.map((d) => (
                      <path
                        d={d}
                        fill="none"
                        stroke="#F4EEE8"
                        stroke-width="1.4"
                        stroke-linecap="round"
                        vector-effect="non-scaling-stroke"
                        style={{ strokeDasharray: '4 6', animation: 'dashFlow 1.4s linear infinite' }}
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
                          background: highlighted || isActive ? 'rgba(240,150,90,0.12)' : 'var(--surface)',
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
