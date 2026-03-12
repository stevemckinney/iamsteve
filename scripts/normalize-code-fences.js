#!/usr/bin/env node

/**
 * Normalise code fences across all blog posts and notes
 * for the Prism → Shiki migration.
 *
 * Transformations:
 * 1. Language mapping: markup → html, empty → text
 * 2. Filename format: :filename → title="filename"
 * 3. Line numbers: add showLineNumbers to all fences
 * 4. Preserve existing showLineNumbers=N, {line-ranges}, title="..."
 *
 * Usage:
 *   node scripts/normalize-code-fences.js --dry-run
 *   node scripts/normalize-code-fences.js --execute
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { join, relative } from 'path'

const CONTENT_DIRS = ['content/blog', 'content/notes']
const DRY_RUN = process.argv.includes('--dry-run')
const EXECUTE = process.argv.includes('--execute')

if (!DRY_RUN && !EXECUTE) {
  console.log(
    'Usage: node scripts/normalize-code-fences.js --dry-run|--execute'
  )
  process.exit(1)
}

/** Map Prism language identifiers to Shiki-compatible ones */
const LANGUAGE_MAP = {
  markup: 'html',
  // These are already valid in Shiki but listed for completeness
  html: 'html',
  xml: 'xml',
  css: 'css',
  scss: 'scss',
  sass: 'sass',
  javascript: 'javascript',
  js: 'javascript',
  jsx: 'jsx',
  ts: 'typescript',
  typescript: 'typescript',
  bash: 'bash',
  shell: 'bash',
  sh: 'bash',
  php: 'php',
  json: 'json',
  yaml: 'yaml',
  yml: 'yaml',
  markdown: 'markdown',
  md: 'markdown',
  ruby: 'ruby',
  python: 'python',
  sql: 'sql',
  graphql: 'graphql',
  diff: 'diff',
  text: 'text',
  plaintext: 'text',
}

function normalizeLanguage(lang) {
  if (!lang) return 'text'
  const lower = lang.toLowerCase()
  return LANGUAGE_MAP[lower] || lower
}

/**
 * Parse a code fence opening line like:
 *   ```css:app.css showLineNumbers {6-8}
 *   ```markup title="example.html" showLineNumbers
 *   ```scss showLineNumbers=7
 *   ```
 *
 * Returns { language, title, meta (showLineNumbers, line ranges, etc.) }
 */
