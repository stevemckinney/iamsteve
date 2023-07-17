const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './app/**/*.js',
    './components/**/*.js',
    './layouts/**/*.js',
    './lib/**/*.js'
  ],
  darkMode: 'class',
  theme: {},
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}
