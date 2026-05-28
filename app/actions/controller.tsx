import * as s from 'remix/data-schema'
import { email, minLength } from 'remix/data-schema/checks'
import * as f from 'remix/data-schema/form-data'
import { Database } from 'remix/data-table'
import { redirect } from 'remix/response/redirect'
import { createController } from 'remix/router'

import { assetServer } from '../assets.ts'
import { leads } from '../data/schema.ts'
import { routes } from '../routes.ts'
import { HomePage } from '../ui/home-page.tsx'

const bookingSchema = f.object({
  name: f.field(s.string().pipe(minLength(1))),
  email: f.field(s.string().pipe(email())),
  company: f.field(s.defaulted(s.string(), '')),
  budget: f.field(s.defaulted(s.string(), '')),
  message: f.field(s.defaulted(s.string(), '')),
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
      return (
        (await assetServer.fetch(context.request)) ?? new Response('Not Found', { status: 404 })
      )
    },

    home(context) {
      let status = new URL(context.request.url).searchParams.get('status')
      return context.render(<HomePage booked={status === 'success'} />)
    },

    async book({ get, request }) {
      let result = s.parseSafe(bookingSchema, get(FormData))

      if (!result.success) {
        if (wantsJson(request)) {
          return Response.json({ ok: false, issues: result.issues }, { status: 400 })
        }
        return redirect(`${routes.home.href()}?status=error#kontakt`)
      }

      let db = get(Database)
      if (!db) throw new Error('Database middleware is not configured')
      await db.create(leads, {
        name: result.value.name,
        email: result.value.email,
        company: result.value.company || undefined,
        budget: result.value.budget || undefined,
        message: result.value.message || undefined,
        created_at: Date.now(),
      })

      if (wantsJson(request)) {
        return Response.json({ ok: true })
      }
      return redirect(`${routes.home.href()}?status=success#kontakt`)
    },
  },
})
