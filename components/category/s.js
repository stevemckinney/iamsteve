'use client'

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import * as RadixSelect from '@radix-ui/react-select'
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion'

import Icon from '@/components/icon'

let SelectContext = createContext({
  open: false,
  setOpen: () => {},
})

export default function Select({ children }) {
  let [open, setOpen] = useState(false)

  return (
    <SelectContext.Provider value={{ open, setOpen }}>
      <RadixSelect.Root
        open={open}
        onOpenChange={setOpen}
        defaultValue="design"
      >
        {children}
      </RadixSelect.Root>
    </SelectContext.Provider>
  )
}

function SelectButton({ children }) {
  let theme

  if (children === 'Design') theme = 'text-rio-400'
  else if (children === 'Code') theme = 'text-dandelion-500'
  else theme = 'text-cornflour-600'

  return (
    <RadixSelect.Trigger
      className={`cursor-default select-none rounded text-2xl focus-visible:outline-none data-[state=open]:[background-color:color-mix(in_oklab,currentcolor,transparent_90%)] ${theme} flex gap-2 px-3 font-[inherit] [font-size:inherit] [letter-spacing:inherit] [text-transform:inherit] items-center hover:[background-color:color-mix(in_oklab,currentcolor,transparent_95%)]`}
    >
      {children}
      <Icon icon="angle-down" className={`text-inherit`} size={32} />
    </RadixSelect.Trigger>
  )
}

Select.Button = SelectButton

let SelectStateContext = createContext({ closeMenu: () => {} })

function SelectMenu({ children }) {
  let { open, setOpen } = useContext(SelectStateContext)
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
    <SelectContext.Provider value={{ closeMenu }}>
      <AnimatePresence>
        {open && (
          <RadixSelect.Portal forceMount>
            <RadixSelect.Content
              align="start"
              className="mt-1 overflow-hidden rounded bg-white/75 p-2 text-left shadow backdrop-blur"
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
            </RadixSelect.Content>
          </RadixSelect.Portal>
        )}
      </AnimatePresence>
    </SelectContext.Provider>
  )
}

Select.Menu = SelectMenu

function SelectItem({ children, onSelect = () => {} }) {
  let controls = useAnimationControls()
  let { closeMenu } = useContext(Context)

  return (
    <RadixSelect.Item
      onSelect={async (e) => {
        e.preventDefault()

        await controls.start({
          backgroundColor: '#fff',
          color: '#000',
          transition: { duration: 0.04 },
        })
        await controls.start({
          backgroundColor: '#38bdf8',
          color: '#fff',
          transition: { duration: 0.04 },
        })
        await sleep(0.075)

        await closeMenu()
        onSelect()
      }}
      className="w-40 select-none rounded px-2 py-1.5 text-gray-700 data-[highlighted]:bg-sky-400 data-[highlighted]:text-white data-[highlighted]:focus:outline-none"
      asChild
    >
      <motion.div animate={controls}>{children}</motion.div>
    </RadixSelect.Item>
  )
}

Select.Item = SelectItem

const sleep = (s) => new Promise((resolve) => setTimeout(resolve, s * 1000))
