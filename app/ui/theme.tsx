import { css, type RemixNode } from 'remix/ui'

/**
 * Shared visual language for the onepager. The palette is a dark, high-contrast
 * canvas with the Remix-style five-stop rainbow used for accents and glows.
 */

export const BRAND_GRADIENT =
  'linear-gradient(110deg, #20AAFF 0%, #80E464 28%, #FFDF5F 52%, #FF65DB 76%, #FF5148 100%)'

/** Design tokens, applied once on <body> in document.tsx. */
export const themeTokens = {
  '--bg': '#08090d',
  '--bg-soft': '#0d0f15',
  '--surface': '#13151d',
  '--surface-2': '#191c26',
  '--border': 'rgba(255, 255, 255, 0.08)',
  '--border-strong': 'rgba(255, 255, 255, 0.16)',
  '--text': '#eceef4',
  '--muted': '#a2a8b6',
  '--faint': '#6a7080',
  '--brand': '#20AAFF',
  '--brand-pink': '#FF65DB',
  '--brand-grad': BRAND_GRADIENT,
}

export const FONT_SANS =
  "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
export const FONT_MONO = "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"

/** Centered, padded content column shared by every section. */
export function Container() {
  return ({ children, wide = false }: { children: RemixNode; wide?: boolean }) => (
    <div
      mix={css({
        width: '100%',
        marginInline: 'auto',
        paddingInline: '24px',
        '@media (min-width: 768px)': { paddingInline: '40px' },
      })}
      style={{ maxWidth: wide ? '1240px' : '1120px' }}
    >
      {children}
    </div>
  )
}

/** Small mono label with a gradient bullet — the section "kicker". */
export function Eyebrow() {
  return ({ children }: { children: RemixNode }) => (
    <span
      mix={css({
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        fontFamily: FONT_MONO,
        fontSize: '12px',
        fontWeight: 600,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'var(--muted)',
        '&::before': {
          content: '""',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundImage: 'var(--brand-grad)',
          boxShadow: '0 0 12px rgba(32, 170, 255, 0.7)',
        },
      })}
    >
      {children}
    </span>
  )
}

/** Inline text painted with the brand gradient. */
export function GradientText() {
  return ({ children }: { children: RemixNode }) => (
    <span
      mix={css({
        backgroundImage: 'var(--brand-grad)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        WebkitTextFillColor: 'transparent',
      })}
    >
      {children}
    </span>
  )
}

/** Primary call-to-action. Renders an anchor so it works without JS; the global
 * effects layer makes any `[data-magnetic]` element follow the cursor. */
export function PrimaryCta() {
  return ({ href, children }: { href: string; children: RemixNode }) => (
    <a
      href={href}
      data-magnetic
      mix={[
        ctaBase,
        css({
          color: '#06070a',
          backgroundImage: 'var(--brand-grad)',
          backgroundSize: '180% 180%',
          boxShadow: '0 10px 40px -12px rgba(32, 170, 255, 0.6)',
          animation: 'ctaSheen 6s ease infinite',
          '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 16px 48px -10px rgba(255, 101, 219, 0.6)' },
        }),
      ]}
    >
      {children}
      <Arrow />
    </a>
  )
}

/** Secondary / ghost call-to-action. */
export function SecondaryCta() {
  return ({ href, children }: { href: string; children: RemixNode }) => (
    <a
      href={href}
      data-magnetic
      mix={[
        ctaBase,
        css({
          color: 'var(--text)',
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid var(--border-strong)',
          backdropFilter: 'blur(8px)',
          '&:hover': {
            transform: 'translateY(-2px)',
            borderColor: 'rgba(255,255,255,0.32)',
            background: 'rgba(255, 255, 255, 0.08)',
          },
        }),
      ]}
    >
      {children}
    </a>
  )
}

function Arrow() {
  return () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8h9M8.5 4l4 4-4 4"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

const ctaBase = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  padding: '15px 26px',
  borderRadius: '999px',
  fontFamily: FONT_SANS,
  fontSize: '15px',
  fontWeight: 600,
  letterSpacing: '0.01em',
  textDecoration: 'none',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  willChange: 'transform',
  transition: 'transform 250ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 250ms ease, border-color 250ms ease, background 250ms ease',
  '@media (max-width: 430px)': { padding: '12px 18px', fontSize: '14px', gap: '8px' },
})

/** Shared shell for a content section: vertical rhythm + reveal hook. */
export function Section() {
  return ({ id, children, tone }: { id?: string; children: RemixNode; tone?: 'soft' }) => (
    <section
      id={id}
      mix={css({
        position: 'relative',
        paddingBlock: '96px',
        scrollMarginTop: '88px',
        '@media (min-width: 768px)': { paddingBlock: '128px' },
      })}
      style={tone === 'soft' ? { background: 'var(--bg-soft)' } : undefined}
    >
      {children}
    </section>
  )
}
