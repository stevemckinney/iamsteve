import { parseISO, format } from 'date-fns'

export default function Date({ dateString, className = 'date' }) {
  const date = parseISO(dateString)
  return (
    <time dateTime={dateString} className={className}>
      {format(date, 'do LLL yyyy')}
    </time>
  )
}
