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
  url: ${answers.url}
  date: "${date}"
  collection:
    ${answers.collection ? `- ${answers.collection}` : ''}
  type: Collections
  `
  frontmatter = frontmatter + '\n---'

  return frontmatter
}

inquirer
  .prompt([
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
      name: 'extension',
      message: 'Extension:',
      type: 'list',
      choices: ['mdx', 'md'],
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

    // 00 will break here at some point, but that's a long while off
    const filePath = `content/collections/${fileName ? fileName : 'untitled'}.${
      answers.extension ? answers.extension : 'md'
    }`
    fs.writeFile(filePath, frontmatter, { flag: 'wx' }, (err) => {
      if (err) {
        throw err
      } else {
        console.log(`Collection item generated successfully at ${filePath}`)
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
