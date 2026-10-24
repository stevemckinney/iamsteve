// React reads a JSX element’s key and never renders it, where Astro writes
// it out as an attribute. Content written for React keeps its keys (about’s
// best posts list), so they’re dropped before Astro renders it
import { visit } from 'unist-util-visit'

export default function remarkDropKeys() {
  return (tree) => {
    visit(tree, ['mdxJsxFlowElement', 'mdxJsxTextElement'], (node) => {
      node.attributes = node.attributes.filter(
        (attribute) => attribute.name !== 'key'
      )
    })
  }
}
