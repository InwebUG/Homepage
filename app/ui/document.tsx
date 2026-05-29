import { type RemixNode } from 'remix/ui'

import { routes } from '../routes.ts'
import { FONT_MONO, FONT_SANS, themeTokens } from './theme.tsx'

export interface DocumentProps {
  children?: RemixNode
  title?: string
  description?: string
}

const DEFAULT_TITLE = 'inweb — Webentwicklung & Design mit Backend'
const DEFAULT_DESCRIPTION =
  'inweb baut Websites, die verkaufen: Design, Frontend und skalierbares Backend aus einer Hand. Jetzt kostenloses Erstgespräch sichern.'

const rootTokens = Object.entries(themeTokens)
  .map(([key, value]) => `  ${key}: ${value};`)
  .join('\n')

// Globals + keyframes live in a raw stylesheet so we can declare @keyframes and
// document-level resets that the scoped `css(...)` mixin does not cover.
const GLOBAL_CSS = `
:root {
${rootTokens}
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: ${FONT_SANS};
  font-size: 16px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}
h1, h2, h3, h4, p { margin: 0; }
a { color: inherit; }
::selection { background: rgba(255, 101, 219, 0.35); color: #fff; }
code, kbd, .mono { font-family: ${FONT_MONO}; }
:focus-visible { outline: 2px solid var(--brand); outline-offset: 3px; border-radius: 4px; }

@keyframes ctaSheen { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes floatBlob { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(24px, -28px) scale(1.08); } }
@keyframes auroraShift { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
@keyframes spinSlow { to { transform: rotate(360deg); } }
@keyframes dashFlow { to { stroke-dashoffset: -28; } }
@keyframes nodePulse { 0%, 100% { opacity: 0.35; transform: scale(0.85); } 50% { opacity: 1; transform: scale(1.1); } }
@keyframes needleSweep { 0%, 100% { transform: rotate(-46deg); } 50% { transform: rotate(46deg); } }
@keyframes bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
@keyframes blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
@keyframes dropIn { 0% { transform: translateY(-16px); opacity: 0; } 40% { opacity: 1; } 70% { transform: translateY(0); } 100% { transform: translateY(0); opacity: 1; } }
@keyframes drawLine { from { stroke-dashoffset: 120; } to { stroke-dashoffset: 0; } }

/* Scroll reveals only hide when JS is confirmed (html.js). Without JS — or if
   hydration never runs — content stays fully visible. */
html.js [data-reveal] { opacity: 0; transform: translateY(26px); transition: opacity 750ms cubic-bezier(0.2,0.8,0.2,1), transform 750ms cubic-bezier(0.2,0.8,0.2,1); will-change: opacity, transform; }
html.js [data-reveal].is-in { opacity: 1; transform: none; }
html.no-fx [data-reveal] { opacity: 1 !important; transform: none !important; }

@media (max-width: 460px) { .hide-sm { display: none !important; } }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; }
  html.js [data-reveal] { opacity: 1 !important; transform: none !important; }
}
`

export function Document() {
  return ({ children, title = DEFAULT_TITLE, description = DEFAULT_DESCRIPTION }: DocumentProps) => (
    <html lang="de">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Confirm JS up front so reveal-on-scroll only hides content when we can
            reliably reveal it again. The failsafe reveals everything if the
            effects layer never hydrates (e.g. asset load failure). */}
        <script>
          {`document.documentElement.classList.add('js');setTimeout(function(){if(!window.__fx)document.documentElement.classList.add('no-fx')},3000)`}
        </script>
        <meta name="color-scheme" content="dark" />
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
        />
        <title>{title}</title>
        <style>{GLOBAL_CSS}</style>
      </head>
      <body>
        {children}
        <script type="module" src={routes.assets.href({ path: 'app/assets/entry.ts' })}></script>
      </body>
    </html>
  )
}
