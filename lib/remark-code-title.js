import { visit } from 'unist-util-visit'

const DEFAULT_SETTINGS = {
  title: true,
  titleTagName: 'div',
  titleClassName: 'remark-code-title',
  titleProperties: null,
  container: true,
  containerTagName: 'div',
  containerClassName: 'remark-code-container',
  containerProperties: null,
  handleMissingLanguageAs: null,
}

/**
 *
 * This plugin adds a title element before the code element, if the title exists in the markdown code block;
 * and wraps them in a container.
 *
 * for example:
 * ```javascript:title.js
 * // some js code
 * ```
 */
export default function remarkCodeTitles(options) {
  const settings = Object.assign({}, DEFAULT_SETTINGS, options)

  /** for creating mdx elements just in case (for archive)
  const titleNode = {
    type: "mdxJsxFlowElement",
    name: "div",
    attributes: [
      {
        type: "mdxJsxAttribute",
        name: "className",
        value: "remark-code-title",
      },
      { type: "mdxJsxAttribute", name: "data-language", value: language },
    ],
    children: [{ type: "text", value: title }],
    data: { _xdmExplicitJsx: true },
  };

  const containerNode = {
    type: "mdxJsxFlowElement",
    name: "div",
    attributes: [
      {
        type: "mdxJsxAttribute",
        name: "className",
        value: "remark-code-container",
      },
    ],
    children: [titleNode, node],
    data: { _xdmExplicitJsx: true },
  };
  */

  const constructTitle = (language, title) => {
    let properties

    if (settings.titleProperties) {
      properties = settings.titleProperties(language, title)

      Object.entries(properties).forEach(([k, v]) => {
        if (typeof v === 'string' && !v.length) {
          properties && (properties[k] = undefined)
        }
      })
    }

    return {
      type: 'mdxJsxFlowElement',
      name: 'div',
      attributes: [
        {
          type: 'mdxJsxAttribute',
          name: 'className',
          value: 'remark-code-bar',
        },
      ],
      children: [
        {
          type: 'paragraph',
          children: [{ type: 'text', value: title }],
          data: {
            hName: settings.titleTagName,
            hProperties: {
              className: [settings.titleClassName],
              ...(properties && { ...properties }),
            },
          },
        },
      ],
      data: { _xdmExplicitJsx: true },
    }
  }

  const constructContainer = (children, language, title) => {
    let properties

    if (settings.containerProperties) {
      properties = settings.containerProperties(language, title)

      Object.entries(properties).forEach(([k, v]) => {
        if (typeof v === 'string' && !v.length) {
          properties && (properties[k] = undefined)
        }
      })
    }

    return {
      type: 'container',
      children,
      data: {
        hName: settings.containerTagName,
        hProperties: {
          className: [settings.containerClassName],
          ...(properties && { ...properties }),
        },
      },
    }
  }

  const extractLanguageAndTitle = (node) => {
    const { lang: inputLang, meta: inputMeta } = node

    if (!inputLang && !inputMeta) {
      return { language: null, title: null, meta: null }
    }

    let title
    let language = inputLang
    let meta = inputMeta?.replace(/\s+/g, ' ').trim() // remove extra space + trim + remove spaces in the curly braces

    // correctness for rhypePrismPlus
    if (
      inputLang?.startsWith('{') ||
      inputLang?.toLowerCase().startsWith('showlinenumbers')
    ) {
      if (meta?.length) {
        meta = language + meta
      } else {
        meta = inputLang
      }

      language = null
      title = null
    }

    // another correctness for rhypePrismPlus
    else if (inputLang?.includes('{')) {
      const i = inputLang.search('{')
      const metaPart = inputLang.slice(i, inputLang.length)
      language = inputLang.slice(0, i)

      if (!language.length) language = null

      if (meta?.length) {
        meta = metaPart + meta
      } else {
        meta = metaPart
      }
    }

    // another correctness for line ranges, removing all spaces within curly braces
    const RE = /{([\d\s,-]+)}/g // finds {1, 2-4} like strings for line highlighting
    if (meta?.length && RE.test(meta)) {
      meta = meta.replace(RE, function (match) {
        return match.replace(/ /g, '')
      })
    }

    // after correctness
    const _inputLang = language

    if (_inputLang?.includes(':')) {
      language = _inputLang.slice(0, _inputLang.search(':'))

      if (!language.length) language = null

      title = _inputLang.slice(_inputLang.search(':') + 1, _inputLang.length)

      if (!title.length && !meta?.length) {
        title = null
        meta = null
      } else if (!title.length && meta?.length) {
        const _meta = meta
        const firstWord = _meta.replace(/ .*/, '')

        if (
          firstWord.startsWith('{') ||
          firstWord.toLowerCase().startsWith('showlinenumbers')
        ) {
          title = null
        } else {
          title = firstWord
          meta = meta.slice(title.length).trim()
        }
      }
    } else if (meta?.startsWith(':')) {
      meta = meta.slice(1).trim()

      if (!meta.length) {
        title = null
        meta = null
      } else {
        const _meta = meta
        const firstWord = _meta.replace(/ .*/, '')

        if (
          firstWord.startsWith('{') ||
          firstWord.toLowerCase().startsWith('showlinenumbers')
        ) {
          title = null
        } else {
          title = firstWord
          meta = meta.slice(title.length).trim()
        }
      }
    }

    if (
      !language &&
      options?.handleMissingLanguageAs &&
      typeof options.handleMissingLanguageAs === 'string'
    ) {
      language = options.handleMissingLanguageAs
    }

    return { title, language, meta }
  }

  const visitor = function (node, index, parent) {
    const { title, language, meta } = extractLanguageAndTitle(node)

    // console.log({ title, language, meta });

    // mutating the parent.children may effect the next iteration causing visit the same node "code"
    // so, it is important to normalize the language here, otherwise may cause infinite loop
    node.lang = language
    node.meta = meta

    let titleNode
    let containerNode

    if (settings.title && title) {
      titleNode = constructTitle(language ?? '', title ?? '')
    }

    if (settings.container) {
      containerNode = constructContainer(
        titleNode ? [titleNode, node] : [node],
        language ?? '',
        title ?? ''
      )
    }

    if (containerNode) {
      // 1 is for replacing the "code" with the container which consists it already
      parent?.children.splice(index, 1, containerNode)
    } else if (titleNode) {
      // 0 is for inserting the titleNode before the "code"
      parent?.children.splice(index, 0, titleNode)
    }
  }

  const transformer = (tree) => {
    visit(tree, 'code', visitor)
  }

  return transformer
}
