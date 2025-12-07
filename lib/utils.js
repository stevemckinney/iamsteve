import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines clsx and tailwind-merge for intelligent class name merging
 * Handles conditional classes and resolves Tailwind conflicts
 *
 * @example
 * cn('px-4 py-2', 'p-8') // Returns: "p-8"
 * cn('text-red-500', condition && 'text-blue-500') // Conditionally applies classes
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
