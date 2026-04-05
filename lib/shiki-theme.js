/**
 * Custom Shiki themes for iamsteve.me
 *
 * Uses CSS custom properties from css/primitives.css so code blocks
 * stay in sync with the design system automatically.
 *
 * Shiki outputs these values into inline style attributes as
 * --shiki-light / --shiki-dark, then shiki.css resolves them
 * via light-dark().
 *
 * Palette reference:
 *
 *   Light base:
 *   --color-fern-900       — foreground, values, punctuation, operators
 *   --color-neutral-02-400 — comments
 *   --color-moss-500       — property names, functions (general)
 *   --color-dandelion-500  — selectors, at-rules, strings
 *   --color-cornflour-700  — CSS functions
 *   --color-lavender-700   — keywords, variables, attributes
 *   --color-rio-400        — numbers, units, constants, strings
 *   --color-rio-700        — string punctuation (quotes)
 *
 *   Dark base:
 *   --color-fern-200       — foreground, values, punctuation, operators
 *   --color-neutral-03-400 — comments
 *   --color-moss-300       — property names, functions (general)
 *   --color-dandelion-300  — selectors, at-rules, strings
 *   --color-cornflour-300  — CSS functions
 *   --color-lavender-300   — keywords, variables, attributes
 *   --color-rio-200        — numbers, units, constants, strings
 *   --color-rio-300        — string punctuation (quotes)
 */

export const shikiLightTheme = {
  name: 'iamsteve-light',
  type: 'light',
  colors: {
    'editor.background': 'var(--color-neutral-01-50)',
    'editor.foreground': 'var(--color-fern-900)',
  },
  tokenColors: [
    {
      name: 'Comment',
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: 'var(--color-neutral-02-400)' },
    },
    {
      name: 'Punctuation',
      scope: ['punctuation'],
      settings: { foreground: 'var(--color-fern-900)' },
    },
    {
      name: 'String',
      scope: ['string', 'string.quoted', 'string.template'],
      settings: { foreground: 'var(--color-rio-400)' },
    },
    {
      name: 'String Punctuation',
      scope: [
        'punctuation.definition.string',
        'punctuation.definition.string.begin',
        'punctuation.definition.string.end',
      ],
      settings: { foreground: 'var(--color-rio-700)' },
    },
    {
      name: 'Number',
      scope: ['constant.numeric'],
      settings: { foreground: 'var(--color-rio-400)' },
    },
    {
      name: 'Boolean & Constant',
      scope: ['constant.language', 'constant.other'],
      settings: { foreground: 'var(--color-rio-400)' },
    },
    {
      name: 'Keyword',
      scope: [
        'keyword',
        'keyword.control',
        'keyword.operator.new',
        'keyword.operator.expression',
        'storage.type',
        'storage.modifier',
      ],
      settings: { foreground: 'var(--color-lavender-700)' },
    },
    {
      name: 'Operator',
      scope: ['keyword.operator'],
      settings: { foreground: 'var(--color-fern-900)' },
    },
    {
      name: 'Operator Symbol',
      scope: [
        'keyword.operator.assignment',
        'keyword.operator.comparison',
        'keyword.operator.arithmetic',
        'keyword.operator.logical',
        'keyword.operator.spread',
        'keyword.operator.rest',
        'keyword.operator.ternary',
      ],
      settings: { foreground: 'var(--color-fern-900)' },
    },
    {
      name: 'Function',
      scope: ['entity.name.function', 'support.function'],
      settings: { foreground: 'var(--color-moss-500)' },
    },
    {
      name: 'Variable',
      scope: ['variable', 'variable.other'],
      settings: { foreground: 'var(--color-fern-900)' },
    },
    {
      name: 'Class',
      scope: [
        'entity.name.type',
        'entity.other.inherited-class',
        'support.class',
      ],
      settings: { foreground: 'var(--color-dandelion-500)' },
    },
    {
      name: 'Symbol',
      scope: ['constant.other.symbol'],
      settings: { foreground: 'var(--color-rio-400)' },
    },
    {
      name: 'Built-in',
      scope: ['support.type.builtin', 'support.constant'],
      settings: { foreground: 'var(--color-rio-400)' },
    },
    {
      name: 'Entity & URL',
      scope: ['constant.character.entity', 'markup.underline.link'],
      settings: { foreground: 'var(--color-dandelion-500)' },
    },
    {
      name: 'Regex',
      scope: ['string.regexp'],
      settings: { foreground: 'var(--color-dandelion-500)' },
    },
    {
      name: 'Tag',
      scope: [
        'entity.name.tag',
        'punctuation.definition.tag',
        'meta.tag punctuation.definition.tag',
      ],
      settings: { foreground: 'var(--color-fern-900)' },
    },
    {
      name: 'Attribute Name',
      scope: ['entity.other.attribute-name'],
      settings: { foreground: 'var(--color-moss-500)' },
    },
    {
      name: 'Attribute Value',
      scope: [
        'meta.attribute string',
        'string.quoted.double.html',
        'string.quoted.single.html',
      ],
      settings: { foreground: 'var(--color-rio-400)' },
    },
    {
      name: 'CSS Selector',
      scope: [
        'entity.other.attribute-name.class.css',
        'entity.other.attribute-name.id.css',
        'entity.other.attribute-name.pseudo-class.css',
        'entity.other.attribute-name.pseudo-element.css',
        'entity.name.tag.css',
        'punctuation.definition.entity.css',
      ],
      settings: { foreground: 'var(--color-fern-900)' },
    },
    {
      name: 'CSS Property',
      scope: ['support.type.property-name.css', 'meta.property-name.css'],
      settings: { foreground: 'var(--color-moss-500)' },
    },
    {
      name: 'CSS Property Value',
      scope: ['support.constant.property-value.css'],
      settings: { foreground: 'var(--color-fern-900)' },
    },
    {
      name: 'CSS Function',
      scope: [
        'support.function.css',
        'support.function.misc.css',
        'support.function.gradient.css',
        'support.function.url.css',
        'support.function.transform.css',
        'support.function.calc.css',
        'entity.name.function.scss',
      ],
      settings: { foreground: 'var(--color-cornflour-700)' },
    },
    {
      name: 'CSS Hex Colour',
      scope: [
        'constant.other.color.rgb-value.hex.css',
        'punctuation.definition.constant.css',
      ],
      settings: { foreground: 'var(--color-rio-400)' },
    },
    {
      name: 'CSS At-rule',
      scope: ['keyword.control.at-rule', 'punctuation.definition.keyword.css'],
      settings: { foreground: 'var(--color-dandelion-500)' },
    },
    {
      name: 'CSS Unit',
      scope: ['keyword.other.unit'],
      settings: { foreground: 'var(--color-rio-400)' },
    },
    {
      name: 'CSS Variable',
      scope: ['variable.scss', 'variable.css', 'variable.argument.css'],
      settings: { foreground: 'var(--color-moss-500)' },
    },
    {
      name: 'SCSS Ampersand',
      scope: ['entity.name.tag.reference.scss'],
      settings: { foreground: 'var(--color-dandelion-500)' },
    },
    {
      name: 'JS Method',
      scope: ['meta.function-call entity.name.function'],
      settings: { foreground: 'var(--color-moss-500)' },
    },
    {
      name: 'Namespace',
      scope: ['entity.name.namespace', 'entity.name.scope-resolution'],
      settings: { foreground: 'var(--color-fern-900)' },
    },
    {
      name: 'Important',
      scope: ['keyword.other.important'],
      settings: { foreground: 'var(--color-rio-400)', fontStyle: 'bold' },
    },
    {
      name: 'Bold',
      scope: ['markup.bold'],
      settings: { fontStyle: 'bold' },
    },
    {
      name: 'Italic',
      scope: ['markup.italic'],
      settings: { fontStyle: 'italic' },
    },
    {
      name: 'PHP Tag',
      scope: [
        'punctuation.section.embedded.begin.php',
        'punctuation.section.embedded.end.php',
      ],
      settings: { foreground: 'var(--color-rio-400)' },
    },
    {
      name: 'PHP Variable',
      scope: ['variable.other.php'],
      settings: { foreground: 'var(--color-fern-900)' },
    },
  ],
}

