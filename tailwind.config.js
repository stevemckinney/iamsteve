const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
	content: [
    './app/**/*.js',
    './components/**/*.js',
    './layouts/**/*.js',
    './lib/**/*.js'
  ],
	darkMode: 'class',
	theme: {
    borderRadius: {
      'none': '0',
      'xs': '.25rem',
      'sm': '.5rem',
      DEFAULT: '1rem',
      'md': '1rem',
      'lg': '1.5rem',
      'xl': '2rem',
      'rounded': '999rem',
    },
    fontSize: {
      '7xl': ['5.5rem', {
        lineHeight: '.81818',
        letterSpacing: '-.03409090909em',
        fontVariationSettings: '"wdth" 100, "wght" 750',
      }],
      '6xl': ['4rem', {
        lineHeight: '.875',
        letterSpacing: '-.03125em',
      }],
      '5xl': ['3rem', {
        lineHeight: '.9166667',
        letterSpacing: '-.03125em',
      }],
      '4xl': ['2.5rem', {
        lineHeight: '1.1',
        letterSpacing: '-.0125em',
      }],
      '3xl': ['2rem', {
        lineHeight: '1.125',
        letterSpacing: '-.015625em',
      }],
      '2xl': ['1.5rem', {
        lineHeight: '1.5',
      }],
      'xl': ['1.3125rem', {
        lineHeight: '1.5',
      }],
      'lg': ['1.125rem', {
        lineHeight: '1.5',
      }],
      'base': ['1rem', {
        lineHeight: '1.5',
      }],
      'sm': ['.875rem', {
        lineHeight: '1.5',
      }],
      'xs': ['.75rem', {
        lineHeight: '1.5',
      }],
      '2xs': ['.625rem', {
        lineHeight: '1.5',
      }],
    },
		extend: {
      gridTemplateColumns: {
        '16': 'repeat(16, minmax(0, 1fr))',
        'subgrid': 'subgrid',
      },
      gridColumn: {
        'content': 'content-start / content-end',
        'prose': 'prose-start / prose-end',
      },
      gridColumnStart: {
        'content-start': 'content-start',
        'prose-start': 'prose-start',
      },
      gridColumnEnd: {
        'content-end': 'content-end',
        'prose-end': 'prose-end',
      },
      lineHeight: {
        '7xl': '.81818',
        '6xl': '.875',
        '5xl': '.9166667',
        '4xl': '1.1',
        '3xl': '1.125',
        '2xl': '1.166667',
        'xl': '1.23809',
        'lg': '1.333333',
      },
      fontFamily: {
        sans: ['gira-sans', 'sans-serif', ...defaultTheme.fontFamily.sans],
        display: [
          ['roc-grotesk-variable', 'sans-serif', ...defaultTheme.fontFamily.sans],
          {
            fontVariationSettings: '"wdth" 100, "wght" 700'
          },
        ],
        mono: [
          ['covik-sans-mono', ...defaultTheme.fontFamily.mono],
          {
            fontVariantNumeric: 'lining-nums proportional-nums',
            fontVariationSettings: '"salt" on',
          }
        ]
      },
      boxShadow: {
        reduced: '0px 1px 4px -4px rgba(70, 42, 81, 0.08), 0px 1px 0px 0px rgba(70, 42, 81, 0.06), 0px 0px 1px 0px rgba(70, 42, 81, 0.10)',
        placed: ' 0px 1px 3px 0px rgba(117, 99, 98, 0.10), 0px 4px 8px 0px rgba(117, 99, 98, 0.05)',
        picked: '0px 4px 12px -4px rgba(70, 42, 81, 0.08), 0px 1px 0px 0px rgba(70, 42, 81, 0.06), 0px 0px 1px 0px rgba(70, 42, 81, 0.10)',
        floating: '0px 6px 20px -4px rgba(70, 42, 81, 0.12), 0px 2px 0px 0px rgba(70, 42, 81, 0.06), 0px 0px 1px 0px rgba(70, 42, 81, 0.30)',
      },
			colors: {
        ui: {
          'bg-inset': '#ffffff',
          'body': 'rgb(9 46 36 / .6)'
        },
        rio: {
          0: 'rgb(250 239 232 / var(--tw-text-opacity))',
          50: 'rgb(249 217 197 / var(--tw-text-opacity))',
          100: 'rgb(247 193 163 / var(--tw-text-opacity))',
          150: 'rgb(246 172 135 / var(--tw-text-opacity))',
          200: 'rgb(244 150 107 / var(--tw-text-opacity))',
          300: 'rgb(238 114 68 / var(--tw-text-opacity))',
          400: 'rgb(229 84 43 / var(--tw-text-opacity))',
          500: 'rgb(214 60 26 / var(--tw-text-opacity))',
          600: 'rgb(190 39 15 / var(--tw-text-opacity))',
          700: 'rgb(156 22 9 / var(--tw-text-opacity))',
          800: 'rgb(112 10 5 / var(--tw-text-opacity))',
          900: 'rgb(61 2 2 / var(--tw-text-opacity))'
        },
        dandelion: {
          0: 'rgb(250 248 236 / var(--tw-text-opacity))',
          50: 'rgb(249 239 189 / var(--tw-text-opacity))',
          100: 'rgb(248 229 142 / var(--tw-text-opacity))',
          200: 'rgb(244 211 64 / var(--tw-text-opacity))',
          300: 'rgb(239 190 8 / var(--tw-text-opacity))',
          400: 'rgb(232 170 0 / var(--tw-text-opacity))',
          500: 'rgb(221 142 0 / var(--tw-text-opacity))',
          600: 'rgb(203 113 0 / var(--tw-text-opacity))',
          700: 'rgb(177 90 0 / var(--tw-text-opacity))',
          800: 'rgb(141 68 0 / var(--tw-text-opacity))',
          900: 'rgb(97 46 0 / var(--tw-text-opacity))',
          1000: 'rgb(48 23 0 / var(--tw-text-opacity))'
        },
        fern: {
          0: 'rgb(235 250 245 / var(--tw-text-opacity))',
          100: 'rgb(202 231 222 / var(--tw-text-opacity))',
          200: 'rgb(171 213 200 / var(--tw-text-opacity))',
          300: 'rgb(143 194 179 / var(--tw-text-opacity))',
          400: 'rgb(118 176 159 / var(--tw-text-opacity))',
          500: 'rgb(95 157 139 / var(--tw-text-opacity))',
          600: 'rgb(74 139 121 / var(--tw-text-opacity))',
          700: 'rgb(56 120 103 / var(--tw-text-opacity))',
          800: 'rgb(41 102 85 / var(--tw-text-opacity))',
          900: 'rgb(28 83 68 / var(--tw-text-opacity))',
          1000: 'rgb(17 64 52 / var(--tw-text-opacity))',
          1100: 'rgb(9 46 36 / var(--tw-text-opacity))'
        },
        cornflour: {
          0: 'rgb(235 242 250 / var(--tw-text-opacity))',
          100: 'rgb(203 223 248 / var(--tw-text-opacity))',
          200: 'rgb(172 203 246 / var(--tw-text-opacity))',
          300: 'rgb(143 182 242 / var(--tw-text-opacity))',
          400: 'rgb(118 163 237 / var(--tw-text-opacity))',
          500: 'rgb(97 144 229 / var(--tw-text-opacity))',
          600: 'rgb(79 127 218 / var(--tw-text-opacity))',
          700: 'rgb(64 109 200 / var(--tw-text-opacity))',
          800: 'rgb(48 90 175 / var(--tw-text-opacity))',
          900: 'rgb(34 70 142 / var(--tw-text-opacity))',
          1000: 'rgb(22 49 103 / var(--tw-text-opacity))',
          1100: 'rgb(12 29 61 / var(--tw-text-opacity))'
        },
        grass: {
          0: 'rgb(249 250 235 / var(--tw-text-opacity))',
          50: 'rgb(232 238 190 / var(--tw-text-opacity))',
          100: 'rgb(212 227 148 / var(--tw-text-opacity))',
          150: 'rgb(190 215 116 / var(--tw-text-opacity))',
          200: 'rgb(167 204 86 / var(--tw-text-opacity))',
          300: 'rgb(126 181 47 / var(--tw-text-opacity))',
          400: 'rgb(92 158 25 / var(--tw-text-opacity))',
          500: 'rgb(66 135 12 / var(--tw-text-opacity))',
          600: 'rgb(47 112 5 / var(--tw-text-opacity))',
          700: 'rgb(34 89 2 / var(--tw-text-opacity))',
          800: 'rgb(23 66 0 / var(--tw-text-opacity))',
          900: 'rgb(14 43 0 / var(--tw-text-opacity))'
        },
        moss: {
          0: 'rgb(242 250 235 / var(--tw-text-opacity))',
          50: 'rgb(218 239 205 / var(--tw-text-opacity))',
          100: 'rgb(192 227 176 / var(--tw-text-opacity))',
          150: 'rgb(168 216 153 / var(--tw-text-opacity))',
          200: 'rgb(144 205 131 / var(--tw-text-opacity))',
          300: 'rgb(104 182 100 / var(--tw-text-opacity))',
          400: 'rgb(78 159 83 / var(--tw-text-opacity))',
          500: 'rgb(61 137 72 / var(--tw-text-opacity))',
          600: 'rgb(48 114 61 / var(--tw-text-opacity))',
          700: 'rgb(37 91 50 / var(--tw-text-opacity))',
          800: 'rgb(28 69 38 / var(--tw-text-opacity))',
          900: 'rgb(18 46 26 / var(--tw-text-opacity))'
        },
        lavender: {
          0: 'rgb(243 238 250 / var(--tw-text-opacity))',
          100: 'rgb(225 211 248 / var(--tw-text-opacity))',
          200: 'rgb(205 185 245 / var(--tw-text-opacity))',
          300: 'rgb(183 160 242 / var(--tw-text-opacity))',
          400: 'rgb(161 138 236 / var(--tw-text-opacity))',
          500: 'rgb(142 119 228 / var(--tw-text-opacity))',
          600: 'rgb(124 102 216 / var(--tw-text-opacity))',
          700: 'rgb(100 86 198 / var(--tw-text-opacity))',
          800: 'rgb(76 70 173 / var(--tw-text-opacity))',
          900: 'rgb(55 54 141 / var(--tw-text-opacity))',
          1000: 'rgb(38 41 103 / var(--tw-text-opacity))',
          1100: 'rgb(22 25 61 / var(--tw-text-opacity))'
        },
        magenta: {
          0: 'rgb(250 238 243 / var(--tw-text-opacity))',
          50: 'rgb(248 219 235 / var(--tw-text-opacity))',
          100: 'rgb(247 201 230 / var(--tw-text-opacity))',
          150: 'rgb(245 183 228 / var(--tw-text-opacity))',
          200: 'rgb(243 166 228 / var(--tw-text-opacity))',
          300: 'rgb(235 136 231 / var(--tw-text-opacity))',
          400: 'rgb(214 110 222 / var(--tw-text-opacity))',
          500: 'rgb(183 88 201 / var(--tw-text-opacity))',
          600: 'rgb(144 66 166 / var(--tw-text-opacity))',
          700: 'rgb(99 44 118 / var(--tw-text-opacity))',
          750: 'rgb(75 33 89 / var(--tw-text-opacity))',
          800: 'rgb(51 22 61 / var(--tw-text-opacity))'
        },
        "neutral-01": {
          0: 'rgb(255 255 255 / var(--tw-text-opacity))',
          50: 'rgb(252 249 248 / var(--tw-text-opacity))',
          100: 'rgb(249 243 241 / var(--tw-text-opacity))',
          150: 'rgb(241 232 228 / var(--tw-text-opacity))',
          200: 'rgb(232 220 217 / var(--tw-text-opacity))',
          250: 'rgb(217 203 200 / var(--tw-text-opacity))',
          300: 'rgb(203 186 183 / var(--tw-text-opacity))',
          400: 'rgb(162 143 140 / var(--tw-text-opacity))',
          500: 'rgb(117 99 98 / var(--tw-text-opacity))',
          600: 'rgb(79 64 63 / var(--tw-text-opacity))',
          700: 'rgb(52 40 40 / var(--tw-text-opacity))',
          800: 'rgb(37 27 27 / var(--tw-text-opacity))',
          900: 'rgb(31 21 21 / var(--tw-text-opacity))'
        },
        "neutral-02": {
          0: 'rgb(255 255 255 / var(--tw-text-opacity))',
          50: 'rgb(248 250 252 / var(--tw-text-opacity))',
          100: 'rgb(241 244 249 / var(--tw-text-opacity))',
          150: 'rgb(228 234 241 / var(--tw-text-opacity))',
          200: 'rgb(217 223 232 / var(--tw-text-opacity))',
          250: 'rgb(200 207 217 / var(--tw-text-opacity))',
          300: 'rgb(183 190 203 / var(--tw-text-opacity))',
          400: 'rgb(140 148 162 / var(--tw-text-opacity))',
          500: 'rgb(98 105 117 / var(--tw-text-opacity))',
          600: 'rgb(63 69 79 / var(--tw-text-opacity))',
          700: 'rgb(40 44 52 / var(--tw-text-opacity))',
          800: 'rgb(27 30 37 / var(--tw-text-opacity))',
          900: 'rgb(21 24 31 / var(--tw-text-opacity))'
        },
        "neutral-03": {
          0: 'rgb(255 255 255 / var(--tw-text-opacity))',
          50: 'rgb(248 252 251 / var(--tw-text-opacity))',
          100: 'rgb(241 249 246 / var(--tw-text-opacity))',
          150: 'rgb(228 241 237 / var(--tw-text-opacity))',
          200: 'rgb(217 232 227 / var(--tw-text-opacity))',
          250: 'rgb(200 217 212 / var(--tw-text-opacity))',
          300: 'rgb(183 203 197 / var(--tw-text-opacity))',
          400: 'rgb(140 162 156 / var(--tw-text-opacity))',
          500: 'rgb(98 117 112 / var(--tw-text-opacity))',
          600: 'rgb(63 79 75 / var(--tw-text-opacity))',
          700: 'rgb(40 52 49 / var(--tw-text-opacity))',
          800: 'rgb(27 37 34 / var(--tw-text-opacity))',
          900: 'rgb(21 31 28 / var(--tw-text-opacity))'
        }
      }
		}
	},
}
