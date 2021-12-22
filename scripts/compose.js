const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const dedent = require('dedent')

const root = process.cwd()

const getAuthors = () => {
  const authorPath = path.join(root, 'data', 'authors')
  const authorList = fs.readdirSync(authorPath).map((filename) => path.parse(filename).name)
  return authorList
}

const getLayouts = () => {
  const layoutPath = path.join(root, 'layouts')
  const layoutList = fs
    .readdirSync(layoutPath)
    .map((filename) => path.parse(filename).name)
    .filter((file) => file.toLowerCase().includes('post'))
  return layoutList
}

const genFrontMatter = (answers) => {
  let d = new Date()
  const date = d.toISOString()
  const tagArray = answers.tags.split(',')
  tagArray.forEach((tag, index) => (tagArray[index] = tag.trim()))
  const tags = "'" + tagArray.join("','") + "'"
  const authorArray = answers.authors.length > 0 ? "'" + answers.authors.join("','") + "'" : ''

  let frontmatter = dedent`---
  title: ${answers.title ? answers.title : 'Untitled'}
  date: '${date}'
  lastmod: '${date}'
  summary: ${answers.summary ? answers.summary : ' '}
  metadesc: ${answers.summary ? answers.summary : ' '}
  theme: "#e9f5f5"
  tags: [${answers.tags ? tags : ''}]
  categories: []
  images: []
  ogImage: "/assets/og/cover.jpg"
  layout: ${answers.layout}
  draft: ${answers.status}
  id: ${answers.id}
  fileroot: ${answers.title ? answers.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') : 'untitled'}
  `

  if (answers.authors.length > 0) {
    frontmatter = frontmatter + '\n' + `authors: [${authorArray}]`
  }

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
      name: 'id',
      message: 'Enter the post ID:',
      type: 'input',
    },
    {
      name: 'extension',
      message: 'Choose post extension:',
      type: 'list',
      choices: ['mdx', 'md'],
    },
    {
      name: 'authors',
      message: 'Choose authors:',
      type: 'checkbox',
      choices: getAuthors,
    },
    {
      name: 'summary',
      message: 'Enter post summary:',
      type: 'input',
    },
    {
      name: 'status',
      message: 'Set post as draft?',
      type: 'list',
      choices: ['open', 'draft', 'closed'],
    },
    {
      name: 'tags',
      message: 'Any Tags? Separate them with , or leave empty if no tags.',
      type: 'input',
    },
    {
      name: 'layout',
      message: 'Select layout',
      type: 'list',
      choices: getLayouts,
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
    const filePath = `data/blog/${fileName ? fileName : 'untitled'}.${
      answers.extension ? answers.extension : 'md'
    }`
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
