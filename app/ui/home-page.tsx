import { css, type RemixNode } from 'remix/ui'

import { BookingForm } from '../assets/booking-form.tsx'
import { Effects } from '../assets/effects.tsx'
import { routes } from '../routes.ts'
import { Document } from './document.tsx'
import {
  IconCart,
  IconCheck,
  IconCode,
  IconDesign,
  IconGauge,
  IconServer,
} from './icons.tsx'
import {
  Container,
  Eyebrow,
  FONT_MONO,
  GradientText,
  PrimaryCta,
  SecondaryCta,
  Section,
} from './theme.tsx'

const BOOK_HREF = routes.book.href()

export function HomePage() {
  return ({ booked = false }: { booked?: boolean }) => (
    <Document>
      <NavBar />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <Process />
        <Proof />
        <BookingSection booked={booked} />
      </main>
      <Footer />
      <Effects />
    </Document>
  )
}

// ===========================================================================
// Navigation
// ===========================================================================
const NAV_LINKS = [
  ['#leistungen', 'Leistungen'],
  ['#ablauf', 'Ablauf'],
  ['#referenzen', 'Referenzen'],
  ['#kontakt', 'Kontakt'],
] as const

function NavBar() {
  return () => (
    <nav
      data-nav
      mix={css({
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'background 300ms ease, border-color 300ms ease, backdrop-filter 300ms ease',
        borderBottom: '1px solid transparent',
        '&.scrolled': {
          background: 'rgba(8,9,13,0.72)',
          backdropFilter: 'blur(14px)',
          borderBottomColor: 'var(--border)',
        },
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
          <a href="#start" mix={css({ textDecoration: 'none' })}>
            <Wordmark />
          </a>
          <div
            mix={css({
              display: 'none',
              alignItems: 'center',
              gap: '34px',
              '@media (min-width: 900px)': { display: 'flex' },
            })}
          >
            {NAV_LINKS.map(([href, label]) => (
              <a
                href={href}
                data-navlink
                mix={css({
                  fontSize: '15px',
                  fontWeight: 500,
                  color: 'var(--muted)',
                  textDecoration: 'none',
                  transition: 'color 200ms ease',
                  '&:hover, &.active': { color: 'var(--text)' },
                })}
              >
                {label}
              </a>
            ))}
          </div>
          <PrimaryCta href="#kontakt">
            Termin<span className="hide-sm"> sichern</span>
          </PrimaryCta>
        </div>
      </Container>
    </nav>
  )
}

function Wordmark() {
  return () => (
    <span
      mix={css({
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '21px',
        fontWeight: 800,
        letterSpacing: '-0.02em',
      })}
    >
      <span
        mix={css({
          width: '12px',
          height: '12px',
          borderRadius: '4px',
          backgroundImage: 'var(--brand-grad)',
          boxShadow: '0 0 16px rgba(32,170,255,0.7)',
        })}
      />
      inweb
    </span>
  )
}

// ===========================================================================
// Hero
// ===========================================================================
function Hero() {
  return () => (
    <section
      id="start"
      mix={css({
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '150px',
        paddingBottom: '110px',
        '@media (min-width: 768px)': { paddingTop: '180px', paddingBottom: '140px' },
      })}
    >
      {/* animated aurora + cursor-following glow + grid */}
      <div
        mix={css({
          position: 'absolute',
          inset: '-20% -10% auto -10%',
          height: '720px',
          backgroundImage: 'var(--brand-grad)',
          backgroundSize: '200% 200%',
          opacity: 0.16,
          filter: 'blur(90px)',
          animation: 'auroraShift 14s ease infinite',
          pointerEvents: 'none',
        })}
      />
      <div
        data-glow
        mix={css({
          position: 'absolute',
          width: '520px',
          height: '520px',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(32,170,255,0.22), rgba(255,101,219,0.10) 45%, transparent 70%)',
          pointerEvents: 'none',
          left: '50%',
          top: '30%',
        })}
      />
      <div
        mix={css({
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 35%, #000 30%, transparent 75%)',
          pointerEvents: 'none',
        })}
      />
      <Container>
        <div
          mix={css({
            position: 'relative',
            maxWidth: '880px',
            display: 'flex',
            flexDirection: 'column',
            gap: '28px',
          })}
        >
          <div data-reveal>
            <Eyebrow>Full-Stack Webagentur</Eyebrow>
          </div>
          <h1
            data-reveal
            data-reveal-delay="80"
            mix={css({
              fontSize: 'clamp(40px, 7vw, 78px)',
              lineHeight: 1.04,
              fontWeight: 800,
              letterSpacing: '-0.03em',
            })}
          >
            Websites, die nicht nur gut aussehen —<br />
            <GradientText>sondern verkaufen.</GradientText>
          </h1>
          <p
            data-reveal
            data-reveal-delay="160"
            mix={css({
              fontSize: 'clamp(17px, 2.2vw, 21px)',
              color: 'var(--muted)',
              maxWidth: '60ch',
            })}
          >
            Design, Frontend und skalierbares Backend aus einer Hand. Von der ersten Idee bis zur
            Datenbank entwickeln wir digitale Produkte, die Besucher zu Kunden machen.
          </p>
          <div
            data-reveal
            data-reveal-delay="240"
            mix={css({ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '6px' })}
          >
            <PrimaryCta href="#kontakt">Kostenloses Erstgespräch</PrimaryCta>
            <SecondaryCta href="#referenzen">Arbeiten ansehen</SecondaryCta>
          </div>
          <div data-reveal data-reveal-delay="320">
            <SocialProof />
          </div>
        </div>
      </Container>
    </section>
  )
}

function SocialProof() {
  return () => (
    <div mix={css({ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '18px' })}>
      <div mix={css({ display: 'flex' })}>
        {['#20AAFF', '#80E464', '#FFDF5F', '#FF65DB'].map((c, i) => (
          <span
            mix={css({
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: '2px solid var(--bg)',
            })}
            style={{ background: c, marginLeft: i === 0 ? '0' : '-12px' }}
          />
        ))}
      </div>
      <p mix={css({ fontSize: '14px', color: 'var(--muted)' })}>
        <strong mix={css({ color: 'var(--text)' })}>38+ Projekte</strong> ausgeliefert · 4,9/5 im
        Kundenfeedback
      </p>
    </div>
  )
}

// ===========================================================================
// Trust bar (logo marquee)
// ===========================================================================
const LOGOS = ['NordVolt', 'Helios', 'Kanto', 'Brightside', 'Meridian']

function TrustBar() {
  return () => (
    <div
      mix={css({
        borderBlock: '1px solid var(--border)',
        background: 'var(--bg-soft)',
        paddingBlock: '26px',
        overflow: 'hidden',
        position: 'relative',
        maskImage: 'linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)',
      })}
    >
      <div
        mix={css({
          display: 'flex',
          width: 'max-content',
          gap: '72px',
          animation: 'marquee 26s linear infinite',
        })}
      >
        {[...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS].map((name) => (
          <span
            mix={css({
              fontFamily: FONT_MONO,
              fontSize: '20px',
              fontWeight: 600,
              letterSpacing: '0.02em',
              color: 'var(--faint)',
              whiteSpace: 'nowrap',
            })}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  )
}

// ===========================================================================
// Section header helper
// ===========================================================================
function Header() {
  return ({ kicker, title, lead }: { kicker: string; title: RemixNode; lead?: string }) => (
    <div
      data-reveal
      mix={css({
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        maxWidth: '720px',
        marginBottom: '56px',
      })}
    >
      <Eyebrow>{kicker}</Eyebrow>
      <h2
        mix={css({
          fontSize: 'clamp(30px, 4.4vw, 48px)',
          lineHeight: 1.08,
          fontWeight: 800,
          letterSpacing: '-0.025em',
        })}
      >
        {title}
      </h2>
      {lead ? <p mix={css({ fontSize: '18px', color: 'var(--muted)' })}>{lead}</p> : null}
    </div>
  )
}

// ===========================================================================
// Services
// ===========================================================================
const SERVICES = [
  {
    icon: <IconDesign />,
    title: 'Webdesign & UX',
    body: 'Markenstarke Interfaces, die Vertrauen schaffen und Besucher gezielt zum Abschluss führen.',
    tag: 'Figma · Designsysteme',
  },
  {
    icon: <IconCode />,
    title: 'Frontend-Entwicklung',
    body: 'Pixelgenaue, blitzschnelle Umsetzung mit modernen Frameworks — barrierefrei und responsiv.',
    tag: 'Remix · React · TS',
  },
  {
    icon: <IconServer />,
    title: 'Backend & APIs',
    body: 'Datenbanken, Auth und APIs, die mitwachsen. Dein Produkt steht auf einem soliden Fundament.',
    tag: 'Node · SQL · REST',
  },
  {
    icon: <IconCart />,
    title: 'E-Commerce & Shops',
    body: 'Verkaufsstarke Shops mit Zahlungsanbindung, Checkout-Optimierung und Warenwirtschaft.',
    tag: 'Stripe · Headless',
  },
  {
    icon: <IconGauge />,
    title: 'Performance & SEO',
    body: 'Core Web Vitals im grünen Bereich und technisches SEO, damit du gefunden wirst.',
    tag: 'Lighthouse 95+',
  },
]

function Services() {
  return () => (
    <Section id="leistungen">
      <Container>
        <Header
          kicker="Was wir bauen"
          title={<>Alles für deinen Web-Auftritt — aus einer Hand.</>}
          lead="Fünf Disziplinen, ein Team. Kein Schnittstellen-Ping-Pong zwischen Agenturen."
        />
        <div
          mix={css({
            display: 'grid',
            gap: '20px',
            gridTemplateColumns: '1fr',
            '@media (min-width: 640px)': { gridTemplateColumns: '1fr 1fr' },
            '@media (min-width: 1040px)': { gridTemplateColumns: 'repeat(3, 1fr)' },
          })}
        >
          {SERVICES.map((s, i) => (
            <div data-reveal data-reveal-delay={`${(i % 3) * 90}`}>
              <ServiceCard icon={s.icon} title={s.title} body={s.body} tag={s.tag} />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

function ServiceCard() {
  return ({
    icon,
    title,
    body,
    tag,
  }: {
    icon: RemixNode
    title: string
    body: string
    tag: string
  }) => (
    <article
      data-tilt
      mix={css({
        position: 'relative',
        height: '100%',
        padding: '28px',
        borderRadius: '20px',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        overflow: 'hidden',
        transition: 'border-color 300ms ease, background 300ms ease',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(320px circle at var(--mx, 50%) var(--my, 0%), rgba(32,170,255,0.16), transparent 60%)',
          opacity: 0,
          transition: 'opacity 300ms ease',
          pointerEvents: 'none',
        },
        '&:hover': { borderColor: 'var(--border-strong)', background: 'var(--surface-2)' },
        '&:hover::before': { opacity: 1 },
      })}
    >
      <div
        mix={css({
          display: 'grid',
          placeItems: 'center',
          width: '52px',
          height: '52px',
          borderRadius: '14px',
          marginBottom: '20px',
          color: 'var(--text)',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid var(--border)',
        })}
      >
        {icon}
      </div>
      <h3 mix={css({ fontSize: '20px', fontWeight: 700, marginBottom: '10px' })}>{title}</h3>
      <p mix={css({ fontSize: '15px', color: 'var(--muted)', marginBottom: '18px' })}>{body}</p>
      <span
        mix={css({
          fontFamily: FONT_MONO,
          fontSize: '12px',
          letterSpacing: '0.04em',
          color: 'var(--faint)',
        })}
      >
        {tag}
      </span>
    </article>
  )
}

// ===========================================================================
// Process
// ===========================================================================
const STEPS = [
  ['01', 'Erstgespräch', 'Kostenlos & unverbindlich. Wir verstehen Ziele, Zielgruppe und Budget.'],
  ['02', 'Konzept & Design', 'Struktur, Wireframes und ein klickbares Designsystem zur Freigabe.'],
  ['03', 'Entwicklung', 'Frontend & Backend werden in kurzen Sprints sichtbar und testbar gebaut.'],
  ['04', 'Launch', 'Performance-Check, SEO-Setup und ein reibungsloser Go-Live.'],
  ['05', 'Wachstum', 'Betreuung, Analytics und laufende Optimierung für mehr Conversions.'],
]

function Process() {
  return () => (
    <Section id="ablauf" tone="soft">
      <Container>
        <Header
          kicker="So arbeiten wir"
          title={<>Von der Idee zum Launch — in fünf klaren Schritten.</>}
          lead="Transparent, planbar und ohne Überraschungen. Du weißt jederzeit, woran wir arbeiten."
        />
        <ol
          mix={css({
            display: 'grid',
            gap: '16px',
            gridTemplateColumns: '1fr',
            '@media (min-width: 760px)': { gridTemplateColumns: '1fr 1fr' },
          })}
        >
          {STEPS.map(([num, title, body], i) => (
            <li data-reveal data-reveal-delay={`${(i % 2) * 90}`} mix={stepStyle}>
              <span mix={stepNumStyle}>{num}</span>
              <div>
                <h3 mix={css({ fontSize: '19px', fontWeight: 700, marginBottom: '6px' })}>
                  {title}
                </h3>
                <p mix={css({ fontSize: '15px', color: 'var(--muted)' })}>{body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}

const stepStyle = css({
  display: 'flex',
  gap: '18px',
  alignItems: 'flex-start',
  padding: '24px',
  borderRadius: '18px',
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  transition: 'transform 300ms ease, border-color 300ms ease',
  '&:hover': { transform: 'translateY(-4px)', borderColor: 'var(--border-strong)' },
})

const stepNumStyle = css({
  flex: '0 0 auto',
  fontFamily: FONT_MONO,
  fontSize: '15px',
  fontWeight: 700,
  color: 'transparent',
  backgroundImage: 'var(--brand-grad)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
})

// ===========================================================================
// Proof — testimonials + animated stats
// ===========================================================================
const TESTIMONIALS = [
  [
    'inweb hat unseren Umsatz über die Website innerhalb von drei Monaten verdoppelt. Design, Technik und Tempo — alles top.',
    'Lena Hofmann',
    'Gründerin, Helios Studio',
  ],
  [
    'Endlich eine Agentur, die auch das Backend wirklich versteht. Unsere Plattform skaliert problemlos.',
    'Marc Rieder',
    'CTO, NordVolt',
  ],
  [
    'Vom ersten Gespräch bis zum Launch in sechs Wochen. Professionell, transparent, einfach stark.',
    'Sara Brandt',
    'Marketing-Leitung, Kanto',
  ],
]

const STATS = [
  ['38', '', 0, 'Projekte ausgeliefert'],
  ['100', '%', 0, 'Termintreue'],
  ['1.4', 's', 1, 'Ø Ladezeit'],
  ['4.9', '', 1, 'Bewertung (von 5)'],
] as const

function Proof() {
  return () => (
    <Section id="referenzen">
      <Container>
        <Header
          kicker="Referenzen"
          title={<>Ergebnisse, die für sich sprechen.</>}
          lead="Was Kund:innen über die Zusammenarbeit mit inweb sagen."
        />
        <div
          mix={css({
            display: 'grid',
            gap: '20px',
            gridTemplateColumns: '1fr',
            marginBottom: '56px',
            '@media (min-width: 920px)': { gridTemplateColumns: 'repeat(3, 1fr)' },
          })}
        >
          {TESTIMONIALS.map(([quote, name, role], i) => (
            <figure data-reveal data-reveal-delay={`${(i % 3) * 90}`} mix={quoteStyle}>
              <div mix={css({ display: 'flex', gap: '3px', marginBottom: '14px' })}>
                {[0, 1, 2, 3, 4].map(() => (
                  <Star />
                ))}
              </div>
              <blockquote mix={css({ fontSize: '16px', lineHeight: 1.6, margin: 0 })}>
                “{quote}”
              </blockquote>
              <figcaption mix={css({ marginTop: '20px' })}>
                <div mix={css({ fontWeight: 700 })}>{name}</div>
                <div mix={css({ fontSize: '14px', color: 'var(--faint)', fontFamily: FONT_MONO })}>
                  {role}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
        <div
          data-reveal
          mix={css({
            display: 'grid',
            gap: '8px',
            gridTemplateColumns: 'repeat(2, 1fr)',
            padding: '36px 8px',
            borderRadius: '22px',
            background: 'var(--bg-soft)',
            border: '1px solid var(--border)',
            '@media (min-width: 760px)': { gridTemplateColumns: 'repeat(4, 1fr)' },
          })}
        >
          {STATS.map(([value, suffix, decimals, label]) => (
            <div mix={css({ textAlign: 'center', padding: '12px' })}>
              <div
                data-count={value}
                data-suffix={suffix}
                data-decimals={`${decimals}`}
                mix={css({
                  fontSize: 'clamp(34px, 5vw, 52px)',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  color: 'transparent',
                  backgroundImage: 'var(--brand-grad)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                })}
              >
                0
              </div>
              <div mix={css({ fontSize: '14px', color: 'var(--muted)', marginTop: '6px' })}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

function Star() {
  return () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFDF5F" aria-hidden="true">
      <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 21l1.4-6.8L2.2 9.6l6.9-.7z" />
    </svg>
  )
}

const quoteStyle = css({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  padding: '28px',
  borderRadius: '20px',
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  transition: 'transform 300ms ease, border-color 300ms ease',
  '&:hover': { transform: 'translateY(-4px)', borderColor: 'var(--border-strong)' },
})

// ===========================================================================
// Booking — the conversion section
// ===========================================================================
const BENEFITS = [
  'Antwort innerhalb von 24 Stunden',
  'Kostenlos & unverbindlich',
  'Fester Ansprechpartner, kein Call-Center',
  'Transparentes Festpreis-Angebot',
]

function BookingSection() {
  return ({ booked = false }: { booked?: boolean }) => (
    <Section id="kontakt" tone="soft">
      <Container>
        <div
          mix={css({
            display: 'grid',
            gap: '48px',
            gridTemplateColumns: '1fr',
            alignItems: 'center',
            '@media (min-width: 960px)': { gridTemplateColumns: '1fr 1.05fr', gap: '64px' },
          })}
        >
          <div data-reveal mix={css({ display: 'flex', flexDirection: 'column', gap: '22px' })}>
            <Eyebrow>Lass uns starten</Eyebrow>
            <h2
              mix={css({
                fontSize: 'clamp(32px, 4.6vw, 52px)',
                lineHeight: 1.06,
                fontWeight: 800,
                letterSpacing: '-0.03em',
              })}
            >
              Sichere dir dein <GradientText>kostenloses Erstgespräch.</GradientText>
            </h2>
            <p mix={css({ fontSize: '18px', color: 'var(--muted)', maxWidth: '46ch' })}>
              Erzähl uns von deinem Projekt. Wir melden uns mit einem konkreten Vorschlag — ganz ohne
              Verkaufsdruck.
            </p>
            <ul mix={css({ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '4px' })}>
              {BENEFITS.map((b) => (
                <li mix={css({ display: 'flex', alignItems: 'center', gap: '12px' })}>
                  <span
                    mix={css({
                      display: 'grid',
                      placeItems: 'center',
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      color: '#80E464',
                      background: 'rgba(128,228,100,0.12)',
                      flex: '0 0 auto',
                    })}
                  >
                    <span mix={css({ '& svg': { width: '15px', height: '15px' } })}>
                      <IconCheck />
                    </span>
                  </span>
                  <span mix={css({ color: 'var(--text)' })}>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            data-reveal
            data-reveal-delay="120"
            mix={css({
              position: 'relative',
              padding: '30px',
              borderRadius: '24px',
              background: 'var(--surface)',
              border: '1px solid var(--border-strong)',
              boxShadow: '0 30px 80px -40px rgba(0,0,0,0.9)',
              '@media (min-width: 560px)': { padding: '38px' },
            })}
          >
            {booked ? <NoJsSuccess /> : null}
            <BookingForm action={BOOK_HREF} />
          </div>
        </div>
      </Container>
    </Section>
  )
}

// Server-rendered confirmation for visitors without JS (after the PRG redirect).
function NoJsSuccess() {
  return () => (
    <div
      mix={css({
        marginBottom: '20px',
        padding: '14px 16px',
        borderRadius: '12px',
        background: 'rgba(128,228,100,0.12)',
        border: '1px solid rgba(128,228,100,0.4)',
        color: '#bff3a8',
        fontSize: '15px',
      })}
    >
      Danke! Deine Anfrage ist eingegangen — wir melden uns innerhalb von 24 Stunden.
    </div>
  )
}

// ===========================================================================
// Footer
// ===========================================================================
function Footer() {
  return () => (
    <footer mix={css({ borderTop: '1px solid var(--border)', paddingBlock: '48px' })}>
      <Container wide>
        <div
          mix={css({
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            alignItems: 'center',
            textAlign: 'center',
            '@media (min-width: 720px)': {
              flexDirection: 'row',
              justifyContent: 'space-between',
              textAlign: 'left',
            },
          })}
        >
          <div mix={css({ display: 'flex', flexDirection: 'column', gap: '8px' })}>
            <Wordmark />
            <p mix={css({ fontSize: '14px', color: 'var(--faint)' })}>
              Vollständige Webentwicklung mit Backend.
            </p>
          </div>
          <div mix={css({ display: 'flex', gap: '24px', fontSize: '14px', color: 'var(--muted)' })}>
            <a href="#leistungen" mix={footLink}>
              Leistungen
            </a>
            <a href="#ablauf" mix={footLink}>
              Ablauf
            </a>
            <a href="#kontakt" mix={footLink}>
              Kontakt
            </a>
            <a href="mailto:hallo@inweb.page" mix={footLink}>
              hallo@inweb.page
            </a>
          </div>
        </div>
        <div
          mix={css({
            marginTop: '32px',
            paddingTop: '24px',
            borderTop: '1px solid var(--border)',
            fontSize: '13px',
            fontFamily: FONT_MONO,
            color: 'var(--faint)',
            textAlign: 'center',
          })}
        >
          © {new Date().getFullYear()} inweb · Alle Rechte vorbehalten
        </div>
      </Container>
    </footer>
  )
}

const footLink = css({
  textDecoration: 'none',
  color: 'var(--muted)',
  transition: 'color 200ms ease',
  '&:hover': { color: 'var(--text)' },
})
