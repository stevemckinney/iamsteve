/**
 * Tailwind CSS TextMate grammar for Shiki
 *
 * Extends the built-in CSS grammar to recognise Tailwind-specific at-rules
 * like @theme, routing their body through property-list context so custom
 * properties and values get correct syntax highlighting.
 *
 * Without this, Shiki's CSS grammar falls back to its generic at-rule handler
 * which parses unknown at-rule bodies as full stylesheet context (selectors),
 * not property declarations.
 */
export const tailwindCssGrammar = {
  name: 'tailwindcss',
  scopeName: 'source.css.tailwind',
  embeddedLangs: ['css'],
  patterns: [
    { include: '#tailwind-at-theme' },
    { include: 'source.css' },
  ],
  repository: {
    'tailwind-at-theme': {
      begin: '(?i)(?=@theme\\b)',
      end: '(?<=})(?!\\G)',
      name: 'meta.at-rule.theme.css',
      patterns: [
        {
          begin: '(?i)((@)theme)\\b',
          beginCaptures: {
            1: { name: 'keyword.control.at-rule.theme.css' },
            2: { name: 'punctuation.definition.keyword.css' },
          },
          end: '(?=\\s*\\{)',
          name: 'meta.at-rule.theme.header.css',
        },
        { include: 'source.css#comment-block' },
        { include: 'source.css#rule-list' },
      ],
    },
  },
}
