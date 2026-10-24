// The look of a button dressed as a field, from components/search-field.js
import { cn } from '@/lib/utils'

export const fieldStyle = cn(
  'flex items-center gap-2 w-full text-left',
  'px-3 py-2.5 rounded-sm bg-surface shadow-placed',
  'text-base lg:text-lg font-ui lowercase leading-none text-body',
  'hover:text-heading transition-colors duration-200 ease-linear',
  'outline-none focus-visible:ring-2 focus-visible:ring-cornflour-600 dark:focus-visible:ring-fern-400'
)
