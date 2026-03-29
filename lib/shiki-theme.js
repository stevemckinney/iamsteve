/**
 * Custom Shiki themes for iamsteve.me
 *
 * Colour values are derived from the design system in css/primitives.css.
 *
 * Palette reference (hex from oklch/rgb primitives):
 *
 *   Light base:
 *   fern-900    #005443   — foreground, values, punctuation, operators
 *   neutral-02-400 #8c94a2 — comments
 *   moss-500    #3d8948   — property names, functions (general)
 *   dandelion-500  #ea8900 — selectors, at-rules, strings
 *   dandelion-700  #be5400 — string content
 *   dandelion-800  #983e00 — string punctuation (quotes)
 *   cornflour-700  #406dc8 — CSS functions
 *   lavender-700   #6456c6 — keywords, variables, attributes
 *   rio-400     #f8450f   — numbers, units, constants
 *
 *   Dark base:
 *   fern-200    #abd5c8   — foreground, values, punctuation, operators
 *   neutral-03-400 #8ca29c — comments
 *   moss-300    #68b664   — property names, functions (general)
 *   dandelion-300  #f8bb00 — selectors, at-rules, strings
 *   dandelion-500  #ea8900 — string punctuation (quotes)
 *   cornflour-300  #8fb6f2 — CSS functions
 *   lavender-300   #b3a0f2 — keywords, variables, attributes
 *   rio-200     #ff9061   — numbers, units, constants
 */