export const shikiDarkTheme = {
  name: 'iamsteve-dark',
  type: 'dark',
  colors: {
    'editor.background': 'var(--color-fern-1100)',
    'editor.foreground': 'var(--color-fern-200)',
  },
  tokenColors: [
    {
      name: 'Comment',
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: 'var(--color-neutral-03-400)' },
    },
    {
      name: 'Punctuation',
      scope: ['punctuation'],
      settings: { foreground: 'var(--color-fern-200)' },
    },
    {
      name: 'String',
      scope: ['string', 'string.quoted', 'string.template'],
      settings: { foreground: 'var(--color-rio-200)' },
    },
    {
      name: 'String Punctuation',
      scope: [
        'punctuation.definition.string',
        'punctuation.definition.string.begin',
        'punctuation.definition.string.end',
      ],
      settings: { foreground: 'var(--color-rio-300)' },
    },
    {
      name: 'Number',
      scope: ['constant.numeric'],
      settings: { foreground: 'var(--color-rio-200)' },
    },
    {
      name: 'Boolean & Constant',
      scope: ['constant.language', 'constant.other'],
      settings: { foreground: 'var(--color-rio-200)' },
    },
    {
      name: 'Keyword',
      scope: [
        'keyword',
        'keyword.control',
        'keyword.operator.new',
        'keyword.operator.expression',
        'storage.type',
        'storage.modifier',
      ],
      settings: { foreground: 'var(--color-lavender-300)' },
    },
    {
      name: 'Operator',
      scope: ['keyword.operator'],
      settings: { foreground: 'var(--color-fern-200)' },
    },
    {
      name: 'Operator Symbol',
      scope: [
        'keyword.operator.assignment',
        'keyword.operator.comparison',
        'keyword.operator.arithmetic',
        'keyword.operator.logical',
        'keyword.operator.spread',
        'keyword.operator.rest',
        'keyword.operator.ternary',
      ],
      settings: { foreground: 'var(--color-fern-200)' },
    },
    {
      name: 'Function',
      scope: ['entity.name.function', 'support.function'],
      settings: { foreground: 'var(--color-moss-300)' },
    },
    {
      name: 'Variable',
      scope: ['variable', 'variable.other'],
      settings: { foreground: 'var(--color-fern-200)' },
    },
    {
      name: 'Class',
      scope: [
        'entity.name.type',
        'entity.other.inherited-class',
        'support.class',
      ],
      settings: { foreground: 'var(--color-dandelion-300)' },
    },
    {
      name: 'Symbol',
      scope: ['constant.other.symbol'],
      settings: { foreground: 'var(--color-rio-200)' },
    },
    {
      name: 'Built-in',
      scope: ['support.type.builtin', 'support.constant'],
      settings: { foreground: 'var(--color-rio-200)' },
    },
    {
      name: 'Entity & URL',
      scope: ['constant.character.entity', 'markup.underline.link'],
      settings: { foreground: 'var(--color-dandelion-300)' },
    },
    {
      name: 'Regex',
      scope: ['string.regexp'],
      settings: { foreground: 'var(--color-dandelion-300)' },
    },
    {
      name: 'Tag',
      scope: [
        'entity.name.tag',
        'punctuation.definition.tag',
        'meta.tag punctuation.definition.tag',
      ],
      settings: { foreground: 'var(--color-fern-200)' },
    },
    {
      name: 'Attribute Name',
      scope: ['entity.other.attribute-name'],
      settings: { foreground: 'var(--color-moss-300)' },
    },
    {
      name: 'Attribute Value',
      scope: [
        'meta.attribute string',
        'string.quoted.double.html',
        'string.quoted.single.html',
      ],
      settings: { foreground: 'var(--color-rio-200)' },
    },
    {
      name: 'CSS Selector',
      scope: [
        'entity.other.attribute-name.class.css',
        'entity.other.attribute-name.id.css',
        'entity.other.attribute-name.pseudo-class.css',
        'entity.other.attribute-name.pseudo-element.css',
        'entity.name.tag.css',
        'punctuation.definition.entity.css',
      ],
      settings: { foreground: 'var(--color-fern-200)' },
    },
    {
      name: 'CSS Property',
      scope: ['support.type.property-name.css', 'meta.property-name.css'],
      settings: { foreground: 'var(--color-moss-300)' },
    },
    {
      name: 'CSS Property Value',
      scope: ['support.constant.property-value.css'],
      settings: { foreground: 'var(--color-fern-200)' },
    },
    {
      name: 'CSS Function',
      scope: [
        'support.function.css',
        'support.function.misc.css',
        'support.function.gradient.css',
        'support.function.url.css',
        'support.function.transform.css',
        'support.function.calc.css',
        'entity.name.function.scss',
      ],
      settings: { foreground: 'var(--color-cornflour-300)' },
    },
    {
      name: 'CSS Hex Colour',
      scope: [
        'constant.other.color.rgb-value.hex.css',
        'punctuation.definition.constant.css',
      ],
      settings: { foreground: 'var(--color-rio-200)' },
    },
    {
      name: 'CSS At-rule',
      scope: ['keyword.control.at-rule', 'punctuation.definition.keyword.css'],
      settings: { foreground: 'var(--color-dandelion-300)' },
    },
    {
      name: 'CSS Unit',
      scope: ['keyword.other.unit'],
      settings: { foreground: 'var(--color-rio-200)' },
    },
    {
      name: 'CSS Variable',
      scope: ['variable.scss', 'variable.css', 'variable.argument.css'],
      settings: { foreground: 'var(--color-moss-300)' },
    },
    {
      name: 'SCSS Ampersand',
      scope: ['entity.name.tag.reference.scss'],
      settings: { foreground: 'var(--color-dandelion-300)' },
    },
    {
      name: 'JS Method',
      scope: ['meta.function-call entity.name.function'],
      settings: { foreground: 'var(--color-moss-300)' },
    },
    {
      name: 'Namespace',
      scope: ['entity.name.namespace', 'entity.name.scope-resolution'],
      settings: { foreground: 'var(--color-fern-200)' },
    },
    {
      name: 'Important',
      scope: ['keyword.other.important'],
      settings: { foreground: 'var(--color-rio-200)', fontStyle: 'bold' },
    },
    {
      name: 'Bold',
      scope: ['markup.bold'],
      settings: { fontStyle: 'bold' },
    },
    {
      name: 'Italic',
      scope: ['markup.italic'],
      settings: { fontStyle: 'italic' },
    },
    {
      name: 'PHP Tag',
      scope: [
        'punctuation.section.embedded.begin.php',
        'punctuation.section.embedded.end.php',
      ],
      settings: { foreground: 'var(--color-rio-200)' },
    },
    {
      name: 'PHP Variable',
      scope: ['variable.other.php'],
      settings: { foreground: 'var(--color-fern-200)' },
    },
  ],
}
