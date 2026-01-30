const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const { execSync } = require('child_process')

const NOTES_DIR = path.join(process.cwd(), 'content/notes')
const RESULTS_FILE = path.join(process.cwd(), '.notes-processing-results.json')

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function getUniqueFilename(dir, baseName) {
  let filename = `${baseName}.md`
  let filePath = path.join(dir, filename)
  let counter = 1

  while (fs.existsSync(filePath)) {
    filename = `${baseName}-${counter}.md`
    filePath = path.join(dir, filename)
    counter++
  }

  return filename
}

function extractTitleFromContent(body) {
  // Try to find first H1 heading
  const h1Match = body.match(/^#\s+(.+)$/m)
  if (h1Match) {
    return h1Match[1].trim()
  }

  // Try first non-empty line as fallback
  const lines = body.split('\n').filter((line) => line.trim())
  if (lines.length > 0) {
    // Remove any markdown formatting from the first line
    return lines[0].replace(/^#+\s*/, '').trim()
  }

  return null
}

function processNote(filePath, existingFiles) {
  const content = fs.readFileSync(filePath, 'utf8')
  const { data: frontmatter, content: body } = matter(content)

  let modified = false
  const changes = []

  // Ensure title
  if (!frontmatter.title) {
    const titleFromContent = extractTitleFromContent(body)
    const filename = path.basename(filePath, '.md')

    if (titleFromContent) {
      frontmatter.title = titleFromContent
      changes.push(`Added title from content: "${frontmatter.title}"`)
    } else {
      // Derive from filename (convert kebab-case to Title Case)
      frontmatter.title = filename
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase())
      changes.push(`Added title from filename: "${frontmatter.title}"`)
    }
    modified = true
  }

  // Ensure date
  if (!frontmatter.date) {
    frontmatter.date = new Date().toISOString()
    modified = true
    changes.push('Added date')
  }

  // Ensure status
  if (!frontmatter.status) {
    frontmatter.status = 'published'
    modified = true
    changes.push('Added status: published')
  }

  // Check filename matches slugified title
  const currentName = path.basename(filePath, '.md')
  const expectedName = slugify(frontmatter.title)
  let newPath = filePath

  if (currentName !== expectedName && expectedName) {
    const dir = path.dirname(filePath)

    // Check if target filename already exists (excluding current file)
    const otherFiles = existingFiles.filter((f) => f !== filePath)
    const targetExists = otherFiles.some(
      (f) => path.basename(f, '.md') === expectedName
    )

    let finalName
    if (targetExists) {
      finalName = getUniqueFilename(dir, expectedName)
      // Remove .md extension for path construction
      finalName = finalName.replace('.md', '')
    } else {
      finalName = expectedName
    }

    newPath = path.join(dir, `${finalName}.md`)

    if (newPath !== filePath) {
      changes.push(`Renamed: ${currentName}.md → ${finalName}.md`)
      modified = true
    }
  }

  return { frontmatter, body, modified, changes, filePath, newPath }
}

function writeNote(result) {
  const { frontmatter, body, filePath, newPath } = result

  // Write the updated content
  const newContent = matter.stringify(body, frontmatter)
  fs.writeFileSync(filePath, newContent)

  // Rename if needed
  if (newPath !== filePath) {
    fs.renameSync(filePath, newPath)
  }

  return newPath
}

function getChangedNotes() {
  try {
    // Get files changed in the PR (added or modified)
    const changedFiles = execSync(
      'git diff --diff-filter=AM --name-only origin/main...HEAD'
    )
      .toString()
      .trim()
      .split('\n')
      .filter(
        (file) => file.startsWith('content/notes/') && file.endsWith('.md')
      )

    return changedFiles.map((file) => path.join(process.cwd(), file))
  } catch {
    // Fallback: process all notes in directory
    console.log('Could not determine changed files, processing all notes')
    if (!fs.existsSync(NOTES_DIR)) {
      return []
    }
    return fs
      .readdirSync(NOTES_DIR)
      .filter((file) => file.endsWith('.md'))
      .map((file) => path.join(NOTES_DIR, file))
  }
}

function main() {
  const notesToProcess = getChangedNotes()

  if (notesToProcess.length === 0) {
    console.log('No notes to process')
    fs.writeFileSync(RESULTS_FILE, JSON.stringify({ changes: [] }))
    return
  }

  console.log(`Processing ${notesToProcess.length} note(s)...`)

  // Get all existing files for duplicate detection
  const existingFiles = fs.existsSync(NOTES_DIR)
    ? fs
        .readdirSync(NOTES_DIR)
        .filter((f) => f.endsWith('.md'))
        .map((f) => path.join(NOTES_DIR, f))
    : []

  const allChanges = []
  let hasChanges = false

  for (const filePath of notesToProcess) {
    if (!fs.existsSync(filePath)) {
      console.log(`Skipping ${filePath} (file not found)`)
      continue
    }

    try {
      const result = processNote(filePath, existingFiles)

      if (result.modified) {
        const newPath = writeNote(result)
        hasChanges = true

        const displayPath = path.relative(process.cwd(), newPath)
        allChanges.push(
          `**${displayPath}**:\n${result.changes
            .map((c) => `  - ${c}`)
            .join('\n')}`
        )

        console.log(`Processed: ${displayPath}`)
        result.changes.forEach((c) => console.log(`  - ${c}`))

        // Update existing files list if renamed
        if (result.newPath !== result.filePath) {
          const idx = existingFiles.indexOf(result.filePath)
          if (idx !== -1) {
            existingFiles[idx] = result.newPath
          } else {
            existingFiles.push(result.newPath)
          }
        }
      } else {
        console.log(
          `No changes needed: ${path.relative(process.cwd(), filePath)}`
        )
      }
    } catch (error) {
      console.error(`Error processing ${filePath}: ${error.message}`)
    }
  }

  // Write results for the workflow to use
  fs.writeFileSync(RESULTS_FILE, JSON.stringify({ changes: allChanges }))

  // Set output for GitHub Actions
  if (hasChanges) {
    console.log('::set-output name=has_changes::true')
  }

  console.log(`\nDone. ${hasChanges ? 'Changes made.' : 'No changes needed.'}`)
}

main()
