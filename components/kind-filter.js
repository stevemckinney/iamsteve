'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function KindFilter({ kinds, pageSlug }) {
  const searchParams = useSearchParams()
  const activeKind = searchParams.get('kind') || 'all'

  return (
    <ul className="flex flex-wrap gap-2 mt-4">
      <li>
        <Link
          href={pageSlug}
          className={`px-3 py-1 rounded-full text-sm ${
            activeKind === 'all' ? 'bg-fern-200 text-fern-800' : 'bg-neutral-01-100 text-neutral-01-800'
          }`}
        >
          All
        </Link>
      </li>
      {kinds.map((kind) => (
        <li key={kind.id}>
          <Link
            href={`${pageSlug}?kind=${kind.id}`}
            className={`px-3 py-1 rounded-full text-sm ${
              activeKind === kind.id ? 'bg-fern-200 text-fern-800' : 'bg-neutral-01-100 text-neutral-01-800'
            }`}
          >
            {kind.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default KindFilter
