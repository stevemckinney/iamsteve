const Icon = ({ kind, color }) => {
  // <use href={`/icon/sprite.svg#${kind.toLowerCase()}`} />
  return (
    <>
      <svg width="24" height="24" viewBox="0 0 24 24" className={color ? color : 'text-fern-1100'}>
        <use xlinkHref={`#${kind.toLowerCase()}`} />
      </svg>
    </>
  )
}

export default Icon
