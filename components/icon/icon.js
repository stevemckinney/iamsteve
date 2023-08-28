const Icon = ({ kind, color }) => {
  let icon = kind ? kind : 'folder'
  return (
    <>
      <svg width="24" height="24" viewBox="0 0 24 24" className={color ? color : 'text-fern-1100'}>
        <use xlinkHref={`#${icon.toLowerCase()}`} />
      </svg>
    </>
  )
}

export default Icon
