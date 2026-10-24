// The components every MDX collection renders with, as components/mdx.js
// and figure.js set them up. Each collection’s map is its own module
// (post.js, note.js, page.js), so a page only bundles the components and
// CSS its own content can use. Overrides that only passed their props
// through (li, p, figure) are left out, since MDX renders those elements
// the same way without them
import Image from '../image.astro'
import Icon from '../icon.astro'

import A from './a.astro'
import Blockquote from './blockquote.astro'
import Strong from './strong.astro'
import Code from './code.astro'
import Pre from './pre.astro'
import Ul from './ul.astro'
import Ol from './ol.astro'
import Img from './img.astro'
import Chat from './chat.astro'
import ChatMessage from './chat-message.astro'
import CodeFigure from './code-figure.astro'

import Figure from './figure.astro'
import Figcaption from './figcaption.astro'
import Fig from './fig.astro'

// components/mdx.js
export const sharedComponents = {
  Image,
  Icon,
  Chat,
  ChatMessage,
  CodeFigure,
  a: A,
  blockquote: Blockquote,
  strong: Strong,
  code: Code,
  pre: Pre,
  ul: Ul,
  ol: Ol,
  img: Img,
}

// components/figure.js
export const figureComponents = {
  figcaption: Figcaption,
  Figure,
  Figcaption,
  Fig,
}
