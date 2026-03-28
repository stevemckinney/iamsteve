/**
 * Tailwind CSS injection grammar for Shiki
 *
 * Injects into the built-in CSS grammar to recognise Tailwind-specific at-rules
 * like @theme, routing their body through property-list context so custom
 * properties and values get correct syntax highlighting.
 *
 * Without this, Shiki's CSS grammar falls back to its generic at-rule handler
 * which parses unknown at-rule bodies as full stylesheet context (selectors),
 * not property declarations.
 *
 * Uses L: (left injection) so @theme is matched before the CSS grammar's
 * generic fallback at-rule handler.
 */
export const tailwindCssInjection = {
  name: 'tailwindcss-injection',
  scopeName: 'tailwind.css-injection',
  injectTo: ['source.css'],
  injectionSelector: 'L:source.css',
  patterns: [{ include: '#tailwind-at-theme' }],
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
