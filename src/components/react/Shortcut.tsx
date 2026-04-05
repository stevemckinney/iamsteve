import { Children, type ReactNode } from 'react'

const specialKeys: Record<string, { symbol: string; label: string; className: string }> = {
  tab: { symbol: '⇥', label: 'Tab', className: 'min-w-16 items-start justify-end' },
  shift: { symbol: '⇧', label: 'Shift', className: 'min-w-24 items-start justify-end' },
  caps: { symbol: '⇪', label: 'Caps lock', className: 'min-w-18 items-start justify-end' },
  esc: { symbol: '⎋', label: 'Esc', className: 'min-w-12 items-start justify-end' },
  ctrl: { symbol: '⌃', label: 'Control', className: 'min-w-16 items-end justify-between' },
  control: { symbol: '⌃', label: 'Control', className: 'min-w-16 items-end justify-between' },
  opt: { symbol: '⌥', label: 'Option', className: 'min-w-16 items-end justify-between' },
  option: { symbol: '⌥', label: 'Option', className: 'min-w-16 items-end justify-between' },
  alt: { symbol: '⌥', label: 'Alt', className: 'min-w-16 items-end justify-between' },
  cmd: { symbol: '⌘', label: 'Command', className: 'min-w-20 items-end justify-between' },
  command: { symbol: '⌘', label: 'Command', className: 'min-w-20 items-end justify-between' },
  delete: { symbol: '⌫', label: 'Delete', className: 'min-w-16 items-end justify-between' },
  backspace: { symbol: '⌫', label: 'Delete', className: 'min-w-16 items-end justify-between' },
  return: { symbol: '↵', label: 'Return', className: 'min-w-16 items-center justify-center' },
  enter: { symbol: '↵', label: 'Enter', className: 'min-w-16 items-center justify-center' },
  space: { symbol: '␣', label: 'Space', className: 'min-w-18 items-center justify-center' },
}

function formatKey(key: string) {
  const lowercaseKey = key.toLowerCase()
  if (specialKeys[lowercaseKey]) {
    return {
      symbol: specialKeys[lowercaseKey].symbol,
      label: specialKeys[lowercaseKey].label,
      className: specialKeys[lowercaseKey].className,
      isSpecial: true,
    }
  }
  return {
    symbol: key,
    label: undefined,
    className: 'min-w-12 items-center justify-center',
    isSpecial: false,
  }
}

interface ShortcutProps {
  children: ReactNode
}

export default function Shortcut({ children }: ShortcutProps) {
  const keys =
    typeof children === 'string'
      ? children.split(' ')
      : Children.toArray(children).map(String)

  const ariaLabel = `Keyboard shortcut: ${keys.join(' plus ')}`

  return (
    <kbd className="flex gap-2" aria-label={ariaLabel} role="text">
      {keys.map((key, index) => {
        const { symbol, label, className, isSpecial } = formatKey(key)
        return (
          <kbd
            key={index}
            className={`relative flex flex-col gap-2 ${className} px-2 py-2 bg-neutral-01-100 shadow-picked rounded-sm text-fern-900`}
            aria-hidden="true"
          >
            <span className="text-2xl leading-none">{symbol}</span>
            {isSpecial && label && (
              <span className="text-xs leading-none font-sans">{label}</span>
            )}
          </kbd>
        )
      })}
    </kbd>
  )
}
