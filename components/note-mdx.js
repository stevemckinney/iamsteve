'use client'
import React from 'react'
import { useMDXComponent } from 'next-contentlayer2/hooks'
import Image from '@/components/image'
import Icon from '@/components/icon'
import { noteFigureComponents } from '@/components/figure'

const noteComponents = {
  h2: ({ children, id, ...props }) => (
    <h2
      className="text-lg lg:text-2xl font-variation-bold font-display lowercase text-heading mt-6 mb-2"
      {...props}
    >
      {React.Children.toArray(children).filter(
        (child) =>
          !(
            React.isValidElement(child) && child.props?.className === 'fragment'
          )
      )}
    </h2>
  ),
  h3: ({ children, id, ...props }) => (
    <h3
      className="text-base lg:text-xl font-variation-bold font-display lowercase text-heading mt-5 mb-2"
      {...props}
    >
      {React.Children.toArray(children).filter(
        (child) =>
          !(
            React.isValidElement(child) && child.props?.className === 'fragment'
          )
      )}
    </h3>
  ),
  h4: ({ children, id, ...props }) => (
    <h4
      className="text-base lg:text-xl font-variation-bold font-display lowercase text-heading mt-4 mb-2"
      {...props}
    >
      {React.Children.toArray(children).filter(
        (child) =>
          !(
            React.isValidElement(child) && child.props?.className === 'fragment'
          )
      )}
    </h4>
  ),
  pre: (props) => (
    <pre
      className="bg-surface-02 rounded-sm p-4 overflow-x-auto my-4"
      {...props}
    />
  ),
  p: (props) => (
    <p
      className="md:text-lg lg:text-xl not-first:indent-8 [&>a]:indent-0"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="font-mono bg-fern-500/12 dark:bg-dandelion-400/12 text-fern-800 dark:text-dandelion-400 rounded-sm px-1"
      {...props}
    />
  ),
  a: (props) => (
    <a
      className="text-link underline [text-underline-offset:15%] [text-decoration-thickness:1px] hover:text-link-hover hover:no-underline has-[svg]:inline-flex has-[svg]:gap-0 has-[svg]:items-center has-[svg]:align-middle transition duration-200 ease-out"
      {...props}
    />
  ),
  img: (props) => <img className="rounded-sm my-4" {...props} />,
  Image,
  ...noteFigureComponents,
  Icon,
}

const NoteMdxComponent = React.memo(function NoteMdxComponent({ code }) {
  const Component = useMDXComponent(code)

  if (!Component) {
    return <p>Failed to load content.</p>
  }

  return <Component components={noteComponents} />
})

export function NoteMdx({ code }) {
  return <NoteMdxComponent code={code} />
}

export { noteComponents }
