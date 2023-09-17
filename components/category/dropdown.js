'use client'

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion'

import Icon from '@/components/icon'

let DropdownContext = createContext({
  open: false,
  setOpen: () => {},
})

export default function Dropdown({ children }) {
  let [open, setOpen] = useState(false)

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <RadixDropdownMenu.Root open={open} onOpenChange={setOpen}>
        {children}
      </RadixDropdownMenu.Root>
    </DropdownContext.Provider>
  )
}

function DropdownButton({ children }) {
  let theme

  if (children === 'Design') theme = 'text-rio-400'
  else if (children === 'Code') theme = 'text-dandelion-500'
  else theme = 'text-cornflour-600'

  return (
    <RadixDropdownMenu.Trigger
      className={`transition duration-200 cursor-default select-none rounded text-2xl focus-visible:outline-none data-[state=open]:[background-color:color-mix(in_oklab,currentcolor,transparent_90%)] ${theme} flex gap-2 px-3 font-[inherit] [font-size:inherit] [letter-spacing:inherit] [text-transform:inherit] items-center hover:[background-color:color-mix(in_oklab,currentcolor,transparent_95%)]`}
    >
      {children}
      <Icon icon="angle-down" className={`text-inherit`} size={32} />
    </RadixDropdownMenu.Trigger>
  )
}

Dropdown.Button = DropdownButton

let DropdownMenuContext = createContext({ closeMenu: () => {} })

function DropdownMenu({ children }) {
  let { open, setOpen } = useContext(DropdownContext)
  let controls = useAnimationControls()

  async function closeMenu() {
    await controls.start('closed')
    setOpen(false)
  }

  useEffect(() => {
    if (open) {
      controls.start('open')
    }
  }, [controls, open])

  return (
    <DropdownMenuContext.Provider value={{ closeMenu }}>
      <AnimatePresence>
        {open && (
          <RadixDropdownMenu.Portal forceMount>
            <RadixDropdownMenu.Content
              align="start"
              className="overflow-hidden rounded bg-neutral-01-700 p-1 text-left border-1 border-neutral-01-900 shadow-floating"
              asChild
            >
              <motion.div
                initial="closed"
                animate={controls}
                exit="closed"
                variants={{
                  open: {
                    opacity: 1,
                    transition: { ease: 'easeOut', duration: 0.1 },
                  },
                  closed: {
                    opacity: 0,
                    transition: { ease: 'easeIn', duration: 0.2 },
                  },
                }}
              >
                {children}
              </motion.div>
            </RadixDropdownMenu.Content>
          </RadixDropdownMenu.Portal>
        )}
      </AnimatePresence>
    </DropdownMenuContext.Provider>
  )
}

Dropdown.Menu = DropdownMenu

function DropdownMenuItem({ children, icon, onSelect = () => {} }) {
  let controls = useAnimationControls()
  let { closeMenu } = useContext(DropdownMenuContext)

  let theme
  if (children === 'Design') theme = 'bg-rio-400'
  else if (children === 'Code') theme = 'bg-dandelion-500'
  else theme = 'bg-cornflour-600'

  return (
    <RadixDropdownMenu.Item
      onSelect={async (e) => {
        e.preventDefault()
        await sleep(0.075)
        await closeMenu()
        onSelect()
      }}
      className="w-60 text-xl font-ui lowercase select-none rounded-[.75rem] pl-5 pr-6 py-3 text-neutral-01-50 data-[highlighted]:bg-neutral-01-600 data-[highlighted]:text-white data-[highlighted]:focus:outline-none data-[highlighted]:hover:shadow-[inset_0_1px_rgb(117_99_98_/_.5),_0_0_0_1px_#1F1515] data-[highlighted]:active:shadow-[inset_0_1px_3px_rgb(0_0_0/_.25),_0_0_0_1px_#1F1515]"
      asChild
    >
      <motion.div
        animate={controls}
        className="flex flex-row items-center gap-2"
      >
        <span
          className={`flex items-center justify-center w-8 h-8 flex-0 rounded-lg ${theme}`}
        >
          <Icon icon={icon} size={24} />
        </span>
        {children}
      </motion.div>
    </RadixDropdownMenu.Item>
  )
}

Dropdown.MenuItem = DropdownMenuItem

const sleep = (s) => new Promise((resolve) => setTimeout(resolve, s * 1000))