export const shikiLightTheme = {
  name: 'iamsteve-light',
  type: 'light',
  colors: {
    'editor.background': '#fcf9f8', // neutral-01-50
    'editor.foreground': '#005443', // fern-900
  },
  tokenColors: [
    {
      name: 'Comment',
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: '#8c94a2' }, // neutral-02-400
    },
    {
      name: 'Punctuation',
      scope: ['punctuation'],
      settings: { foreground: '#005443' }, // fern-900
    },
    {
      name: 'String',
      scope: ['string', 'string.quoted', 'string.template'],
      settings: { foreground: '#f8450f' }, // rio-400
    },
    {
      name: 'String Punctuation',
      scope: [
        'punctuation.definition.string',
        'punctuation.definition.string.begin',
        'punctuation.definition.string.end',
      ],
      settings: { foreground: '#aa0000' }, // rio-700
    },
    {
      name: 'Number',
      scope: ['constant.numeric'],
      settings: { foreground: '#f8450f' }, // rio-400
    },
    {
      name: 'Boolean & Constant',
      scope: ['constant.language', 'constant.other'],
      settings: { foreground: '#f8450f' }, // rio-400
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
      settings: { foreground: '#6456c6' }, // lavender-700
    },
    {
      name: 'Operator',
      scope: ['keyword.operator'],
      settings: { foreground: '#005443' }, // fern-900
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
      settings: { foreground: '#005443' }, // fern-900
    },
    {
      name: 'Function',
      scope: ['entity.name.function', 'support.function'],
      settings: { foreground: '#3d8948' }, // moss-500
    },
    {
      name: 'Variable',
      scope: ['variable', 'variable.other'],
      settings: { foreground: '#005443' }, // fern-900
    },
    {
      name: 'Class',
      scope: [
        'entity.name.type',
        'entity.other.inherited-class',
        'support.class',
      ],
      settings: { foreground: '#ea8900' }, // dandelion-500
    },
    {
      name: 'Symbol',
      scope: ['constant.other.symbol'],
      settings: { foreground: '#f8450f' }, // rio-400
    },
    {
      name: 'Built-in',
      scope: ['support.type.builtin', 'support.constant'],
      settings: { foreground: '#f8450f' }, // rio-400
    },
    {
      name: 'Entity & URL',
      scope: ['constant.character.entity', 'markup.underline.link'],
      settings: { foreground: '#ea8900' }, // dandelion-500
    },
    {
      name: 'Regex',
      scope: ['string.regexp'],
      settings: { foreground: '#ea8900' }, // dandelion-500
    },
    {
      name: 'Tag',
      scope: [
        'entity.name.tag',
        'punctuation.definition.tag',
        'meta.tag punctuation.definition.tag',
      ],
      settings: { foreground: '#005443' }, // fern-900
    },
    {
      name: 'Attribute Name',
      scope: ['entity.other.attribute-name'],
      settings: { foreground: '#3d8948' }, // moss-500
    },
    {
      name: 'Attribute Value',
      scope: [
        'meta.attribute string',
        'string.quoted.double.html',
        'string.quoted.single.html',
      ],
      settings: { foreground: '#f8450f' }, // rio-400
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
      settings: { foreground: '#005443' }, // fern-900
    },
    {
      name: 'CSS Property',
      scope: ['support.type.property-name.css', 'meta.property-name.css'],
      settings: { foreground: '#3d8948' }, // moss-500
    },
    {
      name: 'CSS Property Value',
      scope: ['support.constant.property-value.css'],
      settings: { foreground: '#005443' }, // fern-900
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
      settings: { foreground: '#406dc8' }, // cornflour-700
    },
    {
      name: 'CSS Hex Colour',
      scope: [
        'constant.other.color.rgb-value.hex.css',
        'punctuation.definition.constant.css',
      ],
      settings: { foreground: '#f8450f' }, // rio-400
    },
    {
      name: 'CSS At-rule',
      scope: ['keyword.control.at-rule', 'punctuation.definition.keyword.css'],
      settings: { foreground: '#ea8900' }, // dandelion-500
    },
    {
      name: 'CSS Unit',
      scope: ['keyword.other.unit'],
      settings: { foreground: '#f8450f' }, // rio-400
    },
    {
      name: 'CSS Variable',
      scope: ['variable.scss', 'variable.css', 'variable.argument.css'],
      settings: { foreground: '#3d8948' }, // moss-500
    },
    {
      name: 'SCSS Ampersand',
      scope: ['entity.name.tag.reference.scss'],
      settings: { foreground: '#ea8900' }, // dandelion-500
    },
    {
      name: 'JS Method',
      scope: ['meta.function-call entity.name.function'],
      settings: { foreground: '#3d8948' }, // moss-500
    },
    {
      name: 'Namespace',
      scope: ['entity.name.namespace', 'entity.name.scope-resolution'],
      settings: { foreground: '#005443' }, // fern-900
    },
    {
      name: 'Important',
      scope: ['keyword.other.important'],
      settings: { foreground: '#f8450f', fontStyle: 'bold' }, // rio-400
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
      settings: { foreground: '#f8450f' }, // rio-400
    },
    {
      name: 'PHP Variable',
      scope: ['variable.other.php'],
      settings: { foreground: '#005443' }, // fern-900
    },
  ],
}

