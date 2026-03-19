import { visit } from 'unist-util-visit'

/**
 * Rehype plugin that wraps heading content in an anchor link with a
 * trailing icon, similar to Linear's changelog headings.
 *
 * Produces:
 *   <h2 id="slug">
 *     <a class="fragment" href="#slug" aria-hidden="true" tabindex="-1">
 *       Heading text
 *       <span class="fragment-icon">
 *         <svg class="icon" ...><use href="#link-16" /></svg>
 *       </span>
 *     </a>
 *   </h2>
 *
 * Requires rehype-slug to run first to add id attributes.
 */
export default function rehypeHeadingLinks() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (
        !['h2', 'h3', 'h4', 'h5', 'h6'].includes(node.tagName) ||
        !node.properties?.id
      ) {
        return
      }

      const icon = {
        type: 'element',
        tagName: 'span',
        properties: { className: ['fragment-icon'] },
        children: [
          {
            type: 'element',
            tagName: 'svg',
            properties: {
              className: ['icon'],
              'aria-hidden': 'true',
              focusable: 'false',
              width: '16',
              height: '16',
            },
            children: [
              {
                type: 'element',
                tagName: 'use',
                properties: { href: '#link-16' },
                children: [],
              },
            ],
          },
        ],
      }

      const link = {
        type: 'element',
        tagName: 'a',
        properties: {
          className: ['fragment'],
          href: `#${node.properties.id}`,
          ariaHidden: 'true',
          tabIndex: -1,
        },
        children: [...node.children, icon],
      }

      node.children = [link]
    })
  }
}
