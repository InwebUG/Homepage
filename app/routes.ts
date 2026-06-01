import { get, post, route } from 'remix/routes'

export const routes = route({
  // Serves compiled browser modules (client entries) from the asset pipeline.
  assets: get('/assets/*path'),
  // The landing page (home).
  home: '/',
  // POST endpoint that forwards a contact request to the Supabase function.
  contact: post('contact'),
  // Reference detail subpages.
  referenz: get('/referenzen/:slug'),
  // Legal pages (own routes, linked from the footer).
  datenschutz: get('/datenschutz'),
  impressum: get('/impressum'),
})
