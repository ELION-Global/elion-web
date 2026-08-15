import { readdir, stat } from 'node:fs/promises'
import { join } from 'node:path'

const chunkDirectory = 'out/_next/static/chunks'
const budgetBytes = Number(process.env.PERFORMANCE_BUDGET_BYTES ?? 1_000_000)

async function getJavaScriptSize(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const sizes = await Promise.all(entries.map(async (entry) => {
    const entryPath = join(directory, entry.name)
    if (entry.isDirectory()) return getJavaScriptSize(entryPath)
    if (entry.name.endsWith('.js')) return (await stat(entryPath)).size
    return 0
  }))
  return sizes.reduce((sum, size) => sum + size, 0)
}

const size = await getJavaScriptSize(chunkDirectory)
console.log(`Static client JavaScript chunks: ${(size / 1024).toFixed(1)} KiB (budget: ${(budgetBytes / 1024).toFixed(1)} KiB)`)

if (size > budgetBytes) {
  throw new Error('Static client JavaScript performance budget exceeded.')
}
