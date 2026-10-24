// The components MDX content renders with: one map per collection, set
// up as components/mdx.js, figure.js, mdx-post.js and mdx-note.js do.
// Overrides that only passed their props through (li, p, figure) are left
// out, since MDX renders those elements the same way without them
import Image from '../image.astro'
import Icon from '../icon.astro'
import Link from '../link.astro'

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

import PostH1 from './post-h1.astro'
import PostH2 from './post-h2.astro'
import PostA from './post-a.astro'
import Shortcut from './shortcut.astro'
import Prose from './prose.astro'
import BlockquoteVariant from './blockquote-variant.astro'
import Images from './images.astro'
import BentoGridShell from './bento-grid-shell.astro'
import CodePen from './codepen.astro'
import LinkFigma from './link-figma.astro'
import LinkGithub from './link-github.astro'
import Demo from './demo.astro'

import NoteH2 from './note-h2.astro'
import NoteH3 from './note-h3.astro'
import NoteH4 from './note-h4.astro'
import NoteP from './note-p.astro'

import Card from '../card/index.astro'
import ContactForm from '../contact-form.astro'
import NewsletterForm from '../newsletter-form.astro'
import Notepad from '../notepad.js'
import Social from '../social.astro'
import AppIcon from './app-icon.astro'
import Content from './content.astro'
import PageH2 from './page-h2.astro'
import PageH3 from './page-h3.astro'
import PageA from './page-a.astro'
import PageP from './page-p.astro'
import PageUl from './page-ul.astro'
import Gallery from './gallery.astro'
import GalleryFigure from './gallery-figure.astro'
import GalleryFigcaption from './gallery-figcaption.astro'
import Sandbox from './sandbox.astro'

// components/mdx.js
const shared = {
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
const figure = {
  figcaption: Figcaption,
  Figure,
  Figcaption,
  Fig,
}

// components/mdx-post.js
export const postComponents = {
  ...shared,
  ...figure,
  h1: PostH1,
  h2: PostH2,
  a: PostA,
  Shortcut,
  Link,
  Prose,
  Blockquote: BlockquoteVariant,
  Images,
  BentoGridShell,
  CodePen,
  LinkFigma,
  LinkGithub,
  Demo,
}

// components/mdx-post.js pageComponents, for content/pages
export const pageComponents = {
  ...shared,
  ...figure,
  Link,
  AppIcon,
  Card,
  NewsletterForm,
  Notepad,
  Prose,
  ContactForm,
  Social,
  Content,
  h2: PageH2,
  h3: PageH3,
  a: PageA,
  p: PageP,
  ul: PageUl,
  Blockquote: BlockquoteVariant,
  Gallery,
  GalleryFigure,
  GalleryFigcaption,
  Sandbox,
}

// components/mdx-note.js
export const noteComponents = {
  ...shared,
  ...figure,
  h2: NoteH2,
  h3: NoteH3,
  h4: NoteH4,
  p: NoteP,
}
