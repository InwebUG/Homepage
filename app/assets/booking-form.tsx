import { clientEntry, css, on, type Handle, type SerializableProps } from 'remix/ui'

import { FONT_MONO, FONT_SANS } from '../ui/theme.tsx'

interface BookingFormProps extends SerializableProps {
  action: string
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

/**
 * The conversion centerpiece. It is a real `<form method="post">` that works
 * without JavaScript (the server handles the POST and redirects). When
 * hydrated, it submits via fetch and swaps to an animated success state so the
 * visitor never leaves the page.
 */
export const BookingForm = clientEntry(
  import.meta.url,
  function BookingForm(handle: Handle<BookingFormProps>) {
    let status: Status = 'idle'
    let errors: Record<string, string> = {}
    let generalError = ''

    async function submit(event: SubmitEvent, signal: AbortSignal) {
      event.preventDefault()
      const form = event.currentTarget as HTMLFormElement
      const body = new FormData(form)

      status = 'submitting'
      errors = {}
      generalError = ''
      await handle.update()

      try {
        const response = await fetch(handle.props.action, {
          method: 'POST',
          headers: { accept: 'application/json', 'x-requested-with': 'fetch' },
          body,
          signal,
        })
        if (signal.aborted) return
        const data = (await response.json()) as {
          ok: boolean
          issues?: Array<{ path?: string[]; message: string }>
        }

        if (data.ok) {
          status = 'success'
          handle.update()
          return
        }

        for (const issue of data.issues ?? []) {
          const field = issue.path?.[0]
          if (field) errors[field] = issue.message
        }
        if (!data.issues?.length) generalError = 'Etwas ist schiefgelaufen. Bitte erneut versuchen.'
        status = 'error'
        await handle.update()
      } catch {
        if (signal.aborted) return
        generalError = 'Verbindung fehlgeschlagen. Bitte erneut versuchen.'
        status = 'error'
        await handle.update()
      }
    }

    return () => {
      if (status === 'success') return <SuccessCard />

      const busy = status === 'submitting'
      return (
        <form
          method="post"
          action={handle.props.action}
          mix={[formStyle, on<HTMLFormElement, 'submit'>('submit', submit)]}
        >
          <div mix={rowStyle}>
            <Field name="name" label="Name" placeholder="Vor- und Nachname" error={errors.name} />
            <Field
              name="email"
              type="email"
              label="E-Mail"
              placeholder="name@firma.de"
              error={errors.email}
            />
          </div>

          <Field
            name="company"
            label="Unternehmen"
            placeholder="Optional"
            optional
            error={errors.company}
          />

          <label mix={labelStyle}>
            Worum geht es?
            <textarea
              name="message"
              rows={4}
              required
              placeholder="Erzähl uns kurz von deinem Vorhaben …"
              mix={[controlStyle, css({ resize: 'vertical', minHeight: '110px' })]}
            />
            {errors.message ? <ErrorText>{errors.message}</ErrorText> : null}
          </label>

          {generalError ? <ErrorText>{generalError}</ErrorText> : null}

          <button type="submit" disabled={busy} mix={submitStyle}>
            {busy ? 'Wird gesendet …' : 'Erstgespräch anfragen'}
          </button>
          <p mix={fineprintStyle}>
            Antwort innerhalb von 24 Stunden · Kostenlos & unverbindlich · Daten vertraulich
          </p>
        </form>
      )
    }
  },
)

function Field() {
  return ({
    name,
    label,
    placeholder,
    type = 'text',
    optional = false,
    error,
  }: {
    name: string
    label: string
    placeholder?: string
    type?: 'text' | 'email' | 'tel'
    optional?: boolean
    error?: string
  }) => (
    <label mix={labelStyle}>
      {label}
      {optional ? <span mix={css({ color: 'var(--faint)' })}> · optional</span> : null}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={!optional}
        list={undefined}
        mix={controlStyle}
        style={error ? { borderColor: '#FF5148' } : undefined}
      />
      {error ? <ErrorText>{error}</ErrorText> : null}
    </label>
  )
}

function ErrorText() {
  return ({ children }: { children: string }) => (
    <span mix={css({ fontSize: '13px', color: '#FF8A82', fontFamily: FONT_MONO })}>{children}</span>
  )
}

function SuccessCard() {
  return () => (
    <div mix={successStyle}>
      <div mix={checkWrap}>
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 12.5l5 5 11-11"
            stroke="#06070a"
            stroke-width="2.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <h3 mix={css({ fontSize: '24px', fontWeight: 700 })}>Anfrage erhalten — danke!</h3>
      <p mix={css({ color: 'var(--muted)', maxWidth: '34ch' })}>
        Wir melden uns innerhalb von 24 Stunden mit einem Terminvorschlag für dein kostenloses
        Erstgespräch.
      </p>
    </div>
  )
}

const formStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
  fontFamily: FONT_SANS,
})

const rowStyle = css({
  display: 'grid',
  gap: '18px',
  gridTemplateColumns: '1fr',
  '@media (min-width: 560px)': { gridTemplateColumns: '1fr 1fr' },
})

const labelStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  fontSize: '13px',
  fontWeight: 600,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  color: 'var(--muted)',
})

const controlStyle = css({
  width: '100%',
  padding: '13px 15px',
  fontSize: '15px',
  fontFamily: FONT_SANS,
  fontWeight: 400,
  letterSpacing: 'normal',
  textTransform: 'none',
  color: 'var(--text)',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid var(--border)',
  borderRadius: '12px',
  transition: 'border-color 180ms ease, box-shadow 180ms ease, background 180ms ease',
  '&::placeholder': { color: 'var(--faint)' },
  '&:focus': {
    outline: 'none',
    borderColor: 'var(--brand)',
    background: 'rgba(32,170,255,0.05)',
    boxShadow: '0 0 0 4px rgba(32,170,255,0.14)',
  },
})

const submitStyle = css({
  marginTop: '4px',
  padding: '16px 24px',
  fontSize: '16px',
  fontWeight: 700,
  fontFamily: FONT_SANS,
  color: '#000',
  border: 'none',
  borderRadius: '14px',
  cursor: 'pointer',
  backgroundImage: 'var(--brand-grad)',
  backgroundSize: '180% 180%',
  animation: 'ctaSheen 6s ease infinite',
  transition: 'transform 200ms ease, box-shadow 200ms ease, opacity 200ms ease',
  boxShadow: '0 12px 40px -12px rgba(32,170,255,0.6)',
  '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 18px 50px -12px rgba(255,101,219,0.6)' },
  '&:active': { transform: 'translateY(0)' },
  '&:disabled': { opacity: 0.6, cursor: 'progress', transform: 'none' },
})

const fineprintStyle = css({
  margin: 0,
  textAlign: 'center',
  fontSize: '12px',
  fontFamily: FONT_MONO,
  letterSpacing: '0.04em',
  color: 'var(--faint)',
})

const successStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: '16px',
  padding: '32px 8px',
  animation: 'auroraShift 600ms ease',
})

const checkWrap = css({
  display: 'grid',
  placeItems: 'center',
  width: '64px',
  height: '64px',
  borderRadius: '50%',
  backgroundImage: 'var(--brand-grad)',
  boxShadow: '0 12px 40px -8px rgba(128,228,100,0.6)',
})
