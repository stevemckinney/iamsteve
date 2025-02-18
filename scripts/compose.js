const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const dedent = require('dedent')

const root = process.cwd()

// Function to get the next available post ID
const getNextPostId = () => {
  const blogDir = path.join(root, 'content/blog')

  // Get all blog post files
  const posts = fs.readdirSync(blogDir)
    .filter(file =>
      file.match(/^\d{4}-.*\.(md|mdx)$/) &&
      fs.statSync(path.join(blogDir, file)).isFile()
    )

  // Find highest ID from both filenames and frontmatter
  const highestId = posts.reduce((max, file) => {
    const content = fs.readFileSync(path.join(blogDir, file), 'utf8')
    const fileId = parseInt(file.substring(0, 4))

    // Extract ID from frontmatter
    const frontmatterMatch = content.match(/id:\s*(\d+)/)
    const frontmatterId = frontmatterMatch ? parseInt(frontmatterMatch[1]) : 0

    return Math.max(max, fileId, frontmatterId)
  }, 0)

  return highestId + 1
}

const genFrontMatter = (answers) => {
  let d = new Date()
  const date = d.toISOString()
  const nextId = getNextPostId()

  let frontmatter = dedent`---
  title: ${answers.title ? answers.title : 'Untitled'}
  date: "${date}"
  lastmod: "${date}"
  summary:
  metadesc:
  theme: "#f1e8e4"
  tags: []
  categories: []
  images: []
  large: false # /images/blog/${
    answers.title
      ? answers.title
          .toLowerCase()
          .replace(/ /g, '-')
          .replace(/[^\w-]+/g, '')
      : 'untitled'
  }.svg
  medium: false # /images/blog/${
    answers.title
      ? answers.title
          .toLowerCase()
          .replace(/ /g, '-')
          .replace(/[^\w-]+/g, '')
      : 'untitled'
  }.svg
  ogImage: "/opengraph-image.png"
  status: ${answers.status}
  codepen: false
  twitter: false
  id: ${nextId}
  fileroot: ${
    answers.title
      ? answers.title
          .toLowerCase()
          .replace(/ /g, '-')
          .replace(/[^\w-]+/g, '')
      : 'untitled'
  }
  `

  frontmatter = frontmatter + '\n---'

  return { frontmatter, nextId }
}

inquirer
  .prompt([
    {
      name: 'title',
      message: 'Enter post title:',
      type: 'input',
    },
    {
      name: 'extension',
      message: 'Choose post extension:',
      type: 'list',
      choices: ['mdx', 'md'],
    },
    {
      name: 'status',
      message: 'Set post as draft?',
      type: 'list',
      choices: ['open', 'draft', 'closed'],
    },
  ])
  .then((answers) => {
    // Remove special characters and replace space with -
    const fileName = answers.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .replace(/ /g, '-')
      .replace(/-+/g, '-')

    const { frontmatter, nextId } = genFrontMatter(answers)

    const filePath = `content/blog/${
      fileName ? String(nextId).padStart(4, '0') + '-' + fileName : 'untitled'
    }.${answers.extension ? answers.extension : 'md'}`

    fs.writeFile(filePath, frontmatter, { flag: 'wx' }, (err) => {
      if (err) {
        throw err
      } else {
        console.log(`Blog post generated successfully at ${filePath}`)
      }
    })
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment")
    } else {
      console.log('Something went wrong, sorry!')
    }
  })
