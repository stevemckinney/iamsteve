'use client'

import Icon from '@/components/icon'

export function SidebarToggle({ isOpen, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="max-lg:hidden flex items-center justify-center w-8 h-8 rounded-sm text-ui-body hover:text-heading hover:bg-neutral-01-100 dark:hover:bg-fern-900/50 transition duration-200 cursor-pointer"
      aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
      aria-expanded={isOpen}
    >
      <Icon
        icon={isOpen ? 'sidebar-right' : 'sidebar-left'}
        size={16}
        variant="header"
      />
    </button>
  )
}
