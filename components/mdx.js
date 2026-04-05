import Image from '@/components/image'
import Icon from '@/components/icon'
import { Chat, ChatMessage } from '@/components/chat'
import CodeFigure from '@/components/code/figure'

export const components = {
  Image,
  Icon,
  Chat,
  ChatMessage,
  CodeFigure,
  a: (props) => (
    <a
      className="text-link underline [text-underline-offset:12.5%] [text-decoration-thickness:1.5px] [text-decoration-color:color-mix(in_oklch,currentcolor,transparent_60%)] hover:text-link-hover hover:no-underline has-[svg]:inline-flex has-[svg]:gap-0 has-[svg]:items-center has-[svg]:align-middle transition duration-200 ease-out"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="border-l-2 border-l-cornflour-500 pl-4 my-4 text-ui-body"
      {...props}
    />
  ),
  strong: (props) => (
    <strong className="font-medium text-emphasis" {...props} />
  ),
  code: (props) => (
    <code
      className={
        props.style || props['data-line-numbers'] !== undefined
          ? undefined
          : 'font-mono bg-code text-code rounded-sm px-1'
      }
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="bg-surface-02 rounded-sm p-4 overflow-x-auto my-4"
      {...props}
    />
  ),
  img: (props) => <img className="rounded-sm my-4" {...props} />,
  ul: (props) => (
    <ul
      className="text-ui-body md:text-lg lg:text-xl list-inside sm:list-outside list-[square] mb-2"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="text-ui-body md:text-lg lg:text-xl list-inside sm:list-outside list-decimal mb-2"
      {...props}
    />
  ),
}
