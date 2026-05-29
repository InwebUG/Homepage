# inweb — Agentur-Onepager (Remix 3)

Ein vollständiger, stark animierter Onepager für eine Full-Stack-Webagentur. Gebaut
mit **Remix 3** (`remix@3.0.0-beta.2`). Der Nutzerflow ist konsequent auf **einen
Terminabschluss** ausgerichtet: jede Sektion endet in einem Call-to-Action, der zum
Kontaktformular führt.

## Voraussetzungen

- **Node.js ≥ 24.3** (Remix 3 nutzt nativen TS-Import)

```sh
nvm use            # liest .nvmrc (Node 24)
npm install
cp .env.example .env   # SUPABASE_ANON_KEY eintragen
```

## Entwicklung

```sh
npm run dev        # http://localhost:44100
```

Weitere Skripte: `npm run start`, `npm run typecheck`.

## Kontaktformular → Supabase

Das Formular postet serverseitig an `POST /contact`. Der Controller validiert
(`remix/data-schema`) und leitet die Anfrage an die Supabase Edge Function weiter
(`app/data/contact.ts`). Der **Anon-Key bleibt serverseitig** und wird als
`Authorization: Bearer …` + `apikey` gesendet.

Gesendetes JSON:

```json
{ "tenant_id": "…", "name": "…", "email": "…", "nachricht": "…", "subject": "Kontaktanfrage" }
```

(Ein optional angegebenes Unternehmen wird in `nachricht` eingebettet.)

| Variable | Pflicht | Beschreibung |
| --- | --- | --- |
| `SUPABASE_ANON_KEY` | ✅ | Anon/Public-Key (Supabase → Project Settings → API) |
| `SUPABASE_FUNCTION_URL` | – | Override der Edge-Function-URL |
| `SUPABASE_TENANT_ID` | – | Override der Tenant-ID |

Lokal werden die Variablen aus `.env` geladen (`--env-file-if-exists`); in der
Cloud-Umgebung als Environment-Variablen setzen. Ohne JS funktioniert das Formular
per PRG-Redirect, mit JS per Fetch + animiertem Erfolgs-Zustand.

## Seiten & Struktur

| Pfad | Aufgabe |
| --- | --- |
| `app/routes.ts` | Routen: `home`, `assets`, `contact` (POST), `datenschutz`, `impressum` |
| `app/actions/controller.tsx` | Handler: Seiten rendern, Kontakt validieren & weiterleiten |
| `app/data/contact.ts` | Serverseitige Supabase-Anbindung |
| `app/ui/home-page.tsx` | Komposition der Startseite (+ geteilter `Footer`) |
| `app/ui/legal/` | Datenschutz & Impressum (eigene Unterseiten, mit Icons) |
| `app/assets/showcase.tsx` | Gepinnter Scrollytelling-Showcase (Client-Entry) |
| `app/assets/effects.tsx` | Globale Maus-/Scroll-Animationen |
| `app/assets/booking-form.tsx` | Progressiv verbessertes Kontaktformular |
| `app/ui/showcase-graphics.tsx` | Thematische Linien-Animationen je Leistung |

## Der „Alles aus einer Hand"-Showcase

- **Desktop:** gepinnter Abschnitt. In der Übersicht sind alle Leistungs-Icons über
  **gebogene Linien** verbunden; die Hervorhebung wechselt automatisch. Beim Scrollen
  wird je ein Icon fokussiert — es gleitet nach oben-zentriert, die anderen blenden
  aus, darunter erscheint die passende Animation, links der Detailtext. Hover über ein
  Icon zeigt dieselbe Vorschau, bis die Maus die Fläche verlässt.
- **Mobile / ohne JS:** saubere, gestapelte Liste aller Leistungen mit Animationen
  (SSR-gerendert, gut für SEO).

## Interaktionen & Animationen

Alle browserseitig, via `prefers-reduced-motion` abschaltbar: eigener Trailing-Cursor,
magnetische Buttons, 3D-Tilt-Karten, Scroll-Reveals, hochzählende Kennzahlen,
cursor-folgender Hero-Glow, scroll-bewusste Navigation.

## Google Analytics & Cookie-Consent

Ein Consent-Banner (`app/assets/consent.tsx`) erscheint beim ersten Besuch.
Google Analytics wird **erst nach Einwilligung** geladen (mit IP-Anonymisierung);
die Entscheidung wird in `localStorage` gemerkt. Trage deine Measurement-ID in
`GA_MEASUREMENT_ID` (oben in `consent.tsx`) ein, um Analytics zu aktivieren —
ohne ID funktioniert der Banner, lädt aber kein Tracking.

## Referenzen / Bilder austauschen

Projekte stehen in `PROJECTS` in `app/ui/home-page.tsx`. Bilder liegen in
`public/projects/` (Platzhalter-SVGs) — einfach durch echte Screenshots ersetzen und
den `image`-Pfad anpassen.
