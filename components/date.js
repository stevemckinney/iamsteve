import {
  format,
  parseISO,
  formatDistance,
  formatRelative,
  subYears,
  getYear,
} from 'date-fns'

export function postYear(dateString) {
  const date = parseISO(dateString)

  return getYear(date)
}

export default function Date({
  dateString,
  relative = false,
  className = 'date',
}) {
  const date = parseISO(dateString)

  if (relative === true) {
    return (
      <time dateTime={dateString} className={className}>
        {formatDistance(subYears(date, 3), date, {
          addSuffix: true,
        })}
      </time>
    )
  }

  return (
    <time dateTime={dateString} className={className}>
      {format(date, 'do LLL yyyy')}
    </time>
  )
}
