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

/** The inweb logo mark (provided artwork). Inherits no color — uses its own
 * cream + amber fills, which sit well on the dark canvas. */
export function LogoMark() {
  return ({ size = 28 }: { size?: number }) => (
    <svg
      width={(size * 77) / 73}
      height={size}
      viewBox="0 0 77 73"
      fill="none"
      role="img"
      aria-label="inweb"
    >
      <path d="M26.9574 40.7648L13.7418 31.5265L11.966 51.1695L25.1817 60.4077L26.9574 40.7648Z" fill="#F4EEE8" />
      <path d="M65.3809 22.6021L52.1652 13.3638L50.3895 33.0067L63.6051 42.245L65.3809 22.6021Z" fill="#F4EEE8" />
      <path d="M62.4543 53.85L37.592 65.6023L39.2937 49.3127L48.7866 44.8254L62.4543 53.85Z" fill="#F4EEE8" />
      <path d="M15.8215 18.3764L40.6837 6.62405L38.982 22.9137L29.4892 27.401L15.8215 18.3764Z" fill="#F4EEE8" />
      <path d="M37.0173 40.9869L36.5244 32.9242L42.4418 38.4228L37.0173 40.9869Z" fill="#F0965A" />
    </svg>
  )
}

/** Logo lockup: mark + wordmark. */
export function Wordmark() {
  return ({ size = 28 }: { size?: number }) => (
    <span
      mix={css({
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '21px',
        fontWeight: 800,
        letterSpacing: '-0.02em',
        color: 'var(--text)',
      })}
    >
      <LogoMark size={size} />
      inweb
    </span>
  )
}

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
          color: '#000',
          WebkitTextFillColor: '#000',
          fontWeight: 700,
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
        '@media (min-width: 768px)': { paddingBlock: '128px' },
      })}
      style={tone === 'soft' ? { background: 'var(--bg-soft)' } : undefined}
    >
      {children}
    </section>
  )
}
