import { css, type RemixNode } from 'remix/ui'

import { Effects } from '../assets/effects.tsx'
import { routes } from '../routes.ts'
import { Document } from './document.tsx'
import { Footer } from './home-page.tsx'
import { IconArrowLeft, IconCheck, IconGauge, IconServer } from './icons.tsx'
import type { Project } from './projects.ts'
import { Container, Eyebrow, FONT_MONO, GradientText, PrimaryCta, Wordmark } from './theme.tsx'

export function ReferenzDetailPage() {
  return ({ project }: { project: Project }) => (
    <Document title={`${project.title} — inweb`} description={project.summary}>
      <TopBar />

      <main mix={css({ paddingTop: '40px' })}>
        {/* Hero */}
        <Container>
          <div mix={css({ maxWidth: '900px', display: 'flex', flexDirection: 'column', gap: '22px' })}>
            <div data-reveal>
              <Eyebrow>
                {project.category} · {project.year}
              </Eyebrow>
            </div>
            <h1
              data-reveal
              data-reveal-delay="80"
              mix={css({
                fontSize: 'clamp(34px, 5.4vw, 60px)',
                lineHeight: 1.04,
                fontWeight: 800,
                letterSpacing: '-0.03em',
              })}
            >
              <GradientText>{project.title}</GradientText>
            </h1>
            <p
              data-reveal
              data-reveal-delay="160"
              mix={css({ fontSize: 'clamp(17px, 2.2vw, 21px)', color: 'var(--muted)', maxWidth: '62ch' })}
            >
              {project.intro}
            </p>
            <div data-reveal data-reveal-delay="240" mix={css({ display: 'flex', flexWrap: 'wrap', gap: '8px' })}>
              {project.services.map((s) => (
                <span mix={chip}>{s}</span>
              ))}
            </div>
          </div>

          <div
            data-reveal
            data-reveal-delay="120"
            mix={css({
              marginTop: '44px',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '1px solid var(--border)',
              boxShadow: '0 30px 80px -40px rgba(0,0,0,0.9)',
            })}
          >
            <img
              src={project.image}
              alt={project.title}
              mix={css({ width: '100%', height: 'auto', display: 'block' })}
            />
          </div>
        </Container>

        {/* Story + metrics */}
        <section mix={css({ paddingBlock: '80px' })}>
          <Container>
            <div
              mix={css({
                display: 'grid',
                gap: '20px',
                gridTemplateColumns: '1fr',
                '@media (min-width: 900px)': { gridTemplateColumns: 'repeat(3, 1fr)' },
              })}
            >
              <StoryBlock icon={<IconGauge />} title="Herausforderung" body={project.challenge} />
              <StoryBlock icon={<IconServer />} title="Lösung" body={project.solution} />
              <StoryBlock icon={<IconCheck />} title="Ergebnis" body={project.result} />
            </div>

            <div
              data-reveal
              mix={css({
                marginTop: '40px',
                display: 'grid',
                gap: '8px',
                gridTemplateColumns: 'repeat(3, 1fr)',
                padding: '36px 8px',
                borderRadius: '22px',
                background: 'var(--bg-soft)',
                border: '1px solid var(--border)',
              })}
            >
              {project.metrics.map((m) => (
                <div mix={css({ textAlign: 'center', padding: '12px' })}>
                  <div mix={metricValue}>{m.value}</div>
                  <div mix={css({ fontSize: '14px', color: 'var(--muted)', marginTop: '6px' })}>
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section mix={css({ paddingBottom: '100px' })}>
          <Container>
            <div data-reveal mix={ctaBand}>
              <h2 mix={css({ fontSize: 'clamp(26px, 3.4vw, 40px)', fontWeight: 800, letterSpacing: '-0.025em' })}>
                Dein Projekt als <GradientText>Nächstes?</GradientText>
              </h2>
              <p mix={css({ color: 'var(--muted)', maxWidth: '46ch', margin: '0 auto' })}>
                Lass uns in einem kostenlosen Erstgespräch über deine Idee sprechen.
              </p>
              <div mix={css({ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' })}>
                <PrimaryCta href="/#kontakt">Kostenloses Erstgespräch</PrimaryCta>
                <a href={routes.home.href() + '#referenzen'} mix={backInline}>
                  Weitere Projekte
                </a>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
      <Effects />
    </Document>
  )
}

function TopBar() {
  return () => (
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
          <a href={routes.home.href() + '#referenzen'} mix={backInline}>
            <span mix={css({ '& svg': { width: '17px', height: '17px' } })}>
              <IconArrowLeft />
            </span>
            Alle Referenzen
          </a>
        </div>
      </Container>
    </header>
  )
}

function StoryBlock() {
  return ({ icon, title, body }: { icon: RemixNode; title: string; body: string }) => (
    <article data-reveal mix={storyStyle}>
      <span mix={storyIcon}>{icon}</span>
      <h2 mix={css({ fontSize: '18px', fontWeight: 700, marginBottom: '10px' })}>{title}</h2>
      <p mix={css({ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.7 })}>{body}</p>
    </article>
  )
}

const chip = css({
  fontFamily: FONT_MONO,
  fontSize: '12px',
  letterSpacing: '0.03em',
  color: 'var(--text)',
  padding: '6px 12px',
  borderRadius: '999px',
  border: '1px solid var(--border-strong)',
  background: 'rgba(255,255,255,0.03)',
})

const storyStyle = css({
  height: '100%',
  padding: '28px',
  borderRadius: '20px',
  background: 'var(--surface)',
  border: '1px solid var(--border)',
})

const storyIcon = css({
  display: 'grid',
  placeItems: 'center',
  width: '46px',
  height: '46px',
  borderRadius: '13px',
  marginBottom: '18px',
  color: '#F4EEE8',
  background: 'rgba(240,150,90,0.1)',
  border: '1px solid var(--border)',
  '& svg': { width: '22px', height: '22px' },
})

const metricValue = css({
  fontSize: 'clamp(30px, 4.4vw, 46px)',
  fontWeight: 800,
  letterSpacing: '-0.03em',
  color: 'transparent',
  backgroundImage: 'var(--brand-grad)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
})

const ctaBand = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: '18px',
  padding: '56px 32px',
  borderRadius: '28px',
  background: 'radial-gradient(120% 120% at 50% 0%, rgba(240,150,90,0.08), transparent 60%), var(--surface)',
  border: '1px solid var(--border-strong)',
})

const backInline = css({
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
