/**
 * Reference projects — shown as cards on the home page and as detail subpages
 * under /referenzen/:slug.
 *
 * Placeholder content: swap `image` (files in public/projects/) and the texts
 * for real case studies. Keep `slug` stable, it is part of the URL.
 */
export interface ProjectMetric {
  value: string
  label: string
}

export interface Project {
  slug: string
  image: string
  title: string
  category: string
  year: string
  client: string
  summary: string
  intro: string
  services: string[]
  tags: string[]
  challenge: string
  solution: string
  result: string
  metrics: ProjectMetric[]
}

export const PROJECTS: Project[] = [
  {
    slug: 'helios-studio',
    image: '/projects/project-1.svg',
    title: 'Helios Studio — Markenwebsite',
    category: 'Markenwebsite & CMS',
    year: '2025',
    client: 'Helios Studio',
    summary: 'Neues Markenbild mit headless CMS. Conversion-Rate nach dem Relaunch verdoppelt.',
    intro:
      'Ein kompletter Relaunch für ein Kreativstudio: neues Markenbild, ein redaktionell pflegbares Headless-CMS und eine Seite, die Anfragen statt nur Besucher bringt.',
    services: ['Webdesign', 'Headless CMS', 'SEO'],
    tags: ['Webdesign', 'CMS', 'SEO'],
    challenge:
      'Die alte Website war langsam, schwer pflegbar und spiegelte die Qualität der Arbeit des Studios nicht wider. Inhalte konnten nur über den Entwickler geändert werden.',
    solution:
      'Wir haben ein klares Designsystem, eine schnelle Frontend-Umsetzung und ein Headless-CMS gebaut, mit dem das Team Inhalte selbst pflegt — inklusive technischem SEO und sauberer Struktur.',
    result:
      'Die neue Seite lädt deutlich schneller, rankt besser und verwandelt spürbar mehr Besucher in qualifizierte Anfragen.',
    metrics: [
      { value: '+112 %', label: 'Conversion-Rate' },
      { value: '0,9 s', label: 'Ladezeit (LCP)' },
      { value: '100 %', label: 'eigenständig pflegbar' },
    ],
  },
  {
    slug: 'nordvolt',
    image: '/projects/project-2.svg',
    title: 'NordVolt — SaaS-Plattform',
    category: 'SaaS-Plattform',
    year: '2024',
    client: 'NordVolt',
    summary: 'Full-Stack-Plattform mit Auth, Dashboard und skalierbarer API auf solidem Backend.',
    intro:
      'Von der Idee zum Produkt: eine SaaS-Plattform mit Login, Nutzer-Dashboard und einer API, die mit dem Wachstum mitskaliert.',
    services: ['Frontend', 'Backend', 'API-Design'],
    tags: ['Frontend', 'Backend', 'API'],
    challenge:
      'NordVolt brauchte aus einem Prototyp ein verlässliches, skalierbares Produkt mit sicherer Authentifizierung und einer sauberen Datenarchitektur.',
    solution:
      'Wir haben Frontend und Backend aus einer Hand entwickelt: ein reaktives Dashboard, abgesicherte Auth, eine dokumentierte API und eine Datenbankstruktur, die Last verkraftet.',
    result:
      'Die Plattform läuft stabil unter wachsender Nutzerzahl und lässt sich dank klarer Architektur schnell um neue Funktionen erweitern.',
    metrics: [
      { value: '99,9 %', label: 'Uptime' },
      { value: '3×', label: 'schnellere Releases' },
      { value: '10k+', label: 'aktive Nutzer' },
    ],
  },
  {
    slug: 'kanto',
    image: '/projects/project-3.svg',
    title: 'Kanto — Online-Shop',
    category: 'E-Commerce',
    year: '2024',
    client: 'Kanto',
    summary: 'Headless Shop mit Stripe-Checkout und optimiertem Funnel für mehr Bestellungen.',
    intro:
      'Ein headless E-Commerce-Auftritt mit reibungslosem Checkout, mehreren Zahlungsarten und einem Funnel, der konsequent auf Abschluss optimiert ist.',
    services: ['E-Commerce', 'Zahlungen', 'Performance'],
    tags: ['E-Commerce', 'Stripe', 'Performance'],
    challenge:
      'Der bestehende Shop hatte hohe Kaufabbrüche und einen umständlichen Checkout über mehrere Seiten.',
    solution:
      'Wir haben einen schnellen Headless-Shop mit verkürztem One-Step-Checkout und Apple Pay, Google Pay, PayPal sowie Kartenzahlung gebaut — sicher über Stripe abgewickelt.',
    result:
      'Weniger Abbrüche, mehr abgeschlossene Bestellungen und ein Einkaufserlebnis, das auf allen Geräten überzeugt.',
    metrics: [
      { value: '−38 %', label: 'Kaufabbrüche' },
      { value: '+27 %', label: 'Bestellungen' },
      { value: '5', label: 'Zahlungsarten' },
    ],
  },
]

export function findProject(slug: string | undefined): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}
