import { getAllFilesFrontMatter } from '@/lib/mdx'

export async function getStaticProps() {
    const posts = await getAllFilesFrontMatter('blog')
    
    return { props: { posts } }
}

export default function Loop({ posts }) {
    return (
        {posts}
    )
}