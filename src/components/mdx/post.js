// components/mdx-post.js postComponents, for content/blog
import Link from '../link.astro'
import { sharedComponents, figureComponents } from './index.js'

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

export const postComponents = {
  ...sharedComponents,
  ...figureComponents,
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
