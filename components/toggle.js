'use client'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import navigation from '@/content/navigation'

import Modal from '@/components/modal'
import Link from '@/components/link'
import Icon from '@/components/icon'

const Toggle = () => {
  const pathname = usePathname()
  const router = useRouter()
  let [open, setOpen] = useState(false)

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <Modal.Button asChild>
        <div className="nav-toggle w-[24px] h-[24px] relative">
          <span
            className={`h-[2px] w-[20px] bg-fern-1100 block rounded absolute left-[2px] top-[4px]`}
          ></span>
          <span
            className={`h-[2px] w-[20px] bg-fern-1100 block rounded absolute left-[2px] bottom-[4px]`}
          ></span>
        </div>
      </Modal.Button>
      <Modal.Content>
        <nav className="-mt-4">
          {navigation.map((link) => {
            return (
              <Link
                href={link.href}
                className={`flex gap-6 py-4 px-8 text-2xl font-ui items-center lowercase ${
                  pathname === link.href ? 'text-red-500' : 'text-heading'
                }`}
                key={link.href}
                onClick={() => {
                  router.push(link.href.toString())
                  setOpen(false)
                }}
              >
                <Icon
                  icon={link.icon}
                  size={link.size}
                  className="text-neutral-03-500"
                />
                {link.title}
              </Link>
            )
          })}
          <Link
            href="/newsletter"
            className={`flex gap-6 text-heading py-4 px-8 text-2xl font-ui items-center lowercase`}
          >
            <Icon icon="airplane" className="text-neutral-03-500" />
            Subscribe
          </Link>
        </nav>
      </Modal.Content>
    </Modal>
  )
}

export default Toggle
