import * as s from 'remix/data-schema'
import { email, minLength } from 'remix/data-schema/checks'
import * as f from 'remix/data-schema/form-data'
import { redirect } from 'remix/response/redirect'
import { createController } from 'remix/router'

import { assetServer } from '../assets.ts'
import { submitContact } from '../data/contact.ts'
import { routes } from '../routes.ts'
import { HomePage } from '../ui/home-page.tsx'
import { DatenschutzPage } from '../ui/legal/datenschutz.tsx'
import { ImpressumPage } from '../ui/legal/impressum.tsx'
import { findProject } from '../ui/projects.ts'
import { ReferenzDetailPage } from '../ui/referenz-page.tsx'

const contactSchema = f.object({
  name: f.field(s.string().pipe(minLength(1))),
  email: f.field(s.string().pipe(email())),
  company: f.field(s.defaulted(s.string(), '')),
  message: f.field(s.string().pipe(minLength(1))),
})

function wantsJson(request: Request): boolean {
  return (
    request.headers.get('x-requested-with') === 'fetch' ||
    (request.headers.get('accept') ?? '').includes('application/json')
  )
}

export default createController(routes, {
  actions: {
    async assets(context) {
      let response = await assetServer.fetch(context.request)
      if (!response) return new Response('Not Found', { status: 404 })
      // Let browsers cache compiled assets between navigations (no client-side
      // router here, so every page change re-requests them). Short max-age keeps
      // staleness after a deploy small; the ETag still allows revalidation.
      if (process.env.NODE_ENV === 'production') {
        let headers = new Headers(response.headers)
        headers.set('cache-control', 'public, max-age=300, stale-while-revalidate=86400')
        return new Response(response.body, { status: response.status, headers })
      }
      return response
    },

    home(context) {
      let status = new URL(context.request.url).searchParams.get('status')
      return context.render(<HomePage booked={status === 'success'} />)
    },

    async contact({ get, request }) {
      let result = s.parseSafe(contactSchema, get(FormData))

      if (!result.success) {
        if (wantsJson(request)) {
          return Response.json({ ok: false, issues: result.issues }, { status: 400 })
        }
        return redirect(`${routes.home.href()}?status=error#kontakt`)
      }

      let outcome = await submitContact(
        {
          name: result.value.name,
          email: result.value.email,
          message: result.value.message,
          company: result.value.company || undefined,
        },
        request.signal,
      )

      if (!outcome.ok) {
        console.error('Supabase contact submission failed:', outcome.status, outcome.error)
        if (wantsJson(request)) {
          return Response.json({ ok: false }, { status: 502 })
        }
        return redirect(`${routes.home.href()}?status=error#kontakt`)
      }

      if (wantsJson(request)) {
        return Response.json({ ok: true })
      }
      return redirect(`${routes.home.href()}?status=success#kontakt`)
    },

    referenz(context) {
      let project = findProject(context.params.slug)
      if (!project) return new Response('Not Found', { status: 404 })
      return context.render(<ReferenzDetailPage project={project} />)
    },

    datenschutz(context) {
      return context.render(<DatenschutzPage />)
    },

    impressum(context) {
      return context.render(<ImpressumPage />)
    },
  },
})
