import { getAllFilesFrontMatter } from '@/lib/mdx'

export async function getStaticProps() {
    const posts = await getAllFilesFrontMatter('blog')
    
    return { props: { posts } }
}

export default function Loop({ posts, amount }) {
    return (
        <>
        const posts = posts.slice(0, {amount}).map((post) => {
            return (
                {post}
            )
        }
        </>
    )
}