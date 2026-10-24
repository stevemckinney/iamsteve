// components/mdx-post.js pageComponents, for content/pages
import Link from '../link.astro'
import Card from '../card/index.astro'
import ContactForm from '../contact-form.astro'
import NewsletterForm from '../newsletter-form.astro'
import Notepad from '../notepad.js'
import Social from '../social.astro'
import { sharedComponents, figureComponents } from './index.js'

import Prose from './prose.astro'
import BlockquoteVariant from './blockquote-variant.astro'
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

export const pageComponents = {
  ...sharedComponents,
  ...figureComponents,
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
