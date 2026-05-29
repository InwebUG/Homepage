import { clientEntry, css, on, ref, type Handle } from 'remix/ui'

import { routes } from '../routes.ts'
import { FONT_SANS } from '../ui/theme.tsx'

/**
 * GDPR-friendly analytics consent. Google Analytics is loaded ONLY after the
 * visitor explicitly accepts; the choice is remembered in localStorage. The
 * banner stays hidden for visitors who already decided (no flash on return).
 *
 * Set your Measurement ID below to activate Google Analytics. While it is empty
 * the banner still records consent, but no analytics script is loaded.
 */
const GA_MEASUREMENT_ID = '' // e.g. 'G-XXXXXXXXXX'
const STORAGE_KEY = 'inweb-analytics-consent'

declare global {
  interface Window {
    dataLayer?: unknown[]
    __gaLoaded?: boolean
  }
}

function loadAnalytics() {
  if (!GA_MEASUREMENT_ID || window.__gaLoaded) return
  window.__gaLoaded = true
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)
  window.dataLayer = window.dataLayer || []
  function gtag(...args: unknown[]) {
    window.dataLayer!.push(args)
  }
  gtag('js', new Date())
  gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true })
}

export const ConsentBanner = clientEntry(import.meta.url, function ConsentBanner(handle: Handle) {
  // Hidden by default so returning visitors never see a flash; the ref decides.
  let visible = false
  let ready = false

  function decide(value: 'granted' | 'denied') {
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch {
      /* ignore */
    }
    if (value === 'granted') loadAnalytics()
    visible = false
    handle.update()
  }

  function init() {
    if (ready) return
    ready = true
    let stored: string | null = null
    try {
      stored = localStorage.getItem(STORAGE_KEY)
    } catch {
      /* ignore */
    }
    if (stored === 'granted') {
      loadAnalytics()
    } else if (stored !== 'denied') {
      visible = true
    }
    handle.update()
  }

  return () => (
    <div
      aria-hidden={visible ? undefined : 'true'}
      mix={[wrap, ref(() => init())]}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(140%)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <div mix={card}>
        <p mix={text}>
          Wir nutzen Cookies für anonyme Statistik (Google Analytics), um unsere Website zu
          verbessern. Mehr dazu in der{' '}
          <a href={routes.datenschutz.href()} mix={link}>
            Datenschutzerklärung
          </a>
          .
        </p>
        <div mix={actions}>
          <button type="button" mix={[btnBase, decline, on('click', () => decide('denied'))]}>
            Ablehnen
          </button>
          <button type="button" mix={[btnBase, accept, on('click', () => decide('granted'))]}>
            Akzeptieren
          </button>
        </div>
      </div>
    </div>
  )
})

const wrap = css({
  position: 'fixed',
  left: '16px',
  right: '16px',
  bottom: '16px',
  zIndex: 200,
  display: 'flex',
  justifyContent: 'center',
  transition: 'opacity 400ms ease, transform 400ms cubic-bezier(0.2,0.8,0.2,1)',
})

const card = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
  width: '100%',
  maxWidth: '560px',
  padding: '20px 22px',
  borderRadius: '18px',
  background: 'rgba(13,15,21,0.92)',
  backdropFilter: 'blur(14px)',
  border: '1px solid var(--border-strong)',
  boxShadow: '0 24px 60px -24px rgba(0,0,0,0.9)',
  fontFamily: FONT_SANS,
  '@media (min-width: 560px)': { flexDirection: 'row', alignItems: 'center', gap: '20px' },
})

const text = css({
  fontSize: '14px',
  lineHeight: 1.55,
  color: 'var(--muted)',
  flex: '1 1 auto',
})

const link = css({ color: 'var(--text)', textDecoration: 'underline', textUnderlineOffset: '3px' })

const actions = css({ display: 'flex', gap: '10px', flex: '0 0 auto' })

const btnBase = css({
  appearance: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '10px 18px',
  borderRadius: '999px',
  fontSize: '14px',
  fontWeight: 700,
  fontFamily: FONT_SANS,
  whiteSpace: 'nowrap',
  transition: 'transform 200ms ease, background 200ms ease, border-color 200ms ease',
  '&:hover': { transform: 'translateY(-1px)' },
})

const decline = css({
  background: 'transparent',
  color: 'var(--text)',
  border: '1px solid var(--border-strong)',
  '&:hover': { borderColor: 'rgba(255,255,255,0.32)' },
})

const accept = css({
  color: '#000',
  WebkitTextFillColor: '#000',
  backgroundImage: 'var(--brand-grad)',
  backgroundSize: '160% 160%',
})
