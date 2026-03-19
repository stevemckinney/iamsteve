#!/usr/bin/env node

/**
 * App Icon Extractor
 *
 * Extracts 1024x1024 PNG icons from macOS app bundles.
 * Uses iconutil to convert .icns → PNG, giving clean artwork
 * without the macOS-rendered drop shadow.
 *
 * Usage:
 *   node scripts/extract-app-icons.js
 */

import { execSync, spawnSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import os from 'os'

const OUTPUT_DIR = path.join(process.cwd(), 'public/icon/apps')
const ORIGINAL_DIR = path.join(OUTPUT_DIR, 'original')
const OUTPUT_SIZE = 96 // 2× of 48px display size

// Map of output filename → app bundle path (or special handler)
const APPS = {
  // Design
  'figma.png': '/Applications/Figma Beta.app',
  'illustrator.png':
    '/Applications/Adobe Illustrator 2026/Adobe Illustrator.app',
  'affinity-photo.png': '/Applications/Affinity Photo 2.app',
  'xscope.png': '/Applications/xScope.app',
  'sip.png': '/Applications/Sip.app',
  'cleanshot-x.png': '/Applications/CleanShot X.app',
  'acorn.png': '/Applications/Acorn.app',
  'mymind.png': '/Applications/mymind.app',

  // Code
  'nova.png': '/Applications/Nova.app',
  'dash.png': '/Applications/Dash.app',
  'terminal.png': '/System/Applications/Utilities/Terminal.app',
  'github-desktop.png': '/Applications/GitHub Desktop.app',

  // Utility
  'one-switch.png': '/Applications/One Switch.app',
  'things.png': '/Applications/Things3.app',
  'ia-writer.png': '/Applications/iA Writer.app',
  'icloud-drive.png':
    '/System/Library/CoreServices/Finder.app/Contents/Applications/iCloud Drive.app',
  'raycast.png': '/Applications/Raycast.app',
}

function findIcns(appPath) {
  // Read Info.plist to find the CFBundleIconFile
  const plistPath = path.join(appPath, 'Contents/Info.plist')
  if (!fs.existsSync(plistPath)) {
    console.warn(`  ⚠ No Info.plist found in ${appPath}`)
    return null
  }

  // Use PlistBuddy to read the icon file name
  const result = spawnSync(
    '/usr/libexec/PlistBuddy',
    ['-c', 'Print :CFBundleIconFile', plistPath],
    { encoding: 'utf8' }
  )

  let iconName = result.stdout.trim()
  if (!iconName) {
    // Try CFBundleIconName as fallback
    const result2 = spawnSync(
      '/usr/libexec/PlistBuddy',
      ['-c', 'Print :CFBundleIconName', plistPath],
      { encoding: 'utf8' }
    )
    iconName = result2.stdout.trim()
  }

  if (!iconName) {
    console.warn(`  ⚠ No icon name found in Info.plist for ${appPath}`)
    return null
  }

  // Ensure .icns extension
  if (!iconName.endsWith('.icns')) iconName += '.icns'

  const icnsPath = path.join(appPath, 'Contents/Resources', iconName)
  if (!fs.existsSync(icnsPath)) {
    // Try without extension (some bundles omit it in plist)
    const bare = icnsPath.replace('.icns', '')
    if (fs.existsSync(bare)) return bare

    console.warn(`  ⚠ Icon file not found: ${icnsPath}`)
    return null
  }

  return icnsPath
}

function extractFromAssetCatalogue(appPath, outputPath) {
  // For apps that use compiled asset catalogues instead of loose .icns files.
  // Uses a Swift one-liner via NSWorkspace to render the icon at 1024x1024.
  const swiftCode = `
import AppKit
let icon = NSWorkspace.shared.icon(forFile: "${appPath}")
icon.size = NSSize(width: 1024, height: 1024)
guard let tiff = icon.tiffRepresentation,
      let rep = NSBitmapImageRep(data: tiff),
      let png = rep.representation(using: .png, properties: [:]) else { exit(1) }
try! png.write(to: URL(fileURLWithPath: "${path.join(
    ORIGINAL_DIR,
    path.basename(outputPath)
  )}"))
`.trim()

  try {
    const result = spawnSync('swift', ['-'], {
      input: swiftCode,
      encoding: 'utf8',
      timeout: 15000,
    })
    if (result.status !== 0) return false
    // Resize original to OUTPUT_SIZE
    const originalPath = path.join(ORIGINAL_DIR, path.basename(outputPath))
    execSync(
      `sips -s format png -Z ${OUTPUT_SIZE} "${originalPath}" --out "${outputPath}"`,
      { stdio: 'pipe' }
    )
    return true
  } catch {
    return false
  }
}

function extractIcon(icnsPath, outputPath) {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'iconset-'))

  try {
    // Convert .icns → iconset folder
    execSync(
      `iconutil --convert iconset --output "${tmpDir}/icon.iconset" "${icnsPath}"`,
      {
        stdio: 'pipe',
      }
    )

    // Find the largest PNG in the iconset
    const files = fs.readdirSync(`${tmpDir}/icon.iconset`)
    const sized = files
      .filter((f) => f.endsWith('.png') && !f.includes('@'))
      .map((f) => {
        const match = f.match(/(\d+)x\d+/)
        return { file: f, size: match ? parseInt(match[1]) : 0 }
      })
      .sort((a, b) => b.size - a.size)

    // Prefer 512x512@2x (= 1024px) or largest available
    const retinaFile = files.find((f) => f.includes('512x512@2x'))
    const best = retinaFile || sized[0]?.file

    if (!best) {
      console.warn(`  ⚠ No suitable PNG found in iconset`)
      return false
    }

    const srcPng = path.join(tmpDir, 'icon.iconset', best)
    // Keep original
    const originalPath = path.join(ORIGINAL_DIR, path.basename(outputPath))
    fs.copyFileSync(srcPng, originalPath)
    // Resize to OUTPUT_SIZE for web
    execSync(
      `sips -s format png -Z ${OUTPUT_SIZE} "${originalPath}" --out "${outputPath}"`,
      { stdio: 'pipe' }
    )
    return true
  } catch (err) {
    console.warn(`  ⚠ iconutil failed: ${err.message}`)
    return false
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true })
  }
}

// Main
console.log('\n🎨 Extracting app icons...\n')

fs.mkdirSync(OUTPUT_DIR, { recursive: true })
fs.mkdirSync(ORIGINAL_DIR, { recursive: true })

for (const [filename, appPath] of Object.entries(APPS)) {
  const outputPath = path.join(OUTPUT_DIR, filename)

  if (!fs.existsSync(appPath)) {
    console.log(`  ⏭ ${filename} — app not found at ${appPath}`)
    continue
  }

  const icnsPath = findIcns(appPath)
  let ok = false

  if (icnsPath) {
    ok = extractIcon(icnsPath, outputPath)
  } else {
    // Fallback for asset catalogue apps
    ok = extractFromAssetCatalogue(appPath, outputPath)
  }
  if (ok) {
    console.log(`  ✓ ${filename}`)
  }
}

console.log('\n✅ Done\n')
