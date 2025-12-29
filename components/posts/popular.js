import Title from '@/components/title'
import Card from '@/components/card'

export default function PopularPosts({
  posts,
  title,
  linkText,
  linkHref,
  accentColor,
}) {
  return (
    <>
      <Title
        link={linkHref}
        text={linkText}
        ariaID={`popular-${title.toLowerCase()}`}
        className="sm:px-4 md:px-8 sm:-mx-4 md:-mx-8 sm:bg-neutral-01-150 sm:bg-[url(/images/texture.png)] sm:bg-size-[172px_auto] sm:bg-blend-multiply sm:-mt-4.5 md:-mt-5.5"
      >
        Popular <span className={accentColor}>{title}</span>
      </Title>
      <div className="grid col-margin sm:col-content gap-4 md:gap-8 max-sm:grid-flow-col max-sm:auto-cols-auto max-sm:overflow-auto max-sm:snap-x max-sm:snap-always max-sm:overscroll-x-contain md:grid-cols-2 xl:grid-cols-3 max-sm:px-8 max-sm:py-8 max-sm:-my-8">
        {posts.map((post) => (
          <Card
            size="container"
            frontmatter={post}
            image={false}
            key={post._id}
            className="max-sm:w-[calc(100vw-48px)] max-sm:snap-center md:col-span-1"
          />
        ))}
      </div>
    </>
  )
}
