import {
  IconBuilding,
  IconChart,
  IconCookie,
  IconDatabase,
  IconDoc,
  IconLock,
  IconServer,
  IconShield,
  IconUser,
} from '../icons.tsx'
import { LegalLayout, LegalSection } from './legal-layout.tsx'

export function DatenschutzPage() {
  return () => (
    <LegalLayout
      kicker="Rechtliches"
      title="Datenschutzerklärung"
      intro="Wir nehmen den Schutz deiner personenbezogenen Daten ernst. Hier erfährst du, welche Daten wir verarbeiten, zu welchem Zweck und welche Rechte du hast."
      updated="Mai 2026"
    >
      <LegalSection icon={<IconBuilding />} title="1. Verantwortlicher">
        <p>Verantwortlich für die Datenverarbeitung auf dieser Website ist:</p>
        <p>
          <strong>Inweb UG</strong>
          <br />
          Korb 32, 21335 Lüneburg, Deutschland
          <br />
          Vertreten durch: Torben Laatzen
          <br />
          E-Mail: <a href="mailto:tl@inweb.page">tl@inweb.page</a> · Telefon:{' '}
          <a href="tel:+491736055683">+49 1736055683</a>
        </p>
      </LegalSection>

      <LegalSection icon={<IconShield />} title="2. Grundlegendes">
        <p>
          Diese Datenschutzerklärung klärt über Art, Umfang und Zweck der Verarbeitung
          personenbezogener Daten innerhalb unseres Onlineangebots auf. Rechtsgrundlagen sind die
          Datenschutz-Grundverordnung (DSGVO) und das Bundesdatenschutzgesetz (BDSG).
        </p>
        <p>
          Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder
          identifizierbare natürliche Person beziehen.
        </p>
      </LegalSection>

      <LegalSection icon={<IconServer />} title="3. Hosting & Server-Logfiles">
        <p>
          Beim Aufruf dieser Website werden durch den Hosting-Provider automatisch Informationen in
          Server-Logfiles erfasst, die dein Browser übermittelt:
        </p>
        <ul>
          <li>Browsertyp und -version</li>
          <li>verwendetes Betriebssystem</li>
          <li>Referrer-URL und Uhrzeit der Serveranfrage</li>
          <li>(gekürzte) IP-Adresse</li>
        </ul>
        <p>
          Die Verarbeitung erfolgt zur Gewährleistung eines sicheren, stabilen Betriebs auf
          Grundlage unseres berechtigten Interesses (Art. 6 Abs. 1 lit. f DSGVO).
        </p>
      </LegalSection>

      <LegalSection icon={<IconDatabase />} title="4. Kontaktformular (Supabase)">
        <p>
          Wenn du uns über das Kontaktformular eine Anfrage sendest, verarbeiten wir die von dir
          angegebenen Daten — <strong>Name, E-Mail-Adresse</strong> und den Inhalt deiner{' '}
          <strong>Nachricht</strong> (optional dein Unternehmen) — zur Bearbeitung deiner Anfrage.
        </p>
        <p>
          Die Übermittlung und Speicherung erfolgt über <strong>Supabase</strong> (Supabase, Inc.,
          970 Toa Payoh North #07-04, Singapur), die für uns als Auftragsverarbeiter tätig sind. Die
          Anfrage wird über eine abgesicherte Edge Function entgegengenommen und für die
          Kontaktaufnahme gespeichert.
        </p>
        <p>
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Anbahnung/Erfüllung eines Vertrags) bzw.
          lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen). Die Daten werden
          gelöscht, sobald sie für die Bearbeitung nicht mehr erforderlich sind und keine
          gesetzlichen Aufbewahrungspflichten entgegenstehen.
        </p>
      </LegalSection>

      <LegalSection icon={<IconCookie />} title="5. Cookies & Einwilligung">
        <p>
          Unsere Website verwendet Cookies. Technisch notwendige Cookies sind für den Betrieb
          erforderlich (Art. 6 Abs. 1 lit. f DSGVO). Cookies, die nicht zwingend erforderlich sind —
          etwa für Statistik/Analyse — setzen wir nur mit deiner Einwilligung gemäß § 25 Abs. 1 TTDSG
          und Art. 6 Abs. 1 lit. a DSGVO. Deine Einwilligung kannst du jederzeit mit Wirkung für die
          Zukunft widerrufen.
        </p>
      </LegalSection>

      <LegalSection icon={<IconChart />} title="6. Webanalyse mit Google Analytics">
        <p>
          Diese Website nutzt — sofern du eingewilligt hast — Google Analytics, einen
          Webanalysedienst der Google Ireland Limited (Gordon House, Barrow Street, Dublin 4,
          Irland). Google Analytics verwendet Cookies, um die Nutzung der Website zu analysieren.
        </p>
        <ul>
          <li>Verarbeitet werden u. a. gekürzte IP-Adresse, Geräte-/Browserdaten und Nutzungsverhalten.</li>
          <li>Die IP-Anonymisierung ist aktiviert; deine IP wird vor der Übertragung gekürzt.</li>
          <li>Eine Übermittlung in die USA an Google LLC kann stattfinden (Standardvertragsklauseln).</li>
        </ul>
        <p>
          Rechtsgrundlage ist deine Einwilligung (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TTDSG). Du
          kannst die Erfassung durch ein Browser-Add-on verhindern:{' '}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
            tools.google.com/dlpage/gaoptout
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection icon={<IconUser />} title="7. Deine Rechte">
        <p>Dir stehen gegenüber uns folgende Rechte hinsichtlich deiner personenbezogenen Daten zu:</p>
        <ul>
          <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
          <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
          <li>Recht auf Löschung (Art. 17 DSGVO)</li>
          <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO) und Widerspruch (Art. 21 DSGVO)</li>
        </ul>
        <p>
          Du hast zudem das Recht, dich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Eine
          erteilte Einwilligung kannst du jederzeit widerrufen.
        </p>
      </LegalSection>

      <LegalSection icon={<IconLock />} title="8. SSL-/TLS-Verschlüsselung">
        <p>
          Diese Seite nutzt aus Sicherheitsgründen eine SSL-/TLS-Verschlüsselung. Eine verschlüsselte
          Verbindung erkennst du an „https://" und dem Schloss-Symbol in deiner Browserzeile.
        </p>
      </LegalSection>

      <LegalSection icon={<IconDoc />} title="9. Aktualität und Änderungen">
        <p>
          Wir passen diese Datenschutzerklärung an, sobald Änderungen unserer Datenverarbeitung dies
          erforderlich machen. Bei Fragen zum Datenschutz erreichst du uns jederzeit unter{' '}
          <a href="mailto:tl@inweb.page">tl@inweb.page</a>.
        </p>
      </LegalSection>
    </LegalLayout>
  )
}
