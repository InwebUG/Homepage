import { css, type RemixNode } from 'remix/ui'

/**
 * Per-topic line-art animations shown beneath the focused icon in the showcase.
 * Same visual language as the constellation icons: cream strokes, amber accents,
 * rounded line-art. Motion is driven by global @keyframes (see document.tsx).
 */

const CREAM = '#F4EEE8'
const AMBER = '#F0965A'

function Frame() {
  return ({ children }: { children: RemixNode }) => (
    <svg
      viewBox="0 0 220 150"
      fill="none"
      stroke={CREAM}
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      mix={css({ width: '100%', height: 'auto', maxWidth: '320px', display: 'block' })}
    >
      {children}
    </svg>
  )
}

// 0 — Webdesign & UX: a browser window assembling itself.
function AnimDesign() {
  return () => (
    <Frame>
      <rect x="26" y="20" width="168" height="110" rx="12" />
      <line x1="26" y1="44" x2="194" y2="44" />
      <circle cx="40" cy="32" r="3.2" fill={AMBER} stroke="none" />
      <circle cx="52" cy="32" r="3.2" fill={CREAM} stroke="none" />
      <circle cx="64" cy="32" r="3.2" fill={CREAM} stroke="none" />
      <rect x="40" y="58" width="64" height="11" rx="4" style={{ animation: 'nodePulse 2.4s ease-in-out infinite' }} />
      <rect x="40" y="78" width="108" height="8" rx="4" style={{ animation: 'nodePulse 2.4s ease-in-out 0.3s infinite' }} />
      <rect x="40" y="94" width="84" height="8" rx="4" style={{ animation: 'nodePulse 2.4s ease-in-out 0.6s infinite' }} />
      <rect x="126" y="58" width="48" height="44" rx="8" stroke={AMBER} style={{ animation: 'nodePulse 2.4s ease-in-out 0.15s infinite' }} />
      <path d="M150 96l0 22 6-6 4 9 4-2-4-9 8 0z" fill={CREAM} stroke="none" style={{ animation: 'bob 2.2s ease-in-out infinite' }} />
    </Frame>
  )
}

// Vereinsseiten: member card, member nodes & a donation receipt with a check.
function AnimClub() {
  return () => (
    <Frame>
      {/* membership card */}
      <rect x="26" y="40" width="92" height="66" rx="10" />
      <circle cx="50" cy="62" r="9" />
      <path d="M42 82a8 8 0 0 1 16 0" />
      <line x1="70" y1="56" x2="106" y2="56" />
      <line x1="70" y1="70" x2="100" y2="70" />
      <line x1="70" y1="84" x2="104" y2="84" stroke={AMBER} />
      {/* member nodes (management) */}
      <circle cx="40" cy="124" r="4" fill={CREAM} stroke="none" style={{ animation: 'nodePulse 1.8s ease-in-out infinite' }} />
      <circle cx="58" cy="128" r="4" fill={CREAM} stroke="none" style={{ animation: 'nodePulse 1.8s ease-in-out 0.4s infinite' }} />
      <circle cx="76" cy="124" r="4" fill={AMBER} stroke="none" style={{ animation: 'nodePulse 1.8s ease-in-out 0.8s infinite' }} />
      {/* donation receipt */}
      <rect x="140" y="34" width="54" height="80" rx="6" stroke={AMBER} />
      <line x1="150" y1="50" x2="184" y2="50" style={{ strokeDasharray: 50, animation: 'dashFlow 1.6s linear infinite' }} />
      <line x1="150" y1="62" x2="184" y2="62" style={{ strokeDasharray: 50, animation: 'dashFlow 1.9s linear infinite' }} />
      <line x1="150" y1="74" x2="172" y2="74" />
      <path d="M150 92l7 7 13 -16" stroke={AMBER} style={{ strokeDasharray: 120, animation: 'drawLine 1.8s ease infinite' }} />
    </Frame>
  )
}

// Zahlungsabwicklungen: card with contactless waves and a confirmation check.
function AnimPay() {
  return () => (
    <Frame>
      <rect x="34" y="44" width="104" height="66" rx="10" />
      <rect x="48" y="60" width="18" height="13" rx="3" stroke={AMBER} />
      <line x1="48" y1="92" x2="124" y2="92" style={{ strokeDasharray: 90, animation: 'dashFlow 1.6s linear infinite' }} />
      <line x1="48" y1="100" x2="92" y2="100" />
      {/* contactless waves */}
      <path d="M150 60a16 16 0 0 1 0 34" style={{ animation: 'nodePulse 1.6s ease-in-out infinite' }} />
      <path d="M160 50a28 28 0 0 1 0 54" stroke={AMBER} style={{ animation: 'nodePulse 1.6s ease-in-out 0.4s infinite' }} />
      {/* confirmation */}
      <circle cx="120" cy="118" r="16" stroke={AMBER} />
      <path d="M113 118l5 5 9 -11" style={{ strokeDasharray: 120, animation: 'drawLine 1.8s ease infinite' }} />
    </Frame>
  )
}

