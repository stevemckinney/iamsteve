const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const dedent = require('dedent')

// Function to normalize collection names to match slugs
const normalizeCollection = (collection) => {
  // Map of common collection names to their proper slug format
  const collectionMap = {
    'accessibility': 'Accessibility',
    'css': 'CSS',
    'code': 'Code',
    'colour': 'Colour',
    'color': 'Colour', // Handle US spelling
    'content': 'Content',
    'favourites': 'Favourites',
    'favorites': 'Favourites', // Handle US spelling
    'foundry': 'Foundry',
    'inspiration': 'Inspiration',
    'motion': 'Motion',
    'publication': 'Publication',
    'resource': 'Resource',
    'typography': 'Typography',
    'ux design': 'ux-design',
    'ux-design': 'ux-design',
    'uxdesign': 'ux-design',
  }

  // Normalize input: lowercase and trim
  const normalized = collection.toLowerCase().trim()

  // Return mapped value or original if not found
  return collectionMap[normalized] || collection
}

// Function to generate frontmatter
const genFrontMatter = (answers) => {
  let d = new Date()
  const date = d.toISOString()

  // Normalize the collection name
  const normalizedCollection = normalizeCollection(answers.collection)

  let frontmatter = dedent`---
  title: "${answers.title ? answers.title : 'Untitled'}"
  url: ${answers.url}
  date: "${date}"
  collection:
    ${normalizedCollection ? `- ${normalizedCollection}` : ''}
  type: Collections
  kind: ${answers.kind || 'website'}
  `
  frontmatter = frontmatter + '\n---'

  return frontmatter
}

// Function to normalize URLs for comparison and filename generation
const normalizeUrlForFilename = (url) => {
  try {
    if (!url) return 'untitled'

    let urlObj
    try {
      urlObj = new URL(url)
    } catch (e) {
      return 'untitled'
    }

    let hostname = urlObj.hostname.toLowerCase()
    if (hostname.startsWith('www.')) {
      hostname = hostname.substring(4)
    }

    const domainParts = hostname.split('.')
    const domainWithoutTld = domainParts.slice(0, -1).join('-')

    let path = urlObj.pathname.replace(/^\/|\/$/g, '')

    const combined = path ? `${domainWithoutTld}-${path}` : domainWithoutTld

    let slug = combined
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 100)

    return slug || 'untitled'
  } catch (e) {
    console.error(`Error generating filename from URL ${url}: ${e.message}`)
    return 'untitled'
  }
}

// Function to handle interactive input
const handleInteractiveInput = async () => {
  const answers = await inquirer.prompt([
    {
      name: 'title',
      message: 'Title:',
      type: 'input',
    },
    {
      name: 'url',
      message: 'URL:',
      type: 'input',
    },
    {
      name: 'collection',
      message: 'Collection:',
      type: 'input',
    },
    {
      name: 'kind',
      message: 'Kind:',
      type: 'list',
      choices: ['website', 'article', 'resource', 'tool'],
      default: 'website',
    },
    {
      name: 'extension',
      message: 'Extension:',
      type: 'list',
      choices: ['mdx', 'md'],
    },
  ])

  const fileName = normalizeUrlForFilename(answers.url)
  const frontmatter = genFrontMatter(answers)
  const filePath = `content/collections/${fileName}.${answers.extension || 'md'}`

  fs.writeFile(filePath, frontmatter, { flag: 'wx' }, (err) => {
    if (err) {
      throw err
    } else {
      console.log(`Collection item generated successfully at ${filePath}`)

      // Update .last-collection-import file with today's date
      const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD format
      try {
        fs.writeFileSync('.last-collection-import', today)
        console.log(`Updated .last-collection-import to ${today}`)
      } catch (err) {
        console.error(`Error updating .last-collection-import: ${err.message}`)
      }
    }
  })
}

// Function to handle JSON import
const handleJsonImport = (bookmarksFilePath) => {
  try {
    const bookmarksData = fs.readFileSync(bookmarksFilePath, 'utf8')
    const bookmarks = JSON.parse(bookmarksData)

    bookmarks.forEach(bookmark => {
      const fileName = normalizeUrlForFilename(bookmark.url)
      const frontmatter = genFrontMatter({
        ...bookmark,
        kind: bookmark.kind || 'website'
      })
      const filePath = `content/collections/${fileName}.${bookmark.extension || 'md'}`

      try {
        fs.writeFileSync(filePath, frontmatter, { flag: 'wx' })
        console.log(`Created: ${fileName}`)
      } catch (err) {
        console.error(`Error creating file for ${bookmark.url}: ${err.message}`)
      }
    })

    // Update .last-collection-import file with today's date
    const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD format
    try {
      fs.writeFileSync('.last-collection-import', today)
      console.log(`\nUpdated .last-collection-import to ${today}`)
    } catch (err) {
      console.error(`Error updating .last-collection-import: ${err.message}`)
    }

    console.log(`\nImport complete: ${bookmarks.length} items processed`)
  } catch (error) {
    console.error(`Error importing from JSON: ${error.message}`)
  }
}

// Main execution
const args = process.argv.slice(2)
const jsonFilePath = args[0]

if (jsonFilePath) {
  handleJsonImport(jsonFilePath)
} else {
  handleInteractiveInput()
    .catch((error) => {
      if (error.isTtyError) {
        console.log("Prompt couldn't be rendered in the current environment")
      } else {
        console.log('Something went wrong, sorry!')
      }
    })
}