function parseCodeFence(fenceLine) {
  // Match the opening fence: ``` or ~~~, followed by everything after
  const match = fenceLine.match(/^(\s*)(```|~~~)(.*)$/)
  if (!match) return null

  const indent = match[1]
  const fence = match[2]
  let rest = match[3].trim()

  let language = null
  let title = null
  let meta = []

  if (!rest) {
    return {
      indent,
      fence,
      language: null,
      title: null,
      meta: '',
      original: fenceLine,
    }
  }

  // Extract language (first word, possibly with :filename)
  let firstPart
  const spaceIdx = rest.indexOf(' ')
  if (spaceIdx === -1) {
    firstPart = rest
    rest = ''
  } else {
    firstPart = rest.slice(0, spaceIdx)
    rest = rest.slice(spaceIdx + 1).trim()
  }

  // Check for language:filename format
  if (firstPart.includes(':')) {
    const colonIdx = firstPart.indexOf(':')
    language = firstPart.slice(0, colonIdx) || null
    title = firstPart.slice(colonIdx + 1) || null
  } else {
    language = firstPart || null
  }

  // If the "language" starts with { or showLineNumbers, it's actually meta
  if (
    language &&
    (language.startsWith('{') ||
      language.toLowerCase().startsWith('showlinenumbers'))
  ) {
    rest = language + (rest ? ' ' + rest : '')
    language = null
  }

  // Parse remaining meta string for title="..." and other tokens
  if (rest) {
    // Extract title="..." from meta
    const titleMatch = rest.match(/title="([^"]*)"/)
    if (titleMatch) {
      title = titleMatch[1]
      rest = rest.replace(titleMatch[0], '').trim()
    }

    // Also handle title='...'
    const titleMatchSingle = rest.match(/title='([^']*)'/)
    if (titleMatchSingle) {
      title = titleMatchSingle[1]
      rest = rest.replace(titleMatchSingle[0], '').trim()
    }
  }

  return {
    indent,
    fence,
    language,
    title,
    meta: rest,
    original: fenceLine,
  }
}

/**
 * Reconstruct a normalised code fence line
 */
function buildCodeFence(parsed) {
  const { indent, fence } = parsed

  const lang = normalizeLanguage(parsed.language)

  const parts = [lang]

  // Add title if present
  if (parsed.title) {
    parts.push(`title="${parsed.title}"`)
  }

  // Process meta - ensure showLineNumbers is present
  let meta = parsed.meta || ''

  // Check if showLineNumbers already exists
  const hasLineNumbers = /showlinenumbers/i.test(meta)

  if (!hasLineNumbers) {
    // Insert showLineNumbers before any line ranges
    if (meta) {
      // Put showLineNumbers before {line-ranges}
      const lineRangeMatch = meta.match(/(\{[\d\s,-]+\})/)
      if (lineRangeMatch) {
        meta = meta
          .replace(lineRangeMatch[0], `showLineNumbers ${lineRangeMatch[0]}`)
          .trim()
      } else {
        meta = `showLineNumbers ${meta}`.trim()
      }
    } else {
      meta = 'showLineNumbers'
    }
  }

  if (meta) parts.push(meta)

  return `${indent}${fence}${parts.join(' ')}`
}

/**
 * Process a single markdown file
 */
function processFile(filePath) {
  const content = readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')
  const changes = []
  let modified = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Match code fence opening (not closing)
    if (/^\s*(```|~~~)/.test(line) && !/^\s*(```|~~~)\s*$/.test(line)) {
      // This is an opening fence with content after the backticks
      const parsed = parseCodeFence(line)
      if (parsed) {
        const newLine = buildCodeFence(parsed)
        if (newLine !== line) {
          changes.push({
            line: i + 1,
            old: line,
            new: newLine,
          })
          lines[i] = newLine
          modified = true
        }
      }
    } else if (/^\s*(```|~~~)\s*$/.test(line)) {
      // This could be a bare opening fence (no language) or a closing fence
      // We need to check context: if the previous non-empty line before this
      // is not inside a code block, this is an opening fence
      // Simple heuristic: track code block state
      // Actually, let's track properly with a state machine
    }
  }

  // Second pass: handle bare opening fences (``` with no language)
  // Track code block state
  let inCodeBlock = false
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()

    if (/^(```|~~~)/.test(trimmed)) {
      if (inCodeBlock) {
        // This is a closing fence
        inCodeBlock = false
      } else {
        // This is an opening fence
        inCodeBlock = true

        // If it's a bare fence (no language specified)
        if (/^(```|~~~)\s*$/.test(trimmed)) {
          const indent = line.match(/^(\s*)/)[1]
          const fence = trimmed.match(/^(```|~~~)/)[1]
          const newLine = `${indent}${fence}text showLineNumbers`
          if (newLine !== line) {
            changes.push({
              line: i + 1,
              old: line,
              new: newLine,
            })
            lines[i] = newLine
            modified = true
          }
        }
      }
    }
  }

  return { lines, changes, modified }
}

/**
 * Recursively find all .md files in a directory
 */
function findMarkdownFiles(dir) {
  const files = []
  try {
    for (const entry of readdirSync(dir)) {
      const fullPath = join(dir, entry)
      const stat = statSync(fullPath)
      if (stat.isDirectory()) {
        files.push(...findMarkdownFiles(fullPath))
      } else if (entry.endsWith('.md') || entry.endsWith('.mdx')) {
        files.push(fullPath)
      }
    }
  } catch {
    // Directory doesn't exist, skip
  }
  return files
}

// Main
console.log(DRY_RUN ? '=== DRY RUN ===' : '=== EXECUTING ===')
console.log('')

let totalFiles = 0
let modifiedFiles = 0
let totalChanges = 0

for (const dir of CONTENT_DIRS) {
  const files = findMarkdownFiles(dir)

  for (const filePath of files) {
    const { lines, changes, modified } = processFile(filePath)
    totalFiles++

    if (modified) {
      modifiedFiles++
      totalChanges += changes.length

      const relPath = relative('.', filePath)
      console.log(`\n${relPath} (${changes.length} changes):`)
      for (const change of changes) {
        console.log(`  L${change.line}:`)
        console.log(`    - ${change.old.trim()}`)
        console.log(`    + ${change.new.trim()}`)
      }

      if (EXECUTE) {
        writeFileSync(filePath, lines.join('\n'), 'utf-8')
      }
    }
  }
}

console.log('\n---')
console.log(`Files scanned: ${totalFiles}`)
console.log(`Files modified: ${modifiedFiles}`)
console.log(`Total changes: ${totalChanges}`)

if (DRY_RUN) {
  console.log('\nRun with --execute to apply changes.')
}
