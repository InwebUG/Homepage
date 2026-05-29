import { css } from 'remix/ui'

import {
  IconBuilding,
  IconDoc,
  IconMail,
  IconPhone,
  IconPin,
  IconScale,
  IconUser,
} from '../icons.tsx'
import { InfoRow, LegalLayout, LegalSection } from './legal-layout.tsx'

export function ImpressumPage() {
  return () => (
    <LegalLayout
      kicker="Rechtliches"
      title="Impressum"
      intro="Angaben gemäß § 5 Telemediengesetz (TMG)."
    >
      <LegalSection icon={<IconBuilding />} title="Anbieter">
        <div mix={grid}>
          <InfoRow icon={<IconPin />} label="Anschrift">
            Inweb UG
            <br />
            Korb 32
            <br />
            21335 Lüneburg
            <br />
            Deutschland
          </InfoRow>
          <InfoRow icon={<IconUser />} label="Vertreten durch / redaktionell verantwortlich">
            Torben Laatzen
          </InfoRow>
        </div>
      </LegalSection>

      <LegalSection icon={<IconMail />} title="Kontakt">
        <div mix={grid}>
          <InfoRow icon={<IconMail />} label="E-Mail">
            <a href="mailto:tl@inweb.page">tl@inweb.page</a>
          </InfoRow>
          <InfoRow icon={<IconPhone />} label="Telefon">
            <a href="tel:+491736055683">+49 1736055683</a>
          </InfoRow>
        </div>
      </LegalSection>

      <LegalSection icon={<IconDoc />} title="Register & Steuer">
        <div mix={grid}>
          <InfoRow icon={<IconDoc />} label="Umsatzsteuer-ID gemäß §27a UStG">
            DE457272873
          </InfoRow>
          <InfoRow icon={<IconBuilding />} label="Handelsregister">
            Amtsgericht Lüneburg
            <br />
            HRB 213127
          </InfoRow>
        </div>
      </LegalSection>

      <LegalSection icon={<IconScale />} title="EU-Streitschlichtung & Verbraucherschlichtung">
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
          <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
            https://ec.europa.eu/consumers/odr/
          </a>
          . Unsere E-Mail-Adresse findest du oben im Impressum.
        </p>
        <p>
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </LegalSection>
    </LegalLayout>
  )
}

const grid = css({
  display: 'grid',
  gap: '20px',
  gridTemplateColumns: '1fr',
  '@media (min-width: 560px)': { gridTemplateColumns: '1fr 1fr' },
})
