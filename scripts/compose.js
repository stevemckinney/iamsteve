// In the categories choices section, update with all non-excluded categories:
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
}

// In the genFrontMatter function, update the medium image path:
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
