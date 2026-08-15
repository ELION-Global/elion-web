import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = fileURLToPath(new URL('..', import.meta.url))
const outputDirectory = path.join(root, 'out')
const host = process.env.HOSTNAME ?? '127.0.0.1'
const port = Number(process.env.PORT ?? '31338')

const sharedHeaders = {
  'content-security-policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'",
  'x-dns-prefetch-control': 'on',
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'DENY',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'permissions-policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  'cache-control': 'public, max-age=0, must-revalidate',
}

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.woff2': 'font/woff2',
}

async function existingFile(candidate) {
  try {
    return (await stat(candidate)).isFile() ? candidate : undefined
  } catch {
    return undefined
  }
}

async function resolveStaticFile(pathname) {
  const decoded = decodeURIComponent(pathname)
  const clean = path.posix.normalize(decoded).replace(/^\/+/, '')
  if (clean.startsWith('..') || clean.includes('\u0000')) return undefined

  const candidates = clean === 'api/health'
    ? [path.join(outputDirectory, 'api', 'health.json')]
    : clean
    ? [path.join(outputDirectory, clean), path.join(outputDirectory, `${clean}.html`), path.join(outputDirectory, clean, 'index.html')]
    : [path.join(outputDirectory, 'index.html')]

  for (const candidate of candidates) {
    const resolved = path.resolve(candidate)
    if (!resolved.startsWith(`${path.resolve(outputDirectory)}${path.sep}`)) continue
    const file = await existingFile(resolved)
    if (file) return file
  }
  return undefined
}

const server = createServer(async (request, response) => {
  try {
    const requestUrl = new URL(request.url ?? '/', `http://${request.headers.host ?? host}`)
    const pathname = requestUrl.pathname
    const file = await resolveStaticFile(pathname)
    const fallback = file ? undefined : await existingFile(path.join(outputDirectory, '404.html'))
    const selected = file ?? fallback

    if (!selected) {
      response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' })
      response.end('Static output not found. Run npm run build:static first.')
      return
    }

    const headers = { ...sharedHeaders }
    if (pathname.startsWith('/_next/static/')) headers['cache-control'] = 'public, max-age=31536000, immutable'
    if (pathname === '/api/health') headers['cache-control'] = 'no-store'
    headers['content-type'] = pathname === '/icon' || pathname === '/opengraph-image'
      ? 'image/png'
      : contentTypes[path.extname(selected)] ?? 'application/octet-stream'
    response.writeHead(file ? 200 : 404, headers)
    if (request.method === 'HEAD') return response.end()
    response.end(await readFile(selected))
  } catch (error) {
    response.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' })
    response.end(`Static preview error: ${error instanceof Error ? error.message : 'unknown error'}`)
  }
})

server.listen(port, host, () => {
  console.log(`Serving static export at http://${host}:${port}`)
})
