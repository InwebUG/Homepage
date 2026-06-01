import { run } from 'remix/ui'

run({
  async loadModule(moduleUrl, exportName) {
    let mod = await import(moduleUrl)
    return mod[exportName]
  },
  // The runtime intercepts same-origin link clicks (Navigation API) and reloads
  // the page through this resolver instead of a full browser navigation. Without
  // it the runtime falls back to a placeholder, which strips the visited page's
  // adopted styles — leaving navigated pages (e.g. /referenzen/:slug) rendered
  // unstyled. Returning the streamed response body lets the runtime take its
  // full-document path, which adopts the destination page's styles correctly.
  async resolveFrame(src, signal, target) {
    let headers = new Headers({ accept: 'text/html' })
    if (target) headers.set('x-remix-target', target)
    let response = await fetch(src, { headers, signal })
    return response.body ?? (await response.text())
  },
})
