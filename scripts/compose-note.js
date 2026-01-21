const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const dedent = require('dedent')

const root = process.cwd()

const genFrontMatter = (answers) => {
  let d = new Date()
  const date = d.toISOString()

  let frontmatter = dedent`---
  title: ${answers.title ? answers.title : 'Untitled'}
  date: "${date}"
  status: ${answers.status}
  summary: ${answers.summary || ''}
  `

  frontmatter = frontmatter + '\n---'

  return frontmatter
}

inquirer
  .prompt([
    {
      name: 'title',
      message: 'Enter note title:',
      type: 'input',
    },
    {
      name: 'summary',
      message: 'Enter note summary (optional):',
      type: 'input',
    },
    {
      name: 'status',
      message: 'Set note status:',
      type: 'list',
      choices: ['published', 'draft'],
      default: 'draft',
    },
  ])
  .then((answers) => {
    // Remove special characters and replace space with -
    const fileName = answers.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .replace(/ /g, '-')
      .replace(/-+/g, '-')

    const frontmatter = genFrontMatter(answers)

    // Create notes directory if it doesn't exist
    const notesDir = path.join('content/notes')
    if (!fs.existsSync(notesDir)) {
      fs.mkdirSync(notesDir, { recursive: true })
    }

    // Create single file
    const filePath = path.join(notesDir, `${fileName}.md`)

    fs.writeFile(filePath, frontmatter, { flag: 'wx' }, (err) => {
      if (err) {
        throw err
      } else {
        console.log(`\nNote generated successfully at ${filePath}`)
        console.log(`Status: ${answers.status}`)
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
