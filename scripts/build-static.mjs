import { copyFile, cp, mkdir, rm, writeFile } from 'node:fs/promises'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = fileURLToPath(new URL('..', import.meta.url))
const outputDirectory = path.join(root, 'out')
const staticSourceDirectory = path.join(root, '.artifacts', 'static-export')
const nextCli = path.join(root, 'node_modules', 'next', 'dist', 'bin', 'next')
const headersSource = path.join(root, 'cloudflare', 'pages', '_headers')
const redirectsSource = path.join(root, 'cloudflare', 'pages', '_redirects')

function run(command, args, env, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd, env, stdio: 'inherit' })
    child.on('error', reject)
    child.on('exit', (code, signal) => {
      if (code === 0) return resolve()
      reject(new Error(`Static build failed (${signal ?? `exit ${code ?? 'unknown'}`}).`))
    })
  })
}

// The normal source remains a dynamic Docker/AWS application. The isolated
// source below contains every public route but omits its one dynamic route.
// Both generated directories are gitignored, scoped POC artifacts.
await rm(staticSourceDirectory, { recursive: true, force: true })
await mkdir(staticSourceDirectory, { recursive: true })
for (const directory of ['src', 'public']) {
  await cp(path.join(root, directory), path.join(staticSourceDirectory, directory), { recursive: true })
}
for (const file of ['next.config.ts', 'next-env.d.ts', 'package.json', 'postcss.config.mjs', 'tailwind.config.ts', 'tsconfig.json']) {
  await copyFile(path.join(root, file), path.join(staticSourceDirectory, file))
}
await rm(path.join(staticSourceDirectory, 'src', 'app', 'api', 'health'), { recursive: true, force: true })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.CF_PAGES_URL ?? 'https://static.elion.invalid'
await run(process.execPath, [nextCli, 'build', '--webpack'], {
  ...process.env,
  npm_config_local_prefix: staticSourceDirectory,
  ELION_BUILD_TARGET: 'static',
  NEXT_PUBLIC_SITE_URL: siteUrl,
}, staticSourceDirectory)

const staticOutputDirectory = path.join(staticSourceDirectory, 'out')
const staticHealthDirectory = path.join(staticOutputDirectory, 'api')
await mkdir(staticHealthDirectory, { recursive: true })
await writeFile(
  path.join(staticHealthDirectory, 'health.json'),
  `${JSON.stringify({ status: 'ok', service: 'elion-web', timestamp: new Date().toISOString(), delivery: 'static' })}\n`
)
await copyFile(headersSource, path.join(staticOutputDirectory, '_headers'))
await copyFile(redirectsSource, path.join(staticOutputDirectory, '_redirects'))

// `out/` is the exact deployable Pages artifact. Clear only this generated,
// gitignored directory so deleted routes/assets cannot survive a later build.
await rm(outputDirectory, { recursive: true, force: true })
await cp(staticOutputDirectory, outputDirectory, { recursive: true })

console.log(`Static export written to ${outputDirectory} for ${siteUrl}`)
