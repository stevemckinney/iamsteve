#!/usr/bin/env node

/**
 * Icon Sprite Builder
 *
 * Watches public/icon/{16,24} folders for SVG files and updates
 * the corresponding sprite components.
 *
 * Usage:
 *   node generate-icon-sprite.js          # Build once
 *   node generate-icon-sprite.js --watch  # Watch for changes
 */

import fs from 'fs'
import path from 'path'
import { parseArgs } from 'util'

const ROOT = process.cwd()
const ICON_DIR = path.join(ROOT, 'public/icon')
const SPRITE_DIR = path.join(ROOT, 'components/icon')

const WATCH_FOLDERS = {
  16: 16,
  24: 24,
}

const STROKE_LINEJOIN_MAP = {
  round: 'sl-r',
  square: 'sl-s',
}

const STROKE_LINECAP_MAP = {
  round: 'slc-r',
  square: 'slc-s',
  butt: 'slc-b',
}

function parseViewBox(svg) {
  const match = svg.match(/viewBox=["']([^"']+)["']/)
  if (!match) return null
  const [, , w, h] = match[1].split(/\s+/).map(Number)
  return { width: w, height: h }
}

function getIconName(filename) {
  return path.basename(filename, '.svg').toLowerCase()
}

function transformSvgToSymbol(svg, iconName, size) {
  const viewBox = parseViewBox(svg)
  if (!viewBox || viewBox.width !== size || viewBox.height !== size) {
    console.warn(`  ⚠ ${iconName}: viewBox mismatch (expected ${size}x${size})`)
  }

  let content = svg
    .replace(/<\?xml[^>]*\?>/g, '')
    .replace(/<!DOCTYPE[^>]*>/gi, '')
    .replace(/<svg[^>]*>/, '')
    .replace(/<\/svg>/, '')
    .trim()

  content = transformAttributes(content)

  // Make mask/clipPath IDs unique by prefixing with icon name
  content = makeIdsUnique(content, iconName, size)

  return `      <symbol id="${iconName}-${size}" viewBox="0 0 ${size} ${size}">
${indent(content, 8)}
      </symbol>`
}

