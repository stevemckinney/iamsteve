const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './app/**/*.js',
    './components/**/*.js',
    './layouts/**/*.js',
    './lib/**/*.js',
    './content/**/*.md',
  ],
  darkMode: 'class',
  theme: {
    borderRadius: {
      none: '0',
      xs: '.25rem',
      sm: '.5rem',
      DEFAULT: '1rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      full: '999rem',
    },
    fontSize: {
      '7xl': [
        '5.5rem',
        { lineHeight: '.81818', letterSpacing: '-.03409090909em' },
      ],
      '6xl': ['4rem', { lineHeight: '.875', letterSpacing: '-.03125em' }],
      '5xl': ['3rem', { lineHeight: '.9166667', letterSpacing: '-.03125em' }],
      '4xl': ['2.5rem', { lineHeight: '.9', letterSpacing: '-.0125em' }],
      '3xl': ['2rem', { lineHeight: '1', letterSpacing: '-.015625em' }],
      '2xl': ['1.5rem', { lineHeight: '1.5' }],
      xl: ['1.3125rem', { lineHeight: '1.5' }],
      lg: ['1.125rem', { lineHeight: '1.5' }],
      base: ['1rem', { lineHeight: '1.5' }],
      sm: ['.875rem', { lineHeight: '1.5' }],
      xs: ['.75rem', { lineHeight: '1.5' }],
      '2xs': ['.625rem', { lineHeight: '1.5' }],
    },
    extend: {
      // strokeWidth: {
      //   4: '4px',
      // },
      screens: {
        xs: '360px',
      },
      gridTemplateColumns: {
        16: 'repeat(16, minmax(0, 1fr))',
        subgrid: 'subgrid',
      },
      gridColumn: {
        content: 'content-start / content-end',
        prose: 'prose-start / prose-end',
        margin: 'margin-start / margin-end',
      },
      gridColumnStart: {
        'margin-start': 'margin-start',
        'margin-end': 'margin-end',
        'container-start': 'container-start',
        'container-end': 'container-end',
        'content-start': 'content-start',
        'content-end': 'content-end',
        'prose-start': 'prose-start',
        'prose-end': 'prose-end',
      },
      gridColumnEnd: {
        'margin-start': 'margin-start',
        'margin-end': 'margin-end',
        'container-start': 'container-start',
        'container-end': 'container-end',
        'content-start': 'content-start',
        'content-end': 'content-end',
        'prose-start': 'prose-start',
        'prose-end': 'prose-end',
      },
      lineHeight: {
        '7xl': '.81818',
        '6xl': '.875',
        '5xl': '.9166667',
        '4xl': '1.1',
        '3xl': '1.125',
        '2xl': '1.166667',
        xl: '1.2380952381',
        lg: '1.333333',
      },
      spacing: {
        18: '4.5rem',
      },
      fontFamily: {
        //sans: ['gira-sans', 'sans-serif', ...defaultTheme.fontFamily.sans],
        sans: [['elza', 'sans-serif', ...defaultTheme.fontFamily.sans]],
        display: [
          [
            'roc-grotesk-variable',
            'sans-serif',
            ...defaultTheme.fontFamily.sans,
          ],
        ],
        ui: [
          [
            'roc-grotesk-variable',
            'sans-serif',
            ...defaultTheme.fontFamily.sans,
          ],
          {
            fontVariationSettings: '"wdth" 100, "wght" 500',
            textTransform: 'lowercase',
          },
        ],
        mono: [
          ['covik-sans-mono', ...defaultTheme.fontFamily.mono],
          {
            fontVariantNumeric: 'lining-nums proportional-nums',
            fontVariationSettings: '"salt" on',
          },
        ],
      },
      boxShadow: {
        reduced: 'var(--shadow-reduced)',
        placed: 'var(--shadow-placed)',
        picked: 'var(--shadow-picked)',
        floating: 'var(--shadow-floating)',
        'dandelion-reduced':
          '0 -1px var(--ui-border-color-strong), 0 0 0 1px var(--ui-border-color), 0 2px 4px -4px rgba(117, 99, 98, 0.10), 0 1px 3px rgba(117, 99, 98, 0.12)',
        'dandelion-placed':
          '0 -1px var(--ui-border-color-weak), 0 1px var(--ui-border-color-strong), 0 0 0 1px var(--ui-border-color), inset 0 2px rgb(249 239 189 / .2), inset 0 -3px rgba(203 113 0 / .2), 0 4px 10px rgba(117, 99, 98, 0.10), 0 1px 3px 0 rgba(117, 99, 98, 0.10)',
        'dandelion-picked':
          '0 -1px var(--ui-border-color-weak-hover), 0 1px var(--ui-border-color-strong-hover), 0 0 0 1px var(--ui-border-color-hover), inset 0 2px rgb(249 239 189 / .2), inset 0 -3px rgba(203 113 0 / .2), 0 6px 12px rgba(117, 99, 98, 0.14), 0 2px 4px rgba(117, 99, 98, 0.16)',
      },
      backgroundImage: {
        fade: 'linear-gradient(180deg, rgba(var(--bg-fade-top), 1) 0%, rgba(var(--bg-fade-top), 0.6) 4.09%, rgba(var(--bg-fade-top),0) 11.11%, rgba(var(--bg-fade-top), 0) 25.52%), radial-gradient(163.02% 100% at 50% 0%, rgba(255, 255, 255, 0) 78.71%, #FFFFFF 100%)',
        'fade-neutral':
          'radial-gradient(95.19% 153.13% at 50% 0%, rgba(252, 249, 248, 0.07) 56.58%, #FCF9F8 80.19%), linear-gradient(180deg, rgba(252, 249, 248, 0.00) 69.27%, rgba(252, 249, 248, 0.01) 72.89%, rgba(252, 249, 248, 0.03) 75.84%, rgba(252, 249, 248, 0.07) 78.22%, rgba(252, 249, 248, 0.12) 80.13%, rgba(252, 249, 248, 0.18) 81.68%, rgba(252, 249, 248, 0.25) 82.96%, rgba(252, 249, 248, 0.33) 84.1%, rgba(252, 249, 248, 0.41) 85.18%, rgba(252, 249, 248, 0.50) 86.31%, rgba(252, 249, 248, 0.59) 87.59%, rgba(252, 249, 248, 0.67) 89.14%, rgba(252, 249, 248, 0.76) 91.05%, rgba(252, 249, 248, 0.85) 93.43%, rgba(252, 249, 248, 0.93) 96.38%, #FCF9F8 100%)',
        'fade-sm':
          'radial-gradient(88.62% 56.87% at 50% 43.12%, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.07) 0.75%, rgba(255, 255, 255, 0.07) 2.92%, rgba(255, 255, 255, 0.08) 6.37%, rgba(255, 255, 255, 0.09) 10.97%, rgba(255, 255, 255, 0.10) 16.59%, rgba(255, 255, 255, 0.13) 23.1%, rgba(255, 255, 255, 0.16) 30.37%, rgba(255, 255, 255, 0.21) 38.27%, rgba(255, 255, 255, 0.27) 46.66%, rgba(255, 255, 255, 0.35) 55.41%, rgba(255, 255, 255, 0.44) 64.39%, rgba(255, 255, 255, 0.55) 73.47%, rgba(255, 255, 255, 0.68) 82.52%, rgba(255, 255, 255, 0.83) 91.41%, #FFF 96.89%)',
        'fade-neutral-sm':
          'radial-gradient(88.62% 56.87% at 50% 43.12%, rgba(252, 249, 248, 0.07) 0%, rgba(252, 249, 248, 0.07) 0.75%, rgba(252, 249, 248, 0.07) 2.92%, rgba(252, 249, 248, 0.08) 6.37%, rgba(252, 249, 248, 0.09) 10.97%, rgba(252, 249, 248, 0.10) 16.59%, rgba(252, 249, 248, 0.13) 23.1%, rgba(252, 249, 248, 0.16) 30.37%, rgba(252, 249, 248, 0.21) 38.27%, rgba(252, 249, 248, 0.27) 46.66%, rgba(252, 249, 248, 0.35) 55.41%, rgba(252, 249, 248, 0.44) 64.39%, rgba(252, 249, 248, 0.55) 73.47%, rgba(252, 249, 248, 0.68) 82.52%, rgba(252, 249, 248, 0.83) 91.41%, rgb(252, 249, 248) 96.89%)',
      },
      colors: {
        ui: {
          normal: 'rgba(79, 64, 63, 0.16)',
          raised: 'rgba(79, 64, 63, 0.24)',
          body: 'rgb(9 46 36 / .7)',
        },
        rio: {
          0: 'rgb(250 239 232)',
          50: 'rgb(249 217 197)',
          100: 'rgb(247 193 163)',
          150: 'rgb(246 172 135)',
          200: 'rgb(244 150 107)',
          300: 'rgb(238 114 68)',
          400: 'rgb(229 84 43)',
          500: 'rgb(214 60 26)',
          600: 'rgb(190 39 15)',
          700: 'rgb(156 22 9)',
          800: 'rgb(112 10 5)',
          900: 'rgb(61 2 2)',
        },
        dandelion: {
          0: 'rgb(250 248 236)',
          50: 'rgb(249 239 189)',
          100: 'rgb(248 229 142)',
          200: 'rgb(244 211 64)',
          300: 'rgb(239 190 8)',
          400: 'rgb(232 170 0)',
          500: 'rgb(221 142 0)',
          600: 'rgb(203 113 0)',
          700: 'rgb(177 90 0)',
          800: 'rgb(141 68 0)',
          900: 'rgb(97 46 0)',
          1000: 'rgb(48 23 0)',
        },
        fern: {
          0: 'rgb(235 250 245)',
          100: 'rgb(202 231 222)',
          200: 'rgb(171 213 200)',
          300: 'rgb(143 194 179)',
          400: 'rgb(118 176 159)',
          500: 'rgb(95 157 139)',
          600: 'rgb(74 139 121)',
          700: 'rgb(56 120 103)',
          800: 'rgb(41 102 85)',
          900: 'rgb(28 83 68)',
          1000: 'rgb(17 64 52)',
          1100: 'rgb(9 46 36)',
        },
        cornflour: {
          0: 'rgb(235 242 250)',
          100: 'rgb(203 223 248)',
          200: 'rgb(172 203 246)',
          300: 'rgb(143 182 242)',
          400: 'rgb(118 163 237)',
          500: 'rgb(97 144 229)',
          600: 'rgb(79 127 218)',
          700: 'rgb(64 109 200)',
          800: 'rgb(48 90 175)',
          900: 'rgb(34 70 142)',
          1000: 'rgb(22 49 103)',
          1100: 'rgb(12 29 61)',
        },
        grass: {
          0: 'rgb(249 250 235)',
          50: 'rgb(232 238 190)',
          100: 'rgb(212 227 148)',
          150: 'rgb(190 215 116)',
          200: 'rgb(167 204 86)',
          300: 'rgb(126 181 47)',
          400: 'rgb(92 158 25)',
          500: 'rgb(66 135 12)',
          600: 'rgb(47 112 5)',
          700: 'rgb(34 89 2)',
          800: 'rgb(23 66 0)',
          900: 'rgb(14 43 0)',
        },
        moss: {
          0: 'rgb(242 250 235)',
          50: 'rgb(218 239 205)',
          100: 'rgb(192 227 176)',
          150: 'rgb(168 216 153)',
          200: 'rgb(144 205 131)',
          300: 'rgb(104 182 100)',
          400: 'rgb(78 159 83)',
          500: 'rgb(61 137 72)',
          600: 'rgb(48 114 61)',
          700: 'rgb(37 91 50)',
          800: 'rgb(28 69 38)',
          900: 'rgb(18 46 26)',
        },
        lavender: {
          0: 'rgb(243 238 250)',
          100: 'rgb(225 211 248)',
          200: 'rgb(205 185 245)',
          300: 'rgb(183 160 242)',
          400: 'rgb(161 138 236)',
          500: 'rgb(142 119 228)',
          600: 'rgb(124 102 216)',
          700: 'rgb(100 86 198)',
          800: 'rgb(76 70 173)',
          900: 'rgb(55 54 141)',
          1000: 'rgb(38 41 103)',
          1100: 'rgb(22 25 61)',
        },
        magenta: {
          0: 'rgb(250 238 243)',
          50: 'rgb(248 219 235)',
          100: 'rgb(247 201 230)',
          150: 'rgb(245 183 228)',
          200: 'rgb(243 166 228)',
          300: 'rgb(235 136 231)',
          400: 'rgb(214 110 222)',
          500: 'rgb(183 88 201)',
          600: 'rgb(144 66 166)',
          700: 'rgb(99 44 118)',
          750: 'rgb(75 33 89)',
          800: 'rgb(51 22 61)',
        },
        'neutral-01': {
          0: 'rgb(255 255 255)',
          50: 'rgb(252 249 248)',
          100: 'rgb(249 243 241)',
          150: 'rgb(241 232 228)',
          200: 'rgb(232 220 217)',
          250: 'rgb(217 203 200)',
          300: 'rgb(203 186 183)',
          400: 'rgb(162 143 140)',
          500: 'rgb(117 99 98)',
          600: 'rgb(79 64 63)',
          700: 'rgb(52 40 40)',
          800: 'rgb(37 27 27)',
          900: 'rgb(31 21 21)',
        },
        'neutral-02': {
          0: 'rgb(255 255 255)',
          50: 'rgb(248 250 252)',
          100: 'rgb(241 244 249)',
          150: 'rgb(228 234 241)',
          200: 'rgb(217 223 232)',
          250: 'rgb(200 207 217)',
          300: 'rgb(183 190 203)',
          400: 'rgb(140 148 162)',
          500: 'rgb(98 105 117)',
          600: 'rgb(63 69 79)',
          700: 'rgb(40 44 52)',
          800: 'rgb(27 30 37)',
          900: 'rgb(21 24 31)',
        },
        'neutral-03': {
          0: 'rgb(255 255 255)',
          50: 'rgb(248 252 251)',
          100: 'rgb(241 249 246)',
          150: 'rgb(228 241 237)',
          200: 'rgb(217 232 227)',
          250: 'rgb(200 217 212)',
          300: 'rgb(183 203 197)',
          400: 'rgb(140 162 156)',
          500: 'rgb(98 117 112)',
          600: 'rgb(63 79 75)',
          700: 'rgb(40 52 49)',
          800: 'rgb(27 37 34)',
          900: 'rgb(21 31 28)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/container-queries')],
}
