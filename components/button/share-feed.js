'use client'

import { Button } from 'react-aria-components'

import { cn } from '@/lib/utils'
import Icon from '@/components/icon'

const buttonClass =
  'flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-sm bg-white dark:bg-fern-1100 bg-[image:linear-gradient(to_bottom,transparent,color-mix(in_oklab,var(--color-neutral-01-250),transparent_88%))] dark:bg-[image:linear-gradient(to_bottom,transparent,color-mix(in_oklab,var(--color-fern-1000),transparent_88%))] shadow-placed hover:shadow-picked transition duration-200 ease-out font-ui cursor-pointer'

export default function ShareFeed({ className }) {
  return (
    <Button aria-label="Share RSS feed" className={cn(buttonClass, className)}>
      <Icon icon="share" size={16} />
    </Button>
  )
}
