import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import { constants } from 'node:fs'
import test from 'node:test'

const readSource = (relativePath) => readFile(new URL(`../${relativePath}`, import.meta.url), 'utf8')

test('project catalogue exposes the two documented flagship projects', async () => {
  const source = await readSource('src/content/projects.ts')

  assert.match(source, /id: 'skybridge'/)
  assert.match(source, /name: 'SKYBRIDGE'/)
  assert.match(source, /id: 'love'/)
  assert.match(source, /name: 'LOVE'/)
  assert.match(source, /href: '\/projects\/skybridge'/)
  assert.match(source, /href: '\/projects\/love'/)
})

test('public shell retains essential accessibility landmarks', async () => {
  const layout = await readSource('src/app/layout.tsx')
  const header = await readSource('src/components/layout/SiteHeader.tsx')

  assert.match(layout, /Skip to main content/)
  assert.match(layout, /<main id="main-content"/)
  assert.match(header, /aria-label="Primary navigation"/)
  assert.match(header, /aria-expanded=\{menuOpen\}/)
})

test('security headers constrain embedded and plugin content', async () => {
  const config = await readSource('next.config.ts')

  assert.match(config, /Content-Security-Policy/)
  assert.match(config, /frame-ancestors 'none'/)
  assert.match(config, /object-src 'none'/)
  assert.match(config, /X-Content-Type-Options/)
})

test('the static Pages target preserves the public security-header policy', async () => {
  const pagesHeaders = await readSource('cloudflare/pages/_headers')

  assert.match(pagesHeaders, /Content-Security-Policy: default-src 'self'/)
  assert.match(pagesHeaders, /X-Content-Type-Options: nosniff/)
  assert.match(pagesHeaders, /X-Frame-Options: DENY/)
  assert.match(pagesHeaders, /Referrer-Policy: strict-origin-when-cross-origin/)
  assert.match(pagesHeaders, /\/api\/health\n  ! Cache-Control\n  Cache-Control: no-store/)
})

test('the official logo asset is available to the public site', async () => {
  const logoComponent = await readSource('src/components/ui/ElionLogo.tsx')

  assert.match(logoComponent, /\/branding\/elion-logo\.png/)
  assert.match(logoComponent, /\/branding\/elion-logo-blend\.png/)
  await access(new URL('../public/branding/elion-logo.png', import.meta.url), constants.R_OK)
  await access(new URL('../public/branding/elion-logo-blend.png', import.meta.url), constants.R_OK)
})

test('the join page does not imply a live contributor-registration flow', async () => {
  const joinPage = await readSource('src/app/join/page.tsx')

  assert.match(joinPage, /There is no application or interest form at this stage/)
  assert.doesNotMatch(joinPage, /No commitment is required to register interest/)
})
