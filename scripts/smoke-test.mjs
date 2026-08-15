import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { access } from 'node:fs/promises'
import { constants } from 'node:fs'
import { fileURLToPath } from 'node:url'

const host = '127.0.0.1'
const port = '31337'
const baseUrl = `http://${host}:${port}`
const serverPath = fileURLToPath(new URL('../.next/standalone/server.js', import.meta.url))

async function waitForServer() {
  let lastError
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      const response = await fetch(`${baseUrl}/api/health`)
      if (response.ok) return
    } catch (error) {
      lastError = error
    }
    await new Promise((resolve) => setTimeout(resolve, 250))
  }
  throw new Error(`Server did not become ready: ${lastError?.message ?? 'unknown error'}`)
}

await access(serverPath, constants.R_OK)

const server = spawn(process.execPath, [serverPath], {
  env: { ...process.env, HOSTNAME: host, PORT: port, NODE_ENV: 'production' },
  stdio: 'inherit',
})

try {
  await waitForServer()

  const [home, health] = await Promise.all([fetch(baseUrl), fetch(`${baseUrl}/api/health`)])
  assert.equal(home.status, 200)
  assert.match(await home.text(), /Engineering for Humanity/)
  assert.match(home.headers.get('content-security-policy') ?? '', /default-src 'self'/)
  assert.equal(home.headers.get('x-content-type-options'), 'nosniff')

  assert.equal(health.status, 200)
  const body = await health.json()
  assert.equal(body.status, 'ok')
  assert.equal(body.service, 'elion-web')
  assert.match(body.timestamp, /^\d{4}-\d{2}-\d{2}T/)
} finally {
  server.kill()
}
