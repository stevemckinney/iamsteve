/**
 * Custom Shiki themes for iamsteve.me
 *
 * Light and dark themes mapped from the existing colour palette
 * defined in css/primitives.css. Used with @shikijs/rehype
 * for dual-theme syntax highlighting.
 */

export const shikiLightTheme = {
  name: 'iamsteve-light',
  type: 'light',
  colors: {
    'editor.background': '#fcf9f8',
    'editor.foreground': '#005443',
  },
  tokenColors: [
    {
      name: 'Comment',
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: '#8c94a2' },
    },
    {
      name: 'Punctuation',
      scope: ['punctuation'],
      settings: { foreground: '#8c94a2' },
    },
    {
      name: 'String',
      scope: ['string', 'string.quoted', 'string.template'],
      settings: { foreground: '#ea8900' },
    },
    {
      name: 'Number',
      scope: ['constant.numeric'],
      settings: { foreground: '#b758c9' },
    },
    {
      name: 'Boolean & Constant',
      scope: ['constant.language', 'constant.other'],
      settings: { foreground: '#ea8900' },
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
      settings: { foreground: '#6456c6' },
    },
    {
      name: 'Operator',
      scope: ['keyword.operator'],
      settings: { foreground: '#005443' },
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
      settings: { foreground: '#1d8900' },
    },
    {
      name: 'Function',
      scope: ['entity.name.function', 'support.function'],
      settings: { foreground: '#005443' },
    },
    {
      name: 'Variable',
      scope: ['variable', 'variable.other'],
      settings: { foreground: '#005443' },
    },
    {
      name: 'Class',
      scope: [
        'entity.name.type',
        'entity.other.inherited-class',
        'support.class',
      ],
      settings: { foreground: '#e92600' },
    },
    {
      name: 'Symbol',
      scope: ['constant.other.symbol'],
      settings: { foreground: '#b758c9' },
    },
    {
      name: 'Built-in',
      scope: ['support.type.builtin', 'support.constant'],
      settings: { foreground: '#ea8900' },
    },
    {
      name: 'Entity & URL',
      scope: ['constant.character.entity', 'markup.underline.link'],
      settings: { foreground: '#ea8900' },
    },
    {
      name: 'Regex',
      scope: ['string.regexp'],
      settings: { foreground: '#ea8900' },
    },
    {
      name: 'Tag',
      scope: ['entity.name.tag'],
      settings: { foreground: '#6190e5' },
    },
    {
      name: 'Tag Punctuation',
      scope: [
        'punctuation.definition.tag',
        'meta.tag punctuation.definition.tag',
      ],
      settings: { foreground: '#b758c9' },
    },
    {
      name: 'Attribute Name',
      scope: ['entity.other.attribute-name'],
      settings: { foreground: '#ea8900' },
    },
    {
      name: 'Attribute Value',
      scope: [
        'meta.attribute string',
        'string.quoted.double.html',
        'string.quoted.single.html',
      ],
      settings: { foreground: '#ea8900' },
    },
    {
      name: 'CSS Selector',
      scope: [
        'entity.other.attribute-name.class.css',
        'entity.other.attribute-name.id.css',
        'entity.name.tag.css',
      ],
      settings: { foreground: '#ea8900' },
    },
    {
      name: 'CSS Property',
      scope: ['support.type.property-name.css', 'meta.property-name.css'],
      settings: { foreground: '#8c94a2' },
    },
    {
      name: 'CSS Property Value',
      scope: ['support.constant.property-value.css', 'meta.property-value.css'],
      settings: { foreground: '#005443' },
    },
    {
      name: 'CSS Function',
      scope: ['support.function.css', 'entity.name.function.scss'],
      settings: { foreground: '#6190e5' },
    },
    {
      name: 'CSS At-rule',
      scope: ['keyword.control.at-rule'],
      settings: { foreground: '#ea8900' },
    },
    {
      name: 'CSS Unit',
      scope: ['keyword.other.unit.css', 'keyword.other.unit.scss'],
      settings: { foreground: '#b758c9' },
    },
    {
      name: 'SCSS Variable',
      scope: ['variable.scss', 'variable.css'],
      settings: { foreground: '#6456c6' },
    },
    {
      name: 'SCSS Ampersand',
      scope: ['entity.name.tag.reference.scss'],
      settings: { foreground: '#ea8900' },
    },
    {
      name: 'JS Method',
      scope: ['meta.function-call entity.name.function'],
      settings: { foreground: '#6456c6' },
    },
    {
      name: 'Namespace',
      scope: ['entity.name.namespace', 'entity.name.scope-resolution'],
      settings: { foreground: '#005443' },
    },
    {
      name: 'Important',
      scope: ['keyword.other.important'],
      settings: { foreground: '#ea8900', fontStyle: 'bold' },
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
      settings: { foreground: '#e92600' },
    },
    {
      name: 'PHP Variable',
      scope: ['variable.other.php'],
      settings: { foreground: '#005443' },
    },
  ],
}

