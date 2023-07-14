import Title from '@/components/Title'

export default function Posts({ title, link, text, children, size, position }) {
  // aria label
  const ariaID = `${title.toLowerCase().split(' ').join('-')}-title`
  const postsClass = position === `top` ? `posts pt7 pb6 pt8-d` : `posts pt7 pb6 pb8-d`

  return (
    <>
      <section className={postsClass} aria-labelledby={ariaID}>
        <Title title={title} link={link} text={text} id={ariaID} />
        <div className={`scroll scroll-${size} contain-scroll`}>{children}</div>
      </section>
    </>
  )
}
