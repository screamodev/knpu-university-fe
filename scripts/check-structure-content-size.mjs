#!/usr/bin/env node
/**
 * Guards the migrated faculty content against quietly becoming a performance problem.
 *
 * Bodies are lazy chunks, so the tree can be large — but a single tab is also a single
 * server-rendered page, and `manifest.json` is imported eagerly on every page of the site.
 *
 *     node scripts/check-structure-content-size.mjs
 */

import { readdirSync, statSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('../app/content/structure', import.meta.url))
const LIMITS = {
  manifest: 64 * 1024,
  file: 400 * 1024,
  total: 20 * 1024 * 1024,
}

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name)
    return entry.isDirectory() ? walk(path) : [path]
  })
}

let files
try {
  files = walk(ROOT).filter(path => path.endsWith('.json'))
}
catch {
  console.log('No migrated structure content yet — nothing to check.')
  process.exit(0)
}

const problems = []
let total = 0

for (const path of files) {
  const size = statSync(path).size
  total += size
  const name = relative(ROOT, path)
  const limit = name === 'manifest.json' ? LIMITS.manifest : LIMITS.file
  if (size > limit) {
    problems.push(`${name} is ${(size / 1024).toFixed(0)} KB (limit ${(limit / 1024).toFixed(0)} KB)`)
  }
  try {
    JSON.parse(readFileSync(path, 'utf8'))
  }
  catch (error) {
    problems.push(`${name} is not valid JSON: ${error.message}`)
  }
}

if (total > LIMITS.total) {
  problems.push(`total content is ${(total / 1024 / 1024).toFixed(1)} MB (limit ${LIMITS.total / 1024 / 1024} MB)`)
}

console.log(`${files.length} files, ${(total / 1024 / 1024).toFixed(2)} MB total`)
if (problems.length) {
  console.error('\nStructure content size check failed:')
  for (const problem of problems) console.error(`  - ${problem}`)
  process.exit(1)
}
console.log('Structure content size check passed.')
