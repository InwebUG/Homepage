import * as fs from 'node:fs'
import * as http from 'node:http'
import { createRequestListener } from 'remix/node-fetch-server'

import { assetServer } from './app/assets.ts'
import { router } from './app/router.ts'

const port = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 44100

/**
 * Compile every client-entry bundle (and the modules they reference) up front,
 * so the first real visitor never pays for an on-demand compile mid-request —
 * which otherwise can make the first page load appear broken until a reload.
 */
async function warmAssets() {
  const warmed = new Set<string>()

  async function crawl(assetPath: string): Promise<void> {
    if (warmed.has(assetPath)) return
    warmed.add(assetPath)
    let response: Response | null = null
    try {
      response = await assetServer.fetch(new Request(`http://internal${assetPath}`))
    } catch {
      return
    }
    if (!response || !response.ok) return
    const body = await response.text()
    const refs = new Set<string>()
    for (const match of body.matchAll(/["'`](\/assets\/[^"'`]+)["'`]/g)) refs.add(match[1])
    await Promise.all([...refs].map(crawl))
  }

  let files: string[] = []
  try {
    files = fs.readdirSync('app/assets').filter((name) => /\.(ts|tsx)$/.test(name))
  } catch {
    /* ignore */
  }
  await Promise.all(files.map((name) => crawl(`/assets/app/assets/${name}`)))
}

const server = http.createServer(
  createRequestListener(async (request) => {
    try {
      return await router.fetch(request)
    } catch (error) {
      if (!(request.signal.aborted && error === request.signal.reason)) {
        console.error(error)
      }
      return new Response('Internal Server Error', { status: 500 })
    }
  }),
)

await warmAssets().catch(() => {})

server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})

let shuttingDown = false

function shutdown() {
  if (shuttingDown) {
    return
  }

  shuttingDown = true
  server.close(() => process.exit(0))
  server.closeAllConnections()
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
