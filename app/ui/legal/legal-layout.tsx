import { css, type RemixNode } from 'remix/ui'

import { Effects } from '../../assets/effects.tsx'
import { Document } from '../document.tsx'
import { Footer } from '../home-page.tsx'
import { IconArrowLeft } from '../icons.tsx'
import { Container, Eyebrow, FONT_MONO, GradientText, Wordmark } from '../theme.tsx'

export interface LegalLayoutProps {
  title: string
  kicker: string
  intro: string
  updated?: string
  children: RemixNode
}

export function LegalLayout() {
  return ({ title, kicker, intro, updated, children }: LegalLayoutProps) => (
    <Document title={`${title} — inweb`} description={intro}>
      <header
        mix={css({
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'rgba(8,9,13,0.72)',
          backdropFilter: 'blur(14px)',
          borderBottom: '1px solid var(--border)',
        })}
      >
        <Container wide>
          <div
            mix={css({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '72px',
            })}
          >
            <a href="/" mix={css({ textDecoration: 'none' })}>
              <Wordmark />
            </a>
            <a href="/" mix={backLink}>
              <span mix={css({ '& svg': { width: '17px', height: '17px' } })}>
                <IconArrowLeft />
              </span>
              Zur Startseite
            </a>
          </div>
        </Container>
      </header>

      <main mix={css({ paddingBlock: '72px 96px' })}>
        <Container>
          <div mix={css({ maxWidth: '820px', marginInline: 'auto' })}>
            <div mix={css({ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '48px' })}>
              <Eyebrow>{kicker}</Eyebrow>
              <h1
                mix={css({
                  fontSize: 'clamp(34px, 5vw, 54px)',
                  lineHeight: 1.05,
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                })}
              >
                <GradientText>{title}</GradientText>
              </h1>
              <p mix={css({ fontSize: '18px', color: 'var(--muted)' })}>{intro}</p>
              {updated ? (
                <p mix={css({ fontSize: '13px', color: 'var(--faint)', fontFamily: FONT_MONO })}>
                  Stand: {updated}
                </p>
              ) : null}
            </div>
            <div mix={css({ display: 'flex', flexDirection: 'column', gap: '20px' })}>{children}</div>
          </div>
        </Container>
      </main>

      <Footer />
      <Effects />
    </Document>
  )
}

/** A titled content block with an icon — the building block of both legal pages. */
export function LegalSection() {
  return ({ icon, title, children }: { icon: RemixNode; title: string; children: RemixNode }) => (
    <section data-reveal mix={sectionStyle}>
      <div mix={sectionHead}>
        <span mix={iconBadge}>{icon}</span>
        <h2 mix={css({ fontSize: '20px', fontWeight: 700 })}>{title}</h2>
      </div>
      <div
        mix={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          color: 'var(--muted)',
          fontSize: '15.5px',
          lineHeight: 1.7,
          '& a': { color: 'var(--text)', textDecoration: 'underline', textUnderlineOffset: '3px' },
          '& strong': { color: 'var(--text)', fontWeight: 600 },
          '& ul': { display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '4px' },
          '& li': { display: 'flex', gap: '10px', alignItems: 'flex-start' },
          '& li::before': { content: '"—"', color: 'var(--brand)' },
        })}
      >
        {children}
      </div>
    </section>
  )
}

/** Icon + label rows used in the Impressum. */
export function InfoRow() {
  return ({ icon, label, children }: { icon: RemixNode; label: string; children: RemixNode }) => (
    <div mix={css({ display: 'flex', gap: '14px', alignItems: 'flex-start' })}>
      <span mix={rowIcon}>{icon}</span>
      <div>
        <div mix={css({ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--faint)', marginBottom: '2px' })}>
          {label}
        </div>
        <div mix={css({ color: 'var(--text)' })}>{children}</div>
      </div>
    </div>
  )
}

const backLink = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '14px',
  fontWeight: 500,
  color: 'var(--muted)',
  textDecoration: 'none',
  transition: 'color 200ms ease',
  '&:hover': { color: 'var(--text)' },
})

const sectionStyle = css({
  padding: '28px',
  borderRadius: '20px',
  background: 'var(--surface)',
  border: '1px solid var(--border)',
})

const sectionHead = css({
  display: 'flex',
  alignItems: 'center',
  gap: '14px',
  marginBottom: '16px',
})

const iconBadge = css({
  display: 'grid',
  placeItems: 'center',
  width: '44px',
  height: '44px',
  flex: '0 0 auto',
  borderRadius: '12px',
  color: '#F4EEE8',
  background: 'rgba(240,150,90,0.1)',
  border: '1px solid var(--border)',
  '& svg': { width: '22px', height: '22px' },
})

const rowIcon = css({
  display: 'grid',
  placeItems: 'center',
  width: '38px',
  height: '38px',
  flex: '0 0 auto',
  borderRadius: '10px',
  color: 'var(--brand)',
  background: 'rgba(32,170,255,0.1)',
  '& svg': { width: '19px', height: '19px' },
})
