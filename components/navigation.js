'use client'
import { useState, forwardRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import clsx from 'clsx'

import siteMetadata from '@/content/metadata'
import navigation from '@/content/navigation'

// components
import Link from '@/components/link'
import Icon from '@/components/icon'

const Toggle = () => {
  return (
    <div className="toggle relative before:z-[1] before:-inset-10 before:absolute">
      <span className="block w-[24px] h-[24px] relative">
        <span
          className={`h-[2px] w-[20px] bg-fern-1100 block rounded absolute left-[2px] top-[4px]`}
        ></span>
        <span
          className={`h-[2px] w-[16px] bg-fern-1100 block rounded absolute left-[2px] top-[11px]`}
        ></span>
        <span
          className={`h-[2px] w-[20px] bg-fern-1100 block rounded absolute left-[2px] bottom-[4px]`}
        ></span>
      </span>
    </div>
  )
}

const Navigation = () => {
  const pathname = usePathname()
  return (
    <NavigationMenu.Root className="flex lg:hidden">
      <NavigationMenu.List className="flex">
        <NavigationMenu.Item className="flex">
          <NavigationMenu.Trigger
            className="data-[state=open]"
            // https://github.com/radix-ui/primitives/issues/2043
            onPointerMove={(event) => event.preventDefault()}
            onPointerLeave={(event) => event.preventDefault()}
          >
            <Toggle />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="shadow-placed bg-white/90 [backdrop-filter:blur(6px)] flex flex-col rounded-lg h-[auto] fixed z-[200] bottom-4 left-4 right-4 max-w-md md:left-1/2 md:-translate-x-1/2 p-6 outline-none data-[state=closed]:animate-[dialog-content-hide_200ms] data-[state=open]:animate-[dialog-content-show_200ms]">
            <ul className="flex flex-col gap-2">
              {navigation.map((link) => {
                return (
                  <ListItem
                    href={link.href}
                    key={link.href}
                    className={`${
                      pathname === link.href ? 'text-red-500' : 'text-fern-1100'
                    }`}
                  >
                    <Icon
                      icon={link.icon}
                      size={link.size}
                      className={`${
                        pathname === link.href
                          ? 'text-red-500'
                          : 'text-neutral-03-500'
                      }`}
                    />
                    {link.title}
                  </ListItem>
                )
              })}
              <ListItem
                href="/newsletter"
                className={`${
                  pathname === '/newsletter'
                    ? 'bg-moss-0 text-red-500'
                    : 'bg-moss-200/10 text-moss-600'
                }`}
              >
                <Icon
                  icon="airplane"
                  className={`${
                    pathname === '/newsletter'
                      ? 'text-red-500'
                      : 'text-moss-600'
                  }`}
                />
                Subscribe
              </ListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>

      <div className="ViewportPosition">
        <NavigationMenu.Viewport className="NavigationMenuViewport" />
      </div>
    </NavigationMenu.Root>
  )
}

const ListItem = forwardRef(
  ({ className, children, title, ...props }, forwardedRef) => (
    <li className="flex shrink-0 basis-full">
      <NavigationMenu.Link asChild>
        <a
          className={`flex shrink-0 basis-full gap-4 py-2.5 rounded-sm px-4 text-2xl font-ui items-center lowercase ${className}`}
          {...props}
          ref={forwardedRef}
        >
          {/* <div className="ListItemHeading">{title}</div> */}
          {children}
        </a>
      </NavigationMenu.Link>
    </li>
  )
)

// const Navigation = () => {
//   const router = useRouter()
//   {
//     /* <div className="mx-auto w-14 h-1 flex-shrink-0 rounded-full bg-neutral-01-900/10 mb-[2.25rem]" /> */
//   }
//   return (
//     <NavigationMenu.Root orientation="vertical">
//       <NavigationMenu.List className="shadow-placed bg-white/90 [backdrop-filter:blur(6px)] flex flex-col rounded-lg h-[auto] mt-24 fixed z-[200] bottom-4 left-4 right-4 max-w-md md:left-1/2 md:-translate-x-1/2 pt-2 outline-none data-[state=closed]:animate-[dialog-content-hide_200ms] data-[state=open]:animate-[dialog-content-show_200ms]">
//         <NavigationMenu.Item>
//           {navigation.map((link) => {
//             return (
//               <Item href={link.href} key={link.href}>
//                 <Icon
//                   icon={link.icon}
//                   size={link.size}
//                   className="text-neutral-03-500"
//                 />
//                 {link.title}
//               </Item>
//             )
//           })}
//           <NavigationMenu.Trigger className="NavigationMenuTrigger">
//             <Toggle />
//           </NavigationMenu.Trigger>
//         </NavigationMenu.Item>
//       </NavigationMenu.List>
//     </NavigationMenu.Root>
//   )
// }

// const Item = ({ href, children, ...props }) => {
//   const router = useRouter()
//   const pathname = usePathname()
//   const isActive = router.asPath === href
//
//   return (
//     <Link href={href} passHref legacyBehavior>
//       <NavigationMenu.Link
//         className={`flex gap-6 py-4 px-8 text-2xl font-ui items-center lowercase ${
//           pathname === href ? 'text-red-500' : 'text-fern-1100'
//         }`}
//         active={isActive}
//         {...props}
//       >
//         {children}
//       </NavigationMenu.Link>
//     </Link>
//   )
// }

export { Navigation }