export const shikiDarkTheme = {
  name: 'iamsteve-dark',
  type: 'dark',
  colors: {
    'editor.background': '#002f23', // fern-1100
    'editor.foreground': '#abd5c8', // fern-200
  },
  tokenColors: [
    {
      name: 'Comment',
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: '#8ca29c' }, // neutral-03-400
    },
    {
      name: 'Punctuation',
      scope: ['punctuation'],
      settings: { foreground: '#abd5c8' }, // fern-200
    },
    {
      name: 'String',
      scope: ['string', 'string.quoted', 'string.template'],
      settings: { foreground: '#ff9061' }, // rio-200
    },
    {
      name: 'String Punctuation',
      scope: [
        'punctuation.definition.string',
        'punctuation.definition.string.begin',
        'punctuation.definition.string.end',
      ],
      settings: { foreground: '#ff6934' }, // rio-300
    },
    {
      name: 'Number',
      scope: ['constant.numeric'],
      settings: { foreground: '#ff9061' }, // rio-200
    },
    {
      name: 'Boolean & Constant',
      scope: ['constant.language', 'constant.other'],
      settings: { foreground: '#ff9061' }, // rio-200
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
      settings: { foreground: '#b3a0f2' }, // lavender-300
    },
    {
      name: 'Operator',
      scope: ['keyword.operator'],
      settings: { foreground: '#abd5c8' }, // fern-200
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
      settings: { foreground: '#abd5c8' }, // fern-200
    },
    {
      name: 'Function',
      scope: ['entity.name.function', 'support.function'],
      settings: { foreground: '#68b664' }, // moss-300
    },
    {
      name: 'Variable',
      scope: ['variable', 'variable.other'],
      settings: { foreground: '#abd5c8' }, // fern-200
    },
    {
      name: 'Class',
      scope: [
        'entity.name.type',
        'entity.other.inherited-class',
        'support.class',
      ],
      settings: { foreground: '#f8bb00' }, // dandelion-300
    },
    {
      name: 'Symbol',
      scope: ['constant.other.symbol'],
      settings: { foreground: '#ff9061' }, // rio-200
    },
    {
      name: 'Built-in',
      scope: ['support.type.builtin', 'support.constant'],
      settings: { foreground: '#ff9061' }, // rio-200
    },
    {
      name: 'Entity & URL',
      scope: ['constant.character.entity', 'markup.underline.link'],
      settings: { foreground: '#f8bb00' }, // dandelion-300
    },
    {
      name: 'Regex',
      scope: ['string.regexp'],
      settings: { foreground: '#f8bb00' }, // dandelion-300
    },
    {
      name: 'Tag',
      scope: [
        'entity.name.tag',
        'punctuation.definition.tag',
        'meta.tag punctuation.definition.tag',
      ],
      settings: { foreground: '#abd5c8' }, // fern-200
    },
    {
      name: 'Attribute Name',
      scope: ['entity.other.attribute-name'],
      settings: { foreground: '#68b664' }, // moss-300
    },
    {
      name: 'Attribute Value',
      scope: [
        'meta.attribute string',
        'string.quoted.double.html',
        'string.quoted.single.html',
      ],
      settings: { foreground: '#ff9061' }, // rio-200
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
      settings: { foreground: '#abd5c8' }, // fern-200
    },
    {
      name: 'CSS Property',
      scope: ['support.type.property-name.css', 'meta.property-name.css'],
      settings: { foreground: '#68b664' }, // moss-300
    },
    {
      name: 'CSS Property Value',
      scope: ['support.constant.property-value.css'],
      settings: { foreground: '#abd5c8' }, // fern-200
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
      settings: { foreground: '#8fb6f2' }, // cornflour-300
    },
    {
      name: 'CSS Hex Colour',
      scope: [
        'constant.other.color.rgb-value.hex.css',
        'punctuation.definition.constant.css',
      ],
      settings: { foreground: '#ff9061' }, // rio-200
    },
    {
      name: 'CSS At-rule',
      scope: ['keyword.control.at-rule', 'punctuation.definition.keyword.css'],
      settings: { foreground: '#f8bb00' }, // dandelion-300
    },
    {
      name: 'CSS Unit',
      scope: ['keyword.other.unit'],
      settings: { foreground: '#ff9061' }, // rio-200
    },
    {
      name: 'CSS Variable',
      scope: ['variable.scss', 'variable.css', 'variable.argument.css'],
      settings: { foreground: '#68b664' }, // moss-300
    },
    {
      name: 'SCSS Ampersand',
      scope: ['entity.name.tag.reference.scss'],
      settings: { foreground: '#f8bb00' }, // dandelion-300
    },
    {
      name: 'JS Method',
      scope: ['meta.function-call entity.name.function'],
      settings: { foreground: '#68b664' }, // moss-300
    },
    {
      name: 'Namespace',
      scope: ['entity.name.namespace', 'entity.name.scope-resolution'],
      settings: { foreground: '#abd5c8' }, // fern-200
    },
    {
      name: 'Important',
      scope: ['keyword.other.important'],
      settings: { foreground: '#ff9061', fontStyle: 'bold' }, // rio-200
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
      settings: { foreground: '#ff9061' }, // rio-200
    },
    {
      name: 'PHP Variable',
      scope: ['variable.other.php'],
      settings: { foreground: '#abd5c8' }, // fern-200
    },
  ],
}