export const shikiDarkTheme = {
  name: 'iamsteve-dark',
  type: 'dark',
  colors: {
    'editor.background': '#002f23',
    'editor.foreground': '#fcf9f8',
  },
  tokenColors: [
    {
      name: 'Comment',
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: '#8ca29c' },
    },
    {
      name: 'Punctuation',
      scope: ['punctuation'],
      settings: { foreground: '#8ca29c' },
    },
    {
      name: 'String',
      scope: ['string', 'string.quoted', 'string.template'],
      settings: { foreground: '#f8bb00' },
    },
    {
      name: 'Number',
      scope: ['constant.numeric'],
      settings: { foreground: '#ffa2e8' },
    },
    {
      name: 'Boolean & Constant',
      scope: ['constant.language', 'constant.other'],
      settings: { foreground: '#f8bb00' },
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
      settings: { foreground: '#fcf9f8' },
    },
    {
      name: 'Operator',
      scope: ['keyword.operator'],
      settings: { foreground: '#fcf9f8' },
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
      settings: { foreground: '#6db700' },
    },
    {
      name: 'Function',
      scope: ['entity.name.function', 'support.function'],
      settings: { foreground: '#f8bb00' },
    },
    {
      name: 'Variable',
      scope: ['variable', 'variable.other'],
      settings: { foreground: '#ffa2e8' },
    },
    {
      name: 'Class',
      scope: [
        'entity.name.type',
        'entity.other.inherited-class',
        'support.class',
      ],
      settings: { foreground: '#ff9061' },
    },
    {
      name: 'Symbol',
      scope: ['constant.other.symbol'],
      settings: { foreground: '#ffa2e8' },
    },
    {
      name: 'Built-in',
      scope: ['support.type.builtin', 'support.constant'],
      settings: { foreground: '#f8bb00' },
    },
    {
      name: 'Entity & URL',
      scope: ['constant.character.entity', 'markup.underline.link'],
      settings: { foreground: '#f8bb00' },
    },
    {
      name: 'Regex',
      scope: ['string.regexp'],
      settings: { foreground: '#f8bb00' },
    },
    {
      name: 'Tag',
      scope: ['entity.name.tag'],
      settings: { foreground: '#8fb6f2' },
    },
    {
      name: 'Tag Punctuation',
      scope: [
        'punctuation.definition.tag',
        'meta.tag punctuation.definition.tag',
      ],
      settings: { foreground: '#ffa2e8' },
    },
    {
      name: 'Attribute Name',
      scope: ['entity.other.attribute-name'],
      settings: { foreground: '#f8bb00' },
    },
    {
      name: 'Attribute Value',
      scope: [
        'meta.attribute string',
        'string.quoted.double.html',
        'string.quoted.single.html',
      ],
      settings: { foreground: '#f8bb00' },
    },
    {
      name: 'CSS Selector',
      scope: [
        'entity.other.attribute-name.class.css',
        'entity.other.attribute-name.id.css',
        'entity.name.tag.css',
      ],
      settings: { foreground: '#f8bb00' },
    },
    {
      name: 'CSS Property',
      scope: ['support.type.property-name.css', 'meta.property-name.css'],
      settings: { foreground: '#8fc2b3' },
    },
    {
      name: 'CSS Property Value',
      scope: ['support.constant.property-value.css', 'meta.property-value.css'],
      settings: { foreground: '#fcf9f8' },
    },
    {
      name: 'CSS Function',
      scope: ['support.function.css', 'entity.name.function.scss'],
      settings: { foreground: '#8fb6f2' },
    },
    {
      name: 'CSS At-rule',
      scope: ['keyword.control.at-rule'],
      settings: { foreground: '#f8bb00' },
    },
    {
      name: 'CSS Unit',
      scope: ['keyword.other.unit.css', 'keyword.other.unit.scss'],
      settings: { foreground: '#ffa2e8' },
    },
    {
      name: 'SCSS Variable',
      scope: ['variable.scss', 'variable.css'],
      settings: { foreground: '#fcf9f8' },
    },
    {
      name: 'SCSS Ampersand',
      scope: ['entity.name.tag.reference.scss'],
      settings: { foreground: '#f8bb00' },
    },
    {
      name: 'JS Method',
      scope: ['meta.function-call entity.name.function'],
      settings: { foreground: '#f8bb00' },
    },
    {
      name: 'Namespace',
      scope: ['entity.name.namespace', 'entity.name.scope-resolution'],
      settings: { foreground: '#fcf9f8' },
    },
    {
      name: 'Important',
      scope: ['keyword.other.important'],
      settings: { foreground: '#f8bb00', fontStyle: 'bold' },
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
      settings: { foreground: '#ff9061' },
    },
    {
      name: 'PHP Variable',
      scope: ['variable.other.php'],
      settings: { foreground: '#ffa2e8' },
    },
  ],
}
