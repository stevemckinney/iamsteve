#!/usr/bin/env node

/**
 * Icon Sprite Verification
 *
 * Compares SVG source files against generated sprite files to ensure
 * all icons are properly included.
 */

import fs from 'fs'
import path from 'path'

const ROOT = process.cwd()
const ICON_DIR = path.join(ROOT, 'public/icon')
const SPRITE_DIR = path.join(ROOT, 'components/icon')

const WATCH_FOLDERS = {
  16: 16,
  24: 24,
  social: 16,
}

function getIconName(filename) {
  return path.basename(filename, '.svg').toLowerCase()
}

function getAllSvgFiles(folderPath) {
  const icons = new Set()

  function scanDirectory(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)

      if (entry.isDirectory()) {
        scanDirectory(fullPath)
      } else if (entry.name.endsWith('.svg')) {
        const iconName = getIconName(entry.name)
        icons.add(iconName)
      }
    }
  }

  if (fs.existsSync(folderPath)) {
    scanDirectory(folderPath)
  }

  return icons
}

function getSpriteSymbols(spritePath) {
  const symbols = new Set()

  if (!fs.existsSync(spritePath)) {
    return symbols
  }

  const content = fs.readFileSync(spritePath, 'utf-8')
  const symbolRegex = /<symbol id="([^"]+)"/g
  let match

  while ((match = symbolRegex.exec(content)) !== null) {
    const id = match[1]
    const iconName = id.replace(/-\d+$/, '')
    symbols.add(iconName)
  }

  return symbols
}

function compareIconSets(svgIcons, spriteSymbols, label) {
  const missing = [...svgIcons].filter((icon) => !spriteSymbols.has(icon))
  const extra = [...spriteSymbols].filter((icon) => !svgIcons.has(icon))

  console.log(`\n${label}`)
  console.log('='.repeat(label.length))
  console.log(`SVG files: ${svgIcons.size}`)
  console.log(`Sprite symbols: ${spriteSymbols.size}`)

  if (missing.length > 0) {
    console.log(`\n❌ Missing from sprite (${missing.length}):`)
    missing.sort().forEach((icon) => console.log(`   - ${icon}`))
  }

  if (extra.length > 0) {
    console.log(`\n⚠️  Extra in sprite (${extra.length}):`)
    extra.sort().forEach((icon) => console.log(`   - ${icon}`))
  }

  if (missing.length === 0 && extra.length === 0) {
    console.log(`\n✅ All icons match!`)
  }

  return { missing, extra }
}

console.log('🔍 Verifying icon sprites...\n')

const results = {}

// Check 16px icons
const svg16 = getAllSvgFiles(path.join(ICON_DIR, '16'))
const sprite16Symbols = getSpriteSymbols(path.join(SPRITE_DIR, 'sprite-16.js'))
results['16px'] = compareIconSets(
  svg16,
  sprite16Symbols,
  '16px Icons (public/icon/16 → sprite-16.js)'
)

// Check 24px icons
const svg24 = getAllSvgFiles(path.join(ICON_DIR, '24'))
const sprite24Symbols = getSpriteSymbols(path.join(SPRITE_DIR, 'sprite-24.js'))
results['24px'] = compareIconSets(
  svg24,
  sprite24Symbols,
  '24px Icons (public/icon/24 → sprite-24.js)'
)

// Summary
console.log('\n\n📊 Summary')
console.log('==========')

const totalMissing = Object.values(results).reduce(
  (sum, r) => sum + r.missing.length,
  0
)
const totalExtra = Object.values(results).reduce(
  (sum, r) => sum + r.extra.length,
  0
)

if (totalMissing === 0 && totalExtra === 0) {
  console.log('✅ All sprite files are up to date!')
} else {
  console.log(`❌ ${totalMissing} icons missing from sprites`)
  console.log(`⚠️  ${totalExtra} extra icons in sprites`)
  console.log('\n💡 Run: node scripts/generate-icon-sprite.js')
  process.exit(1)
}
