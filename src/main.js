import { mkdirSync } from 'node:fs'
import { writeFile } from 'node:fs/promises'
import { fork } from 'node:child_process'
import { fileURLToPath } from 'node:url'

mkdirSync(new URL('../data', import.meta.url), { recursive: true })

const api = fork(fileURLToPath(new URL('./api.js', import.meta.url)))
api.on('message', async msg => {
  console.log('[api]', msg)
  await writeFile(new URL('../data/a.txt', import.meta.url), JSON.stringify(msg))
})

process.on('SIGHUP', () => process.exit(128 + 1))
process.on('SIGINT', () => process.exit(128 + 2))
process.on('SIGTERM', () => process.exit(128 + 15))
