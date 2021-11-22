import Title from '@/components/Title'

export default function Posts({ title, link, text, children, size }) {
  // aria label
  const ariaID = `${title.toLowerCase().split(' ').join('-')}-title`

  return (
    <>
      <section className="posts pt7 pb6 pb8-d" aria-labelledby={ariaID}>
        <Title title={title} link={link} text={text} id={ariaID} />
        <div className={`scroll scroll-${size} contain-scroll`}>
          {children}
        </div>
      </section>
    </>
  )
}
