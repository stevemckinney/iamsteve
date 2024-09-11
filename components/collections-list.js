'use client'

import { useSearchParams } from 'next/navigation'
import { format, subWeeks, isAfter } from 'date-fns'
import Icon from '@/components/icon'
import { kinds } from '@/content/collections'

export default function CollectionsList({ groupedCollections }) {
  const searchParams = useSearchParams()
  const activeKind = searchParams.get('kind') || 'all'

  return (
    <>
      {Object.entries(groupedCollections)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([collection, kindItems]) => (
          <div className="flex flex-col gap-4" key={collection}>
            <h2 className="flex justify-between text-xl md:text-3xl font-display font-variation-bold leading-none lowercase text-fern-1100 m-0 pt-2">
              {collection}
              <span className="text-cornflour-600">
                {Object.values(kindItems).flat().length}
              </span>
            </h2>
            <ul className="bg-white shadow-placed rounded-md flex flex-col overflow-hidden">
              {Object.entries(kindItems)
                .filter(([kindId]) => activeKind === 'all' || kindId === activeKind)
                .flatMap(([kindId, items]) =>
                  items.map((item) => {
                    const itemDate = new Date(item.date)
                    const isNew = isAfter(itemDate, subWeeks(new Date(), 5))
                    const kind = kinds.find(k => k.id === kindId)

                    return (
                      <li
                        key={item.url}
                        className="flex items-center border-b last:border-0 border-neutral-01-500/10 leading-loose relative lg:text-lg"
                      >
                        <a
                          href={item.url}
                          className="flex whitespace-nowrap flex-1 gap-2 group hover:bg-neutral-01-50 transition duration-200 linear items-center py-2.5 px-4 w-full [mask:linear-gradient(90deg,black_80%,transparent)]"
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <Icon icon={kind.icon} size={16} className="text-fern-700 shrink-0" />
                          {item.title}
                          <span className="text-fern-1100/40 group-hover:text-fern-1100/80 transition duration-200 linear line-clamp-1">
                            {item.url
                              .replace('https://', '')
                              .replace('www.', '')
                              .replace(/\/$/, '')}
                          </span>
                        </a>
                        {isNew && (
                          <span className="flex self-center px-2 py-1 font-ui lowercase bg-fern-200/50 leading-none text-fern-800 justify-center rounded-sm absolute top-1/2 right-3 -translate-y-1/2">
                            New
                          </span>
                        )}
                      </li>
                    )
                  })
                )}
            </ul>
          </div>
        ))}
    </>
  )
}
