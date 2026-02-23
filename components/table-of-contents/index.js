import { createNestedHeadings } from './create-nested-headings'
import Collapsible from './collapsible'

export default function TableOfContents({ headings, open = false }) {
  const nestedHeadings = createNestedHeadings(headings)

  return (
    <Collapsible
      nestedHeadings={nestedHeadings}
      headings={headings}
      open={open}
    />
  )
}
