import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getFileBySlug } from '@/lib/mdx'

const DEFAULT_LAYOUT = 'AuthorLayout'

export async function getStaticProps() {
  const authorDetails = await getFileBySlug('authors', ['default'])
  return { props: { authorDetails } }
}

export default function About({ authorDetails }) {
  const { mdxSource, frontmatter } = authorDetails

  return (
    <MDXLayoutRenderer
      layout={frontmatter.layout || DEFAULT_LAYOUT}
      mdxSource={mdxSource}
      frontmatter={frontmatter}
    />
  )
}
