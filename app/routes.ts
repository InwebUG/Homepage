import { get, post, route } from 'remix/routes'

export const routes = route({
  // Serves compiled browser modules (client entries) from the asset pipeline.
  assets: get('/assets/*path'),
  // The single page of this onepager.
  home: '/',
  // POST endpoint that receives a booking/lead request and persists it.
  book: post('book'),
})
