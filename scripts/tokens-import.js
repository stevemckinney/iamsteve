#!/usr/bin/env node

/**
 * Design Token Import
 *
 * Reads tokens.json and regenerates the colour scales and primitives
 * in css/primitives.css. Semantic tokens (theme.css) are left untouched
 * because they reference colour scales via var() and light-dark() which
 * are better maintained by hand.
 *
 * This script replaces only the sections it manages, preserving any
 * manually written CSS around them.
 *
 * Usage: node scripts/tokens-import.js [path/to/tokens.json]
 *
 * Figma workflow:
 *   1. Export variables from Figma using a plugin (e.g. Tailwind Tokens,
 *      Design System Sync, or Figma Token Exporter)
 *   2. If the export format differs from tokens.json, convert it first
 *      (see convertFromFigmaExport below for guidance)
 *   3. Run: node scripts/tokens-import.js
 *   4. Review the diff in git
 */

const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const PRIMITIVES = path.join(ROOT, 'css', 'primitives.css')
const DEFAULT_TOKENS = path.join(ROOT, 'tokens.json')

const tokensPath = process.argv[2] || DEFAULT_TOKENS
const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf-8'))

// ────────────────────────────────────────────────────────────────────
// Colour scale ordering — controls output order within @theme
// ────────────────────────────────────────────────────────────────────
const SCALE_ORDER = [
  'rio', 'dandelion', 'fern', 'cornflour',
  'grass', 'moss', 'lavender', 'magenta',
  'neutral-01', 'neutral-02', 'neutral-03'
]

/**
 * Generate CSS custom property declarations for colour scales.
 */
function generateColourCSS(colours) {
  const lines = []

  const scales = SCALE_ORDER.filter(s => colours[s])

  for (let i = 0; i < scales.length; i++) {
    const scale = scales[i]
    const shades = colours[scale]
    // Sort shades numerically
    const sortedShades = Object.keys(shades).sort((a, b) => Number(a) - Number(b))

    if (i > 0) lines.push('')

    for (const shade of sortedShades) {
      const value = shades[shade].$value || shades[shade]
      lines.push(`  --color-${scale}-${shade}: ${value};`)
    }
  }

  return lines.join('\n')
}

/**
 * Generate CSS for radius tokens.
 */
function generateRadiusCSS(radius) {
  const lines = ['  --radius-*: initial;']
  const order = ['none', 'xs', 'sm', 'default', 'md', 'lg', 'xl', 'full']

  for (const key of order) {
    if (!radius[key]) continue
    const value = radius[key].$value || radius[key]
    const prop = key === 'default' ? '--radius' : `--radius-${key}`
    lines.push(`  ${prop}: ${value};`)
  }

  return lines.join('\n')
}

/**
 * Generate CSS for typography tokens.
 */
function generateTypographyCSS(typography) {
  const lines = ['  --text-*: initial;']
  const order = ['7xl', '6xl', '5xl', '4xl', '3xl', '2xl', 'xl', 'lg', 'base', 'sm', 'xs', '2xs']

  for (const size of order) {
    if (!typography[size]) continue
    const t = typography[size]
    if (t.fontSize) {
      lines.push(`  --text-${size}: ${t.fontSize.$value || t.fontSize};`)
    }
    if (t.lineHeight) {
      lines.push(`  --text-${size}--line-height: ${t.lineHeight.$value || t.lineHeight};`)
    }
    if (t.letterSpacing) {
      lines.push(`  --text-${size}--letter-spacing: ${t.letterSpacing.$value || t.letterSpacing};`)
    }
  }

  return lines.join('\n')
}

/**
 * Generate CSS for spacing tokens.
 */
function generateSpacingCSS(spacing) {
  const lines = []
  const keys = Object.keys(spacing).sort((a, b) => Number(a) - Number(b))

  for (const key of keys) {
    const value = spacing[key].$value || spacing[key]
    // Escape the dot for CSS (e.g. 2.5 → 2\.5)
    const prop = key.includes('.') ? key.replace('.', '\\.') : key
    lines.push(`  --spacing-${prop}: ${value};`)
  }

  return lines.join('\n')
}

