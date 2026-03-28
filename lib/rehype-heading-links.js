import { visit } from 'unist-util-visit'

/**
 * Rehype plugin that wraps heading content in a non-crawlable span with a
 * trailing icon, similar to Linear's changelog headings.
 *
 * Uses a <span> instead of <a> so Google does not index fragment URLs
 * as separate pages. The heading id attribute (added by rehype-slug)
 * still allows fragment links to work for sharing and scrolling.
 *
 * Produces:
 *   <h2 id="slug">
 *     <span class="fragment">
 *       Heading text
 *       <span class="fragment-icon">
 *         <svg class="icon" ...><use href="#link-16" /></svg>
 *       </span>
 *     </span>
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

      const wrapper = {
        type: 'element',
        tagName: 'span',
        properties: {
          className: ['fragment'],
        },
        children: [...node.children, icon],
      }

      node.children = [wrapper]
    })
  }
}
