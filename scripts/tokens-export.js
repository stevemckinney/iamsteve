#!/usr/bin/env node

/**
 * Design Token Export
 *
 * Parses CSS custom properties from css/primitives.css and css/theme.css
 * into a structured JSON file (tokens.json) that can be imported into
 * Figma via free plugins like Tailwind Tokens or Design System Sync.
 *
 * Usage: node scripts/tokens-export.js
 */

const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..')
const PRIMITIVES = path.join(ROOT, 'css', 'primitives.css')
const THEME = path.join(ROOT, 'css', 'theme.css')
const OUTPUT = path.join(ROOT, 'tokens.json')

/**
 * Parse a CSS file and extract custom property declarations from
 * @theme blocks and :root blocks.
 */
function extractProperties(css) {
  const props = []

  // Match @theme { ... } blocks and :root { ... } blocks
  const blockRegex = /(?:@theme|:root)\s*\{([^}]*(?:\{[^}]*\}[^}]*)*)\}/g
  let blockMatch

  while ((blockMatch = blockRegex.exec(css)) !== null) {
    const blockContent = blockMatch[1]
    // Match individual custom property declarations
    // Handles multi-line values by matching until the next -- or closing brace
    const propRegex = /(--[\w.\-\\]+)\s*:\s*([^;]+);/g
    let propMatch

    while ((propMatch = propRegex.exec(blockContent)) !== null) {
      const name = propMatch[1].replace(/\\/g, '')
      const value = propMatch[2].trim()
      props.push({ name, value })
    }
  }

  return props
}

/**
 * Categorise a property into a token group based on its name.
 */
function categorise(name) {
  if (/^--color-(rio|dandelion|fern|cornflour|grass|moss|lavender|magenta|neutral-0[123])/.test(name)) {
    return 'color'
  }
  if (/^--color-/.test(name)) return 'semantic'
  if (/^--radius/.test(name)) return 'radius'
  if (/^--text-/.test(name)) return 'typography'
  if (/^--leading-/.test(name)) return 'leading'
  if (/^--spacing-/.test(name)) return 'spacing'
  if (/^--font-/.test(name)) return 'font'
  if (/^--shadow-/.test(name)) return 'shadow'
  return null
}

/**
 * Parse a colour scale name and shade from a property name.
 * e.g. --color-rio-400 → { scale: 'rio', shade: '400' }
 */
function parseColorName(name) {
  const match = name.match(/^--color-([\w-]+?)-([\d]+)$/)
  if (!match) return null
  return { scale: match[1], shade: match[2] }
}

/**
 * Build the structured token object.
 */
function buildTokens(properties) {
  const tokens = {
    $description: 'Design tokens for iamsteve.me — exported from CSS custom properties',
    color: {},
    radius: {},
    typography: {},
    spacing: {},
    font: {},
    shadow: {},
    semantic: {}
  }

  for (const { name, value } of properties) {
    const category = categorise(name)
    if (!category) continue

    if (category === 'color') {
      const parsed = parseColorName(name)
      if (parsed) {
        if (!tokens.color[parsed.scale]) {
          tokens.color[parsed.scale] = {}
        }
        tokens.color[parsed.scale][parsed.shade] = {
          $value: value,
          $type: 'color'
        }
      }
      continue
    }

    if (category === 'radius') {
      // Skip the wildcard reset (--radius-*: initial)
      if (name === '--radius-*' || value === 'initial') continue
      const key = name === '--radius' ? 'default' : name.replace('--radius-', '')
      tokens.radius[key] = {
        $value: value,
        $type: 'dimension'
      }
      continue
    }

    if (category === 'typography') {
      // Skip the wildcard reset
      if (name === '--text-*' || value === 'initial') continue
      const sizeMatch = name.match(/^--text-([\w]+)(?:--([\w-]+))?$/)
      if (sizeMatch) {
        const size = sizeMatch[1]
        const prop = sizeMatch[2]
        if (!tokens.typography[size]) {
          tokens.typography[size] = {}
        }
        if (prop === 'line-height') {
          tokens.typography[size].lineHeight = { $value: value }
        } else if (prop === 'letter-spacing') {
          tokens.typography[size].letterSpacing = { $value: value }
        } else {
          tokens.typography[size].fontSize = { $value: value, $type: 'dimension' }
        }
      }
      continue
    }

    if (category === 'leading') {
      const key = name.replace('--leading-', '')
      tokens.typography[key] = tokens.typography[key] || {}
      tokens.typography[key].leading = { $value: value }
      continue
    }

    if (category === 'spacing') {
      const key = name.replace('--spacing-', '')
      tokens.spacing[key] = { $value: value, $type: 'dimension' }
      continue
    }

    if (category === 'font') {
      const key = name.replace('--font-', '')
      tokens.font[key] = { $value: value, $type: 'fontFamily' }
      continue
    }

    if (category === 'shadow') {
      const key = name.replace('--shadow-', '')
      tokens.shadow[key] = { $value: value, $type: 'shadow' }
      continue
    }

    if (category === 'semantic') {
      // Strip --color- prefix, convert to nested path
      const key = name.replace('--color-', '')
      tokens.semantic[key] = {
        $value: value,
        $type: 'color'
      }
      continue
    }
  }

  // Remove empty groups
  for (const key of Object.keys(tokens)) {
    if (key === '$description') continue
    if (typeof tokens[key] === 'object' && Object.keys(tokens[key]).length === 0) {
      delete tokens[key]
    }
  }

  return tokens
}

// Main
const primitivesCSS = fs.readFileSync(PRIMITIVES, 'utf-8')
const themeCSS = fs.readFileSync(THEME, 'utf-8')

// Primitives: colours, radius, typography, spacing, fonts, shadows
// Theme: semantic colours only (they use var() and light-dark() references)
const primitiveProps = extractProperties(primitivesCSS)
const themeProps = extractProperties(themeCSS)
  .filter(({ name }) => /^--color-/.test(name))

const allProps = [...primitiveProps, ...themeProps]
const tokens = buildTokens(allProps)

fs.writeFileSync(OUTPUT, JSON.stringify(tokens, null, 2) + '\n')

const stats = {
  colors: Object.values(tokens.color || {}).reduce((sum, scale) => sum + Object.keys(scale).length, 0),
  radius: Object.keys(tokens.radius || {}).length,
  typography: Object.keys(tokens.typography || {}).length,
  semantic: Object.keys(tokens.semantic || {}).length,
  shadow: Object.keys(tokens.shadow || {}).length
}

console.log('Exported tokens to tokens.json')
console.log(`  ${stats.colors} colour values across ${Object.keys(tokens.color || {}).length} scales`)
console.log(`  ${stats.radius} radius values`)
console.log(`  ${stats.typography} typography sizes`)
console.log(`  ${stats.semantic} semantic colour tokens`)
console.log(`  ${stats.shadow} shadow tokens`)