/**
 * Generate CSS for font family tokens.
 */
function generateFontCSS(font) {
  const lines = []
  const order = ['sans', 'display', 'mono']

  for (const key of order) {
    if (!font[key]) continue
    const value = font[key].$value || font[key]
    lines.push(`  --font-${key}: ${value};`)
  }

  return lines.join('\n')
}

/**
 * Generate CSS for leading tokens.
 */
function generateLeadingCSS(typography) {
  const lines = []
  const order = ['7xl', '6xl', '5xl', '4xl', '3xl', '2xl', 'xl', 'lg']

  for (const size of order) {
    if (!typography[size] || !typography[size].leading) continue
    const value = typography[size].leading.$value || typography[size].leading
    lines.push(`  --leading-${size}: ${value};`)
  }

  return lines.join('\n')
}

// ────────────────────────────────────────────────────────────────────
// Rebuild primitives.css
// ────────────────────────────────────────────────────────────────────

const existingCSS = fs.readFileSync(PRIMITIVES, 'utf-8')

// Build the @theme block contents from tokens
const sections = []

if (tokens.radius) {
  sections.push(generateRadiusCSS(tokens.radius))
}

if (tokens.typography) {
  sections.push('')
  sections.push(generateTypographyCSS(tokens.typography))
}

if (tokens.spacing) {
  // Grab the breakpoint line from existing CSS if present
  const bpMatch = existingCSS.match(/\s*(--breakpoint-[\w]+:\s*[^;]+;)/)
  if (bpMatch) {
    sections.push('')
    sections.push(`  ${bpMatch[1].trim()}`)
  }

  sections.push('')
  sections.push(generateSpacingCSS(tokens.spacing))
}

// Grid template columns and named grid lines — preserve from existing
const gridLines = []
const gridRegex = /\s*(--grid-(?:template-columns|column|column-start|column-end)-[\w-]+:\s*[^;]+;)/g
let gridMatch
while ((gridMatch = gridRegex.exec(existingCSS)) !== null) {
  gridLines.push(`  ${gridMatch[1].trim()}`)
}
if (gridLines.length > 0) {
  sections.push('')
  sections.push(gridLines.join('\n'))
}

if (tokens.typography) {
  const leadingCSS = generateLeadingCSS(tokens.typography)
  if (leadingCSS) {
    sections.push('')
    sections.push(leadingCSS)
  }
}

if (tokens.font) {
  sections.push('')
  sections.push(generateFontCSS(tokens.font))
}

if (tokens.shadow) {
  sections.push('')
  const shadowLines = []
  for (const [key, val] of Object.entries(tokens.shadow)) {
    const value = val.$value || val
    shadowLines.push(`  --shadow-${key}: ${value};`)
  }
  sections.push(shadowLines.join('\n'))
}

// Background images — preserve from existing
const bgLines = []
const bgRegex = /\s*(--background-image-[\w-]+:\s*(?:(?:linear|radial)-gradient\([^;]*\)(?:,\s*(?:linear|radial)-gradient\([^;]*\))*|[^;]+);)/gs
let bgMatch
while ((bgMatch = bgRegex.exec(existingCSS)) !== null) {
  bgLines.push(`  ${bgMatch[1].trim()}`)
}
if (bgLines.length > 0) {
  sections.push('')
  sections.push(bgLines.join('\n'))
}

if (tokens.color) {
  sections.push('')
  sections.push(generateColourCSS(tokens.color))
}

const themeBlock = `@theme {\n${sections.join('\n')}\n}`

// Preserve everything outside the @theme block
const beforeTheme = existingCSS.match(/^([\s\S]*?)@theme\s*\{/)?.[1] || ''
const afterTheme = existingCSS.match(/@theme\s*\{[\s\S]*?\n\}([\s\S]*)$/)?.[1] || ''

const newCSS = `${beforeTheme}${themeBlock}${afterTheme}`

fs.writeFileSync(PRIMITIVES, newCSS)

console.log('Updated css/primitives.css from tokens.json')
console.log('  Review changes with: git diff css/primitives.css')
