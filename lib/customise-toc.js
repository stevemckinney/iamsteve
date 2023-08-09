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
    type: 'element',
    tagName: 'div',
    properties: { className: 'toc' },
    children: [
      {
        type: 'element',
        tagName: 'p',
        properties: { className: 'title' },
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
