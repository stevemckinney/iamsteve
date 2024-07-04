import { visit } from 'unist-util-visit'

const customizeTOC = (toc) => {
  try {
    const { children } = toc
    const childrenOfChildren = children?.[0]?.children
    if (!children?.length || !childrenOfChildren?.length) return null
  } catch (e) {
    console.log(e)
  }
  return {
    position: 'beforebegin',
    type: 'element',
    tagName: 'nav',
    properties: { className: 'toc' },
    headings: ['h2', 'h3', 'h4'],
    children: [
      {
        type: 'element',
        tagName: 'h2',
        properties: { className: 'toc-title px-4' },
        children: [
          {
            type: 'text',
            value: 'Contents',
          },
        ],
      },
      ...(toc.children || []),
    ],
  }
}

export default customizeTOC
