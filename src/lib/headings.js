// The table of contents data, as content-collections.ts and
// components/table-of-contents built it. Headings come from the raw
// markdown, so heading lines inside code blocks count too
import GithubSlugger from 'github-slugger'

export function computeHeadings(raw) {
  const regXHeader = /\n(?<flag>#{1,6})\s+(?<content>.+)/g
  const slugger = new GithubSlugger()
  return Array.from(raw.matchAll(regXHeader)).map(({ groups }) => {
    const flag = groups?.flag
    const content = groups?.content
    const cleanContent = content
      ? content.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/<[^>]+>/g, '')
      : ''
    return {
      level:
        flag?.length == 1
          ? 'one'
          : flag?.length == 2
          ? 'two'
          : flag?.length == 3
          ? 'three'
          : 'four',
      text: cleanContent,
      slug: cleanContent ? slugger.slug(cleanContent) : undefined,
    }
  })
}

// Second level headings, each with the third level headings after it
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
