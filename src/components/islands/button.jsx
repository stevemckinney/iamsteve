// components/button.js for islands, as a button. Link buttons render with
// button.astro. The theme lands on the element as an attribute, as React’s
// spread puts it there, and the classes stay concatenated as they are today
const Button = (props) => {
  const styleVariants = {
    dandelion: 'button-dandelion',
  }
  const base = `select-none font-ui text-base/tight lowercase text-center`
  const style = `${styleVariants[props.theme]} ${props.className}`

  return (
    <button {...props} className={`${base} ${style}`}>
      <span>{props.children}</span>
    </button>
  )
}

export default Button
