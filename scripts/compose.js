const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const dedent = require('dedent')

const root = process.cwd()

const genFrontMatter = (answers) => {
  let d = new Date()
  const date = d.toISOString()

  var currentPostID

  fs.readFile('./.current-post-id', function (err, data) {
    data = data.toString('utf-8')
    const i = parseInt(data)
    var l = i
    l++
    currentPostID = String(l)
    fs.writeFile('./.current-post-id', currentPostID, function (err, data) {})
  })

  var updatedPostID = fs.readFileSync('./.current-post-id')

  let frontmatter = dedent`---
  title: ${answers.title ? answers.title : 'Untitled'}
  date: "${date}"
  lastmod: "${date}"
  summary:
  metadesc:
  theme: "#e9f5f5"
  tags: []
  categories: []
  images: []
  ogImage: "/assets/og/cover.jpg"
  layout: post
  draft: ${answers.status}
  codepen: false
  twitter: false
  id: ${updatedPostID}
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

  return frontmatter
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
    var updatedPostID = fs.readFileSync('./.current-post-id')

    // Remove special characters and replace space with -
    const fileName = answers.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .replace(/ /g, '-')
      .replace(/-+/g, '-')
    const frontmatter = genFrontMatter(answers)

    // 00 will break here at some point, but that's a long while off
    const filePath = `content/blog/${
      fileName ? '00' + updatedPostID + '-' + fileName : 'untitled'
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