function makeIdsUnique(content, iconName, size) {
  // Find all id and url(#id) references and make them unique
  const idMap = new Map()

  // First pass: collect all IDs
  content = content.replace(/\bid=["']([^"']+)["']/g, (match, id) => {
    const uniqueId = `${iconName}-${size}-${id}`
    idMap.set(id, uniqueId)
    return `id="${uniqueId}"`
  })

  // Second pass: update all url(#id) references
  content = content.replace(/url\(#([^)]+)\)/g, (match, id) => {
    const uniqueId = idMap.get(id)
    return uniqueId ? `url(#${uniqueId})` : match
  })

  // Remove class/className from mask, defs, clipPath, and their child elements
  content = content.replace(
    /<(mask|defs|clipPath)([^>]*)\sclass(Name)?=["'][^"']*["']/g,
    '<$1$2'
  )

  // Convert style="mask-type:alpha" to JSX style object on mask elements
  content = content.replace(
    /<mask([^>]*)style=["']mask-type:\s*alpha["']([^>]*)>/gi,
    (match, before, after) => {
      return `<mask${before}style={{ maskType: 'alpha' }}${after}>`
    }
  )

  // Add style={{ maskType: 'alpha' }} to mask elements that don't have it
  content = content.replace(/<mask([^>]*maskUnits[^>]*)>/g, (match) => {
    if (!match.includes('style=') && !match.includes('maskType')) {
      return match.replace(/>$/, " style={{ maskType: 'alpha' }}>")
    }
    return match
  })

  // Remove className from paths/rects inside mask elements
  const lines = content.split('\n')
  let inMask = false
  const cleanedLines = lines.map((line) => {
    if (line.includes('<mask')) inMask = true
    if (line.includes('</mask>')) inMask = false

    if (inMask && /<(path|rect|circle|ellipse)/.test(line)) {
      return line.replace(/\sclass(Name)?=["'][^"']*["']/g, '')
    }
    return line
  })
  content = cleanedLines.join('\n')

  return content
}

function transformAttributes(content) {
  const lines = content.split('\n')
  const hadClassAttribute = new Set()

  let inMask = false

  const processedLines = lines.map((line, index) => {
    // Track if we're inside a mask element
    if (line.includes('<mask')) inMask = true
    if (line.includes('</mask>')) inMask = false

    // If line already has class= attribute, skip SVG attribute transformations
    if (line.includes('class=')) {
      hadClassAttribute.add(index)
      // Just do class name replacements
      line = line.replace(/\bfill-white\b/g, 'fill-(--icon-fill)')
      line = line.replace(/\bfill-currentcolor\b/g, 'fill-current')
      // Only remove stroke attributes if they exist as attributes (not already converted to classes)
      // Only remove if there's an actual attribute present (e.g., stroke-miterlimit="10")
      if (/stroke-miterlimit=["']/.test(line)) {
        line = line.replace(/\s*stroke-miterlimit=["']\d+["']/g, '')
      }
      if (/stroke-width=["']/.test(line)) {
        line = line.replace(/\s*stroke-width=["'][^"']*["']/g, '')
      }
      if (/stroke-linecap=["']/.test(line)) {
        line = line.replace(/\s*stroke-linecap=["'][^"']*["']/g, '')
      }
      if (/stroke-linejoin=["']/.test(line)) {
        line = line.replace(/\s*stroke-linejoin=["'][^"']*["']/g, '')
      }
      if (/style=["']/.test(line) || /style=\{\{/.test(line)) {
        line = line.replace(/\s*style=["'][^"']*["']/g, '')
        line = line.replace(/\s*style=\{\{[^}]+\}\}/g, '')
      }
      // Convert class to className
      line = line.replace(/class=/g, 'className=')
      return line
    }

    // Otherwise, transform SVG attributes to classes
    // Skip fill transformation inside masks - preserve literal fill values
    if (inMask) {
      return line
    }

    // fill="white" or fill="#fff" or fill="#ffffff" → fill-(--icon-fill) (uses --icon-fill variable)
    line = line.replace(
      /fill=["'](#fff(?:fff)?|white)["']/gi,
      'className="fill-(--icon-fill)"'
    )

    // fill="none" → handled separately
    line = line.replace(/fill=["']none["']/gi, 'className="fill-none"')

    // fill with colour (not none/white) → fill-current
    line = line.replace(
      /fill=["']#[0-9a-fA-F]{3,6}["']/g,
      'className="fill-current"'
    )

    // stroke with colour → stroke-current
    line = line.replace(/stroke=["']#[0-9a-fA-F]{3,6}["']/g, 'stroke-current')

    // stroke-width → stroke-{n} or stroke-[n] for decimals
    line = line.replace(/stroke-width=["']([\d.]+)["']/g, (_, width) => {
      return width.includes('.')
        ? `className="stroke-[${width}]"`
        : `stroke-${width}`
    })

    // stroke-linejoin → sl-r or sl-s
    line = line.replace(
      /stroke-linejoin=["'](round|square)["']/g,
      (_, join) => STROKE_LINEJOIN_MAP[join] || ''
    )

    // stroke-linecap → slc-r, slc-s, or slc-b
    line = line.replace(
      /stroke-linecap=["'](round|square|butt)["']/g,
      (_, cap) => STROKE_LINECAP_MAP[cap] || ''
    )

    // stroke-miterlimit → remove (handled by CSS)
    line = line.replace(/stroke-miterlimit=["']\d+["']/g, '')

    // Remove style attributes (not needed, handled by classes)
    line = line.replace(/\s*style=["'][^"']*["']/g, '')
    line = line.replace(/\s*style=\{\{[^}]+\}\}/g, '')

    return line
  })

  content = processedLines.join('\n')

  // Combine adjacent className and stroke/fill classes (only for attribute-based SVGs)
  content = combineClasses(content, hadClassAttribute)

  // Convert remaining attributes to JSX format
  content = content
    .replace(/fill-rule=/g, 'fillRule=')
    .replace(/clip-path=/g, 'clipPath=')
    .replace(/clip-rule=/g, 'clipRule=')
    .replace(/stroke-dasharray=/g, 'strokeDasharray=')
    .replace(/stroke-dashoffset=/g, 'strokeDashoffset=')
    .replace(/stroke-miterlimit=/g, 'strokeMiterlimit=')
    .replace(/stroke-width=/g, 'strokeWidth=')
    .replace(/stroke-linecap=/g, 'strokeLinecap=')
    .replace(/stroke-linejoin=/g, 'strokeLinejoin=')

  return content
}

function combineClasses(content, skipLines = new Set()) {
  // Combine loose class fragments into className attributes
  // Pattern: className="..." followed by loose classes like stroke-current stroke-2 sl-r
  const lines = content.split('\n')

  return lines
    .map((line, index) => {
      // Skip lines that originally had class= attribute (already processed)
      if (skipLines.has(index)) {
        return line
      }
      // Match patterns like: className="fill-none" stroke-current stroke-2 sl-r
      const classMatch = line.match(/className=["']([^"']+)["']/)
      const looseClasses = line.match(
        /\s+(stroke-current|stroke-\d+|stroke-\[[^\]]+\]|sl-[rs]|slc-[rsb]|slj-r|fill-current|fill-\(--icon-fill\))(?=\s|\/|>)/g
      )

      if (classMatch && looseClasses) {
        const existingClasses = classMatch[1]
        const newClasses = looseClasses.map((c) => c.trim()).join(' ')
        const combined = `${existingClasses} ${newClasses}`.trim()

        line = line
          .replace(/className=["'][^"']+["']/, `className="${combined}"`)
          .replace(
            /\s+(stroke-current|stroke-\d+|stroke-\[[^\]]+\]|sl-[rs]|slc-[rsb]|slj-r|fill-current|fill-\(--icon-fill\))(?=\s|\/|>)/g,
            ''
          )
      } else if (!classMatch && looseClasses) {
        const classes = looseClasses.map((c) => c.trim()).join(' ')
        // Remove loose classes first
        line = line.replace(
          /\s+(stroke-current|stroke-\d+|stroke-\[[^\]]+\]|sl-[rs]|slc-[rsb]|slj-r|fill-current|fill-\(--icon-fill\))(?=\s|\/|>)/g,
          ''
        )
        // Handle self-closing tags first (order matters!)
        if (line.includes('/>')) {
          line = line.replace(/\/>/, ` className="${classes}" />`)
        } else {
          line = line.replace(/>/, ` className="${classes}">`)
        }
      }

      return line
    })
    .join('\n')
}

function indent(str, spaces) {
  const pad = ' '.repeat(spaces)
  return str
    .split('\n')
    .map((line) => (line.trim() ? pad + line : line))
    .join('\n')
}

function generateSpriteFile(size, symbols) {
  const componentName = `Sprite${size}`

  return `/**
 * ${componentName}
 * Auto-generated by generate-icon-sprite.js — do not edit manually
 */
const ${componentName} = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    style={{
      position: 'absolute',
      width: 0,
      height: 0,
      overflow: 'hidden',
      display: 'none',
    }}
    {...props}
  >
    <defs>
${symbols.join('\n')}
    </defs>
  </svg>
)

export default ${componentName}
`
}

function processFolder(folderName, targetSize) {
  const folderPath = path.join(ICON_DIR, folderName)

  if (!fs.existsSync(folderPath)) {
    console.log(`  📁 Creating ${folderPath}`)
    fs.mkdirSync(folderPath, { recursive: true })
    return []
  }

  const symbols = []

  function scanDirectory(dir, relativePath = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)

      if (entry.isDirectory()) {
        // Recursively scan subdirectories
        const newRelativePath = relativePath
          ? `${relativePath}/${entry.name}`
          : entry.name
        scanDirectory(fullPath, newRelativePath)
      } else if (entry.name.endsWith('.svg')) {
        const iconName = getIconName(entry.name)
        const svg = fs.readFileSync(fullPath, 'utf-8')
        const displayPath = relativePath
          ? `${folderName}/${relativePath}`
          : folderName

        console.log(`  ✓ ${iconName} (${displayPath}/)`)
        symbols.push({
          name: iconName,
          content: transformSvgToSymbol(svg, iconName, targetSize),
        })
      }
    }
  }

  scanDirectory(folderPath)

  return symbols
}

function build() {
  console.log('\n🎨 Building icon sprites...\n')

  const symbolsBySize = { 16: new Map(), 24: new Map() }

  // Process each watch folder
  for (const [folder, size] of Object.entries(WATCH_FOLDERS)) {
    console.log(`📂 ${folder}/ → sprite-${size}.js`)
    const symbols = processFolder(folder, size)

    for (const { name, content } of symbols) {
      symbolsBySize[size].set(name, content)
    }
  }

  // Write sprite files
  for (const [size, symbols] of Object.entries(symbolsBySize)) {
    if (symbols.size === 0) {
      console.log(`  ⏭ No icons for sprite-${size}.js`)
      continue
    }

    const sortedSymbols = Array.from(symbols.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([, content]) => content)

    const spritePath = path.join(SPRITE_DIR, `sprite-${size}.js`)
    const content = generateSpriteFile(size, sortedSymbols)

    fs.writeFileSync(spritePath, content)
    console.log(`\n✅ Written ${spritePath} (${symbols.size} icons)`)
  }

  console.log('\n')
}

function watch() {
  console.log('👀 Watching for changes...\n')

  let debounceTimer = null
  const DEBOUNCE_MS = 100

  const debouncedBuild = () => {
    if (debounceTimer) clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      build()
      debounceTimer = null
    }, DEBOUNCE_MS)
  }

  for (const folder of Object.keys(WATCH_FOLDERS)) {
    const folderPath = path.join(ICON_DIR, folder)

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true })
    }

    // Watch recursively
    fs.watch(
      folderPath,
      { persistent: true, recursive: true },
      (eventType, filename) => {
        if (filename?.endsWith('.svg')) {
          console.log(`\n🔄 ${filename} changed`)
          debouncedBuild()
        }
      }
    )
  }
}

// CLI
const { values } = parseArgs({
  options: {
    watch: { type: 'boolean', short: 'w', default: false },
  },
})

build()

if (values.watch) {
  watch()
}
