/**
 * Custom Shiki themes for iamsteve.me
 *
 * Colour values are derived from the design system in css/primitives.css.
 * Each token maps to the same role it had in the previous prism.css theme.
 *
 * Palette reference (hex from oklch/rgb primitives):
 *
 *   fern-900   #005443    fern-300   #8fc2b3
 *   fern-1100  #002f23    fern-800   #006854
 *   neutral-01-50  #fcf9f8
 *   neutral-02-400 #8c94a2
 *   neutral-03-400 #8ca29c
 *   dandelion-500  #ea8900    dandelion-300  #f8bb00
 *   magenta-500    #b758c9    magenta-200    #ffa2e8
 *   lavender-700   #6456c6
 *   cornflour-500  #6190e5    cornflour-300  #8fb6f2
 *   grass-500      #1d8900    grass-300      #6db700
 *   rio-500        #e92600    rio-200        #ff9061
 *   fern-500       #5f9d8b
 *   dandelion-700  #be5400    dandelion-800  #983e00
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
      settings: { foreground: '#6190e5' }, // cornflour-500
    },
    {
      name: 'String',
      scope: ['string', 'string.quoted', 'string.template'],
      settings: { foreground: '#be5400' }, // dandelion-700
    },
    {
      name: 'String Punctuation',
      scope: [
        'punctuation.definition.string',
        'punctuation.definition.string.begin',
        'punctuation.definition.string.end',
      ],
      settings: { foreground: '#983e00' }, // dandelion-800
    },
    {
      name: 'Number',
      scope: ['constant.numeric'],
      settings: { foreground: '#b758c9' }, // magenta-500
    },
    {
      name: 'Boolean & Constant',
      scope: ['constant.language', 'constant.other'],
      settings: { foreground: '#ea8900' }, // dandelion-500
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
      settings: { foreground: '#1d8900' }, // grass-500
    },
    {
      name: 'Function',
      scope: ['entity.name.function', 'support.function'],
      settings: { foreground: '#005443' }, // fern-900
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
      settings: { foreground: '#e92600' }, // rio-500
    },
    {
      name: 'Symbol',
      scope: ['constant.other.symbol'],
      settings: { foreground: '#b758c9' }, // magenta-500
    },
    {
      name: 'Built-in',
      scope: ['support.type.builtin', 'support.constant'],
      settings: { foreground: '#ea8900' }, // dandelion-500
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
      settings: { foreground: '#b758c9' }, // magenta-500
    },
    {
      name: 'Attribute Name',
      scope: ['entity.other.attribute-name'],
      settings: { foreground: '#6456c6' }, // lavender-700
    },
    {
      name: 'Attribute Value',
      scope: [
        'meta.attribute string',
        'string.quoted.double.html',
        'string.quoted.single.html',
      ],
      settings: { foreground: '#be5400' }, // dandelion-700
    },
    {
      name: 'CSS Selector',
      scope: [
        'entity.other.attribute-name.class.css',
        'entity.other.attribute-name.id.css',
        'entity.name.tag.css',
      ],
      settings: { foreground: '#ea8900' }, // dandelion-500
    },
    {
      name: 'CSS Property',
      scope: ['support.type.property-name.css', 'meta.property-name.css'],
      settings: { foreground: '#8c94a2' }, // neutral-02-400
    },
    {
      name: 'CSS Property Value',
      scope: ['support.constant.property-value.css', 'meta.property-value.css'],
      settings: { foreground: '#005443' }, // fern-900
    },
    {
      name: 'CSS Function',
      scope: [
        'support.function.css',
        'support.function.misc.css',
        'entity.name.function.scss',
      ],
      settings: { foreground: '#6190e5' }, // cornflour-500
    },
    {
      name: 'CSS At-rule',
      scope: ['keyword.control.at-rule', 'punctuation.definition.keyword.css'],
      settings: { foreground: '#ea8900' }, // dandelion-500
    },
    {
      name: 'CSS Unit',
      scope: ['keyword.other.unit.css', 'keyword.other.unit.scss'],
      settings: { foreground: '#b758c9' }, // magenta-500
    },
    {
      name: 'SCSS Variable',
      scope: ['variable.scss', 'variable.css'],
      settings: { foreground: '#6456c6' }, // lavender-700
    },
    {
      name: 'SCSS Ampersand',
      scope: ['entity.name.tag.reference.scss'],
      settings: { foreground: '#ea8900' }, // dandelion-500
    },
    {
      name: 'JS Method',
      scope: ['meta.function-call entity.name.function'],
      settings: { foreground: '#6456c6' }, // lavender-700
    },
    {
      name: 'Namespace',
      scope: ['entity.name.namespace', 'entity.name.scope-resolution'],
      settings: { foreground: '#005443' }, // fern-900
    },
    {
      name: 'Important',
      scope: ['keyword.other.important'],
      settings: { foreground: '#ea8900', fontStyle: 'bold' }, // dandelion-500
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
      settings: { foreground: '#e92600' }, // rio-500
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
    'editor.foreground': '#fcf9f8', // neutral-01-50
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
      settings: { foreground: '#8fb6f2' }, // cornflour-300
    },
    {
      name: 'String',
      scope: ['string', 'string.quoted', 'string.template'],
      settings: { foreground: '#f8bb00' }, // dandelion-300
    },
    {
      name: 'String Punctuation',
      scope: [
        'punctuation.definition.string',
        'punctuation.definition.string.begin',
        'punctuation.definition.string.end',
      ],
      settings: { foreground: '#ea8900' }, // dandelion-500
    },
    {
      name: 'Number',
      scope: ['constant.numeric'],
      settings: { foreground: '#ffa2e8' }, // magenta-200
    },
    {
      name: 'Boolean & Constant',
      scope: ['constant.language', 'constant.other'],
      settings: { foreground: '#f8bb00' }, // dandelion-300
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
      settings: { foreground: '#fcf9f8' }, // neutral-01-50
    },
    {
      name: 'Operator',
      scope: ['keyword.operator'],
      settings: { foreground: '#fcf9f8' }, // neutral-01-50
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
      settings: { foreground: '#6db700' }, // grass-300
    },
    {
      name: 'Function',
      scope: ['entity.name.function', 'support.function'],
      settings: { foreground: '#f8bb00' }, // dandelion-300
    },
    {
      name: 'Variable',
      scope: ['variable', 'variable.other'],
      settings: { foreground: '#ffa2e8' }, // magenta-200
    },
    {
      name: 'Class',
      scope: [
        'entity.name.type',
        'entity.other.inherited-class',
        'support.class',
      ],
      settings: { foreground: '#ff9061' }, // rio-200
    },
    {
      name: 'Symbol',
      scope: ['constant.other.symbol'],
      settings: { foreground: '#ffa2e8' }, // magenta-200
    },
    {
      name: 'Built-in',
      scope: ['support.type.builtin', 'support.constant'],
      settings: { foreground: '#f8bb00' }, // dandelion-300
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
      settings: { foreground: '#ffa2e8' }, // magenta-200
    },
    {
      name: 'Attribute Name',
      scope: ['entity.other.attribute-name'],
      settings: { foreground: '#b3a0f2' }, // lavender-300
    },
    {
      name: 'Attribute Value',
      scope: [
        'meta.attribute string',
        'string.quoted.double.html',
        'string.quoted.single.html',
      ],
      settings: { foreground: '#f8bb00' }, // dandelion-300
    },
    {
      name: 'CSS Selector',
      scope: [
        'entity.other.attribute-name.class.css',
        'entity.other.attribute-name.id.css',
        'entity.name.tag.css',
      ],
      settings: { foreground: '#f8bb00' }, // dandelion-300
    },
    {
      name: 'CSS Property',
      scope: ['support.type.property-name.css', 'meta.property-name.css'],
      settings: { foreground: '#8fc2b3' }, // fern-300 (cyan)
    },
    {
      name: 'CSS Property Value',
      scope: ['support.constant.property-value.css', 'meta.property-value.css'],
      settings: { foreground: '#fcf9f8' }, // neutral-01-50
    },
    {
      name: 'CSS Function',
      scope: [
        'support.function.css',
        'support.function.misc.css',
        'entity.name.function.scss',
      ],
      settings: { foreground: '#8fb6f2' }, // cornflour-300
    },
    {
      name: 'CSS At-rule',
      scope: ['keyword.control.at-rule', 'punctuation.definition.keyword.css'],
      settings: { foreground: '#f8bb00' }, // dandelion-300
    },
    {
      name: 'CSS Unit',
      scope: ['keyword.other.unit.css', 'keyword.other.unit.scss'],
      settings: { foreground: '#ffa2e8' }, // magenta-200
    },
    {
      name: 'SCSS Variable',
      scope: ['variable.scss', 'variable.css'],
      settings: { foreground: '#fcf9f8' }, // neutral-01-50
    },
    {
      name: 'SCSS Ampersand',
      scope: ['entity.name.tag.reference.scss'],
      settings: { foreground: '#f8bb00' }, // dandelion-300
    },
    {
      name: 'JS Method',
      scope: ['meta.function-call entity.name.function'],
      settings: { foreground: '#f8bb00' }, // dandelion-300
    },
    {
      name: 'Namespace',
      scope: ['entity.name.namespace', 'entity.name.scope-resolution'],
      settings: { foreground: '#fcf9f8' }, // neutral-01-50
    },
    {
      name: 'Important',
      scope: ['keyword.other.important'],
      settings: { foreground: '#f8bb00', fontStyle: 'bold' }, // dandelion-300
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
      settings: { foreground: '#ffa2e8' }, // magenta-200
    },
  ],
}
