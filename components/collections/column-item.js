'use client'

import { useState } from 'react'
import Link from 'next/link'

function ChevronRight({ className }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 3l5 5-5 5" />
    </svg>
  )
}

export function ColumnItem({
  icon,
  label,
  count,
  hasChildren,
  isSelected,
  href,
  showExternal,
  externalUrl,
  badge,
}) {
  const [isHovered, setIsHovered] = useState(false)

  const className = `group flex w-full items-center justify-between rounded px-3 py-2 text-left text-sm transition-colors duration-200 ease-linear lowercase ${
    isSelected
      ? 'bg-dandelion-100 text-fern-1100'
      : 'text-fern-1100 hover:bg-neutral-01-50'
  }`

  const content = (
    <>
      <span className="flex items-center gap-2 truncate">
        {icon}
        <span className="truncate">{label}</span>
      </span>
      <span className="flex items-center gap-2">
        {badge}
        {count !== undefined && (
          <span className="text-xs text-cornflour-600">{count}</span>
        )}
        {showExternal && externalUrl && isHovered && (
          <a
            href={externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="rounded p-1 text-fern-1100/40 transition-colors hover:bg-neutral-01-100 hover:text-fern-1100"
          >
            <svg
              className="size-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
            </svg>
          </a>
        )}
        {hasChildren && (
          <ChevronRight
            className={`size-4 transition-colors ${
              isSelected ? 'text-fern-1100' : 'text-fern-1100/40'
            }`}
          />
        )}
      </span>
    </>
  )

  if (href) {
    return (
      <Link
        href={href}
        className={className}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {content}
      </Link>
    )
  }

  return (
    <button
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {content}
    </button>
  )
}
