import Icon from './icon'

export default function Chip({ children, theme, iconKind }) {
  let iconTheme;
  let textTheme;

  if (theme === 'rio') {
    iconTheme = `bg-rio-400`
    textTheme = `bg-rio-150/60`
  }

  return <p className="flex gap-1"><span className={`${iconTheme}`}><Icon kind={iconKind} /></span><span className={`${textTheme}`}>{children}</span></p>
}
