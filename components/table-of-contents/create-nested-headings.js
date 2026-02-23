export function createNestedHeadings(headings) {
  const nestedHeadings = []
  const headingStack = []

  headings.forEach((heading) => {
    const { level, text, slug } = heading
    const linkMatch = text.match(/\[(.*?)\]\((.*?)\)/)
    const linkText = linkMatch
      ? linkMatch[1]
      : text.replace(/<a.*?>(.*?)<\/a>/, '$1')
    const linkUrl = linkMatch ? linkMatch[2] : ''

    if (level === 'two') {
      const newHeading = {
        level,
        text: linkText,
        slug,
        url: linkUrl,
        children: [],
      }
      nestedHeadings.push(newHeading)
      headingStack.push(newHeading)
    } else if (level === 'three' && headingStack.length > 0) {
      headingStack[headingStack.length - 1].children.push({
        level,
        text: linkText,
        slug,
        url: linkUrl,
      })
    }
  })

  return nestedHeadings
}