// 1 — Frontend: code drawing in with a blinking caret.
function AnimCode() {
  return () => (
    <Frame>
      <path d="M64 48L40 75l24 27" stroke={CREAM} style={{ strokeDasharray: 120, animation: 'drawLine 1.6s ease forwards' }} />
      <path d="M156 48l24 27-24 27" stroke={CREAM} style={{ strokeDasharray: 120, animation: 'drawLine 1.6s ease 0.2s forwards' }} />
      <path d="M118 40l-16 70" stroke={AMBER} style={{ strokeDasharray: 120, animation: 'drawLine 1.6s ease 0.4s forwards' }} />
      <line x1="86" y1="64" x2="120" y2="64" style={{ strokeDasharray: 60, animation: 'dashFlow 1.6s linear infinite' }} />
      <line x1="86" y1="78" x2="134" y2="78" style={{ strokeDasharray: 60, animation: 'dashFlow 1.9s linear infinite' }} />
      <line x1="86" y1="92" x2="112" y2="92" style={{ strokeDasharray: 60, animation: 'dashFlow 1.4s linear infinite' }} />
      <line x1="140" y1="86" x2="140" y2="98" stroke={AMBER} style={{ animation: 'blink 1s step-end infinite' }} />
    </Frame>
  )
}

// 2 — Backend & APIs: server stack with a pulsing request flow.
function AnimServer() {
  return () => (
    <Frame>
      <circle cx="34" cy="75" r="12" />
      <path d="M46 75q34 -34 76 -34" stroke={AMBER} style={{ strokeDasharray: '6 8', animation: 'dashFlow 0.9s linear infinite' }} />
      <path d="M46 75q34 34 76 34" stroke={CREAM} style={{ strokeDasharray: '6 8', animation: 'dashFlow 1.1s linear infinite reverse' }} />
      <rect x="124" y="30" width="66" height="26" rx="6" />
      <rect x="124" y="62" width="66" height="26" rx="6" />
      <rect x="124" y="94" width="66" height="26" rx="6" />
      <circle cx="138" cy="43" r="3.4" fill={AMBER} stroke="none" style={{ animation: 'nodePulse 1.6s ease-in-out infinite' }} />
      <circle cx="138" cy="75" r="3.4" fill={CREAM} stroke="none" style={{ animation: 'nodePulse 1.6s ease-in-out 0.4s infinite' }} />
      <circle cx="138" cy="107" r="3.4" fill={CREAM} stroke="none" style={{ animation: 'nodePulse 1.6s ease-in-out 0.8s infinite' }} />
    </Frame>
  )
}

// 3 — E-Commerce: items dropping into a cart.
function AnimCart() {
  return () => (
    <Frame>
      <rect x="86" y="34" width="18" height="18" rx="3" stroke={AMBER} style={{ animation: 'dropIn 2.2s ease-in-out infinite' }} />
      <rect x="112" y="30" width="16" height="16" rx="3" style={{ animation: 'dropIn 2.2s ease-in-out 0.5s infinite' }} />
      <rect x="98" y="26" width="14" height="14" rx="3" style={{ animation: 'dropIn 2.2s ease-in-out 1s infinite' }} />
      <path d="M40 70h16l10 40h58l12-30H64" />
      <circle cx="78" cy="122" r="6" />
      <circle cx="118" cy="122" r="6" />
    </Frame>
  )
}

// 4 — Performance & SEO: a gauge needle sweeping into the green.
function AnimGauge() {
  return () => (
    <Frame>
      <path d="M52 112a58 58 0 0 1 116 0" />
      <path d="M138 112a48 48 0 0 0 -20 -39" stroke={AMBER} />
      <line x1="110" y1="112" x2="110" y2="60" stroke={AMBER} style={{ transformBox: 'view-box', transformOrigin: '110px 112px', animation: 'needleSweep 2.6s ease-in-out infinite' }} />
      <circle cx="110" cy="112" r="5" fill={CREAM} stroke="none" />
      <line x1="64" y1="100" x2="58" y2="96" />
      <line x1="110" y1="62" x2="110" y2="56" />
      <line x1="156" y1="100" x2="162" y2="96" />
    </Frame>
  )
}

// Order must match SERVICES in app/assets/showcase.tsx.
const ANIMS = [AnimDesign, AnimClub, AnimCode, AnimServer, AnimCart, AnimPay, AnimGauge]

export function ShowcaseAnim() {
  return ({ index }: { index: number }) => {
    const Anim = ANIMS[index] ?? AnimDesign
    return <Anim />
  }
}
