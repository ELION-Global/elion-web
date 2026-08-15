import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { access } from 'node:fs/promises'
import { constants } from 'node:fs'
import { fileURLToPath } from 'node:url'

const host = '127.0.0.1'
const port = '31338'
const baseUrl = `http://${host}:${port}`
const outputDirectory = fileURLToPath(new URL('../out/', import.meta.url))
const previewPath = fileURLToPath(new URL('./static-preview.mjs', import.meta.url))

async function waitForServer() {
  let lastError
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      const response = await fetch(baseUrl)
      if (response.ok) return
    } catch (error) {
      lastError = error
    }
    await new Promise((resolve) => setTimeout(resolve, 250))
  }
  throw new Error(`Static preview did not become ready: ${lastError?.message ?? 'unknown error'}`)
}

await access(outputDirectory, constants.R_OK)

const server = spawn(process.execPath, [previewPath], {
  env: { ...process.env, HOSTNAME: host, PORT: port },
  stdio: 'inherit',
})

try {
  await waitForServer()

  const publicRoutes = ['/', '/mission', '/projects', '/projects/skybridge', '/projects/love', '/research', '/community', '/about', '/join']
  const routeResponses = await Promise.all(publicRoutes.map((route) => fetch(`${baseUrl}${route}`)))
  for (const response of routeResponses) assert.equal(response.status, 200)

  const home = routeResponses[0]
  const homeHtml = await home.text()
  assert.match(homeHtml, /Engineering for Humanity/)
  assert.match(homeHtml, /https:\/\/static\.elion\.invalid\//)
  assert.match(home.headers.get('content-security-policy') ?? '', /default-src 'self'/)
  assert.equal(home.headers.get('x-content-type-options'), 'nosniff')
  assert.equal(home.headers.get('x-frame-options'), 'DENY')
  assert.equal(home.headers.get('strict-transport-security'), null)

  const [health, sitemap, robots, manifest, icon, socialImage, logo, favicon, missing] = await Promise.all([
    fetch(`${baseUrl}/api/health`),
    fetch(`${baseUrl}/sitemap.xml`),
    fetch(`${baseUrl}/robots.txt`),
    fetch(`${baseUrl}/manifest.webmanifest`),
    fetch(`${baseUrl}/icon`),
    fetch(`${baseUrl}/opengraph-image`),
    fetch(`${baseUrl}/branding/elion-logo.png`),
    fetch(`${baseUrl}/icons/favicon.svg`),
    fetch(`${baseUrl}/not-a-real-route`),
  ])

  assert.equal(health.status, 200)
  assert.equal(health.headers.get('cache-control'), 'no-store')
  const healthBody = await health.json()
  assert.equal(healthBody.status, 'ok')
  assert.equal(healthBody.service, 'elion-web')
  assert.match(healthBody.timestamp, /^\d{4}-\d{2}-\d{2}T/)
  assert.equal(sitemap.status, 200)
  assert.match(await sitemap.text(), /https:\/\/static\.elion\.invalid\/projects\/skybridge/)
  assert.equal(robots.status, 200)
  assert.match(await robots.text(), /Sitemap: https:\/\/static\.elion\.invalid\/sitemap\.xml/)
  assert.equal(manifest.status, 200)
  assert.equal(icon.status, 200)
  assert.match(icon.headers.get('content-type') ?? '', /image\/png/)
  assert.equal(socialImage.status, 200)
  assert.match(socialImage.headers.get('content-type') ?? '', /image\/png/)
  assert.equal(logo.status, 200)
  assert.match(logo.headers.get('content-type') ?? '', /image\/png/)
  assert.equal(favicon.status, 200)
  assert.match(favicon.headers.get('content-type') ?? '', /image\/svg\+xml/)
  assert.equal(missing.status, 404)
} finally {
  server.kill()
}
