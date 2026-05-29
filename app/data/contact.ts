/**
 * Server-side bridge to the Supabase Edge Function that receives contact
 * requests. The anon key never reaches the browser — it is read from the
 * environment and attached here, on the server.
 *
 * Required environment variable:
 *   SUPABASE_ANON_KEY   – the project's anon/public API key
 * Optional overrides (sensible defaults baked in):
 *   SUPABASE_FUNCTION_URL – the edge function endpoint
 *   SUPABASE_TENANT_ID    – the tenant the submission belongs to
 */

const DEFAULT_FUNCTION_URL =
  'https://usstijzdensmlyanlwxr.supabase.co/functions/v1/submit-contact-form'
const DEFAULT_TENANT_ID = '8fb30c88-4769-46fc-922e-90f22db52c2f'

export interface ContactInput {
  name: string
  email: string
  message: string
  company?: string
}

export interface ContactResult {
  ok: boolean
  status: number
  error?: string
}

export async function submitContact(
  input: ContactInput,
  signal?: AbortSignal,
): Promise<ContactResult> {
  // Read at call time so env vars (or a `.env` loaded at startup) are available
  // regardless of module import order.
  const anonKey = process.env.SUPABASE_ANON_KEY
  const functionUrl = process.env.SUPABASE_FUNCTION_URL ?? DEFAULT_FUNCTION_URL
  const tenantId = process.env.SUPABASE_TENANT_ID ?? DEFAULT_TENANT_ID

  if (!anonKey) {
    return { ok: false, status: 500, error: 'SUPABASE_ANON_KEY is not configured' }
  }

  // The function only knows name / email / nachricht / subject, so fold the
  // optional company into the message body to avoid losing it.
  const nachricht = input.company
    ? `Unternehmen: ${input.company}\n\n${input.message}`
    : input.message

  try {
    const response = await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${anonKey}`,
        apikey: anonKey,
      },
      body: JSON.stringify({
        tenant_id: tenantId,
        name: input.name,
        email: input.email,
        nachricht,
        subject: 'Kontaktanfrage',
      }),
      signal,
    })

    if (!response.ok) {
      let detail = ''
      try {
        detail = await response.text()
      } catch {
        /* ignore */
      }
      return { ok: false, status: response.status, error: detail.slice(0, 300) }
    }

    return { ok: true, status: response.status }
  } catch (error) {
    return { ok: false, status: 502, error: error instanceof Error ? error.message : 'fetch failed' }
  }
}
