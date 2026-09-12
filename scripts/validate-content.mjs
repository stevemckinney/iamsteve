/**
 * Check content frontmatter against the schemas the build uses.
 *
 * A markdown file with missing or malformed frontmatter fails the Vercel
 * build outright, which takes the site's next deploy with it. This catches
 * the same problem at commit time, where it costs seconds instead.
 *
 * Pass file paths to check only those (lint-staged does this), or none to
 * check every content file.
 */
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { parse, stringify } from 'yaml'
import {
  postSchema,
  noteSchema,
  collectionSchema,
  pageSchema,
} from '../lib/content-schemas.mjs'

const COLLECTIONS = [
  { directory: 'content/blog', schema: postSchema },
  { directory: 'content/notes', schema: noteSchema },
  { directory: 'content/collections', schema: collectionSchema },
  { directory: 'content/pages', schema: pageSchema },
]

// Which collection owns this file, if any
function collectionFor(file) {
  const relative = path.relative(process.cwd(), path.resolve(file))
  return COLLECTIONS.find(({ directory }) =>
    relative.startsWith(`${directory}${path.sep}`)
  )
}

// Recursive, because the collections all include '**/*.md' — a post can sit in
// its own folder as index.md
function findAllContent() {
  return COLLECTIONS.flatMap(({ directory }) =>
    fs.existsSync(directory)
      ? fs
          .readdirSync(directory, { recursive: true })
          .filter((file) => file.endsWith('.md'))
          .map((file) => path.join(directory, file))
      : []
  )
}

// content-collections swaps gray-matter's default engine for the yaml package,
// which leaves an unquoted date as a string rather than coercing it to a Date.
// Parse the same way here, or dozens of valid files look broken.
function frontmatter(fileContent) {
  return matter(fileContent, {
    engines: { yaml: { parse: (content) => parse(content.trim()), stringify } },
  })
}

// Returns the schema failures for one file, or [] if it passes
function validate(file, schema) {
  let parsed
  try {
    parsed = frontmatter(fs.readFileSync(file, 'utf8'))
  } catch (error) {
    return [`frontmatter could not be read: ${error.message}`]
  }

  // content-collections hands the body to the schema as `content`
  const result = schema.safeParse({
    ...parsed.data,
    content: parsed.content.trim(),
  })
  if (result.success) return []

  return result.error.issues.map(
    (issue) => `${issue.path.join('.') || 'frontmatter'}: ${issue.message}`
  )
}

const files = process.argv.slice(2)
const toCheck = files.length > 0 ? files : findAllContent()

let failed = false

for (const file of toCheck) {
  const collection = collectionFor(file)
  if (!collection || !fs.existsSync(file)) continue

  const problems = validate(file, collection.schema)
  if (problems.length === 0) continue

  failed = true
  console.error(
    `\nValidation failed on ${path.relative(
      process.cwd(),
      path.resolve(file)
    )}:`
  )
  problems.forEach((problem) => console.error(`- ${problem}`))
}

if (failed) {
  console.error(
    '\nThe build reads frontmatter with these same rules, so this would fail on deploy.'
  )
  console.error(
    'Add the missing fields, or scaffold with `pnpm note`/`pnpm post`.\n'
  )
  process.exit(1)
}
