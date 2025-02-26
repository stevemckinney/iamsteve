const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const dedent = require('dedent')
const { execSync } = require('child_process')

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

const createBranch = (title) => {
  const branchName = `post/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
  try {
    execSync(`git checkout -b ${branchName}`)
    return { success: true, branchName }
  } catch (error) {
    return { success: false, error }
  }
}

const genFrontMatter = (answers) => {
  let d = new Date()
  const date = d.toISOString()
  const nextId = getNextPostId()

  const imageBase = answers.title
    ? answers.title
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')
    : 'untitled'

  let frontmatter = dedent`---
  title: ${answers.title ? answers.title : 'Untitled'}
  date: "${date}"
  lastmod: "${date}"
  summary:
  metadesc:
  theme: "#f1e8e4"
  tags: []
  categories: ${JSON.stringify(answers.categories)}
  images: []
  large: false # /images/blog/${imageBase}.svg
  medium: false # /images/blog/${imageBase}-medium.svg
  ogImage: "/opengraph-image.png"
  status: ${answers.status}
  codepen: false
  twitter: false
  id: ${nextId}
  fileroot: ${imageBase}
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
      name: 'createBranch',
      message: 'Create a git branch for this post?',
      type: 'confirm',
      default: true,
    },
    {
      name: 'structure',
      message: 'Choose post structure:',
      type: 'list',
      choices: [
        { name: 'Single file', value: 'file' },
        { name: 'Folder with index', value: 'folder' }
      ],
    },
    {
      name: 'categories',
      message: 'Choose categories:',
      type: 'checkbox',
      choices: [
        'Design',
        'Quick tip',
        'Typography',
        'Colour',
        'Resources',
        'UX design',
        'Visual design',
        'Code',
        'Animation',
        'CSS',
        'Patterns',
        'JavaScript'
      ],
      validate: (input) => {
        if (input.length === 0) {
          return 'Please select at least one category'
        }
        return true
      }
    },
    {
      name: 'status',
      message: 'Set post status:',
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
    const postId = String(nextId).padStart(4, '0')
    const postName = `${postId}-${fileName}`

    let filePath
    if (answers.structure === 'folder') {
      // Create folder and index.md file
      const folderPath = path.join('content/blog', postName)
      fs.mkdirSync(folderPath, { recursive: true })
      filePath = path.join(folderPath, 'index.md')
    } else {
      // Create single file
      filePath = path.join('content/blog', `${postName}.md`)
    }

    fs.writeFile(filePath, frontmatter, { flag: 'wx' }, (err) => {
      if (err) {
        throw err
      } else {
        console.log(`\nSelected categories:`)
        answers.categories.forEach(cat => console.log(`- ${cat}`))
        console.log(`\nBlog post generated successfully at ${filePath}`)

        if (answers.structure === 'folder') {
          console.log(`\nFolder created for assets at: content/blog/${postName}/`)
        }

        // Create branch if selected
        if (answers.createBranch) {
          const { success, branchName, error } = createBranch(answers.title)
          if (success) {
            console.log(`\nCreated and switched to branch: ${branchName}`)
          } else {
            console.log('\nCould not create git branch:', error?.message || 'Unknown error')
          }
        }
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
