# inweb — Agentur-Onepager (Remix 3)

Ein vollständiger, animierter Onepager für eine Full-Stack-Webagentur. Gebaut mit
**Remix 3** (`remix@3.0.0-beta.2`) — inklusive echtem Backend: das Buchungsformular
schreibt Leads über `remix/data-table` in eine SQLite-Datenbank (`node:sqlite`).

Der Nutzerflow ist konsequent auf **einen Terminabschluss** ausgerichtet: jede
Sektion endet in einem Call-to-Action, der zum Erstgespräch-Formular führt.

## Voraussetzungen

- **Node.js ≥ 24.3** (Remix 3 nutzt nativen TS-Import & `node:sqlite`)

```sh
nvm use            # liest .nvmrc (Node 24)
npm install
```

## Entwicklung

```sh
npm run dev        # http://localhost:44100
```

## Weitere Skripte

```sh
npm run start      # Produktionsstart
npm run typecheck  # tsc --noEmit
npm test           # Node-Test-Runner
```

## Architektur

| Pfad | Aufgabe |
| --- | --- |
| `app/routes.ts` | Typsicherer Routen-Vertrag (`home`, `assets`, `book`) |
| `app/router.ts` | Router + Middleware (static, render, formData, database) |
| `app/actions/controller.tsx` | Handler inkl. Validierung & Lead-Persistenz |
| `app/data/` | SQLite-Setup (`db.ts`) und Tabellen-Schema (`schema.ts`) |
| `app/ui/` | Geteilte UI: Document, Theme, Icons, Home-Page-Komposition |
| `app/assets/effects.tsx` | Globale Maus-/Scroll-Animationen (ein Client-Entry) |
| `app/assets/booking-form.tsx` | Progressiv verbessertes Buchungsformular |

## Interaktionen & Animationen

Alle browserseitig, abschaltbar via `prefers-reduced-motion`:

- Eigener Trailing-Cursor (Ring folgt verzögert, reagiert auf interaktive Elemente)
- Magnetische Buttons (`[data-magnetic]`)
- 3D-Tilt-Karten mit Cursor-Glow (`[data-tilt]`)
- Scroll-Reveals mit Stagger (`[data-reveal]`)
- Hochzählende Kennzahlen (`[data-count]`)
- Cursor-folgender Hero-Glow (`[data-glow]`)
- Scroll-bewusste Navigation mit aktivem Link-Highlight (`[data-nav]`)

## Backend-Flow

`POST /book` → Validierung (`remix/data-schema`) → Insert in `leads` →
JSON-Antwort (mit JS) bzw. PRG-Redirect `?status=success` (ohne JS). Das Formular
funktioniert vollständig ohne JavaScript.
