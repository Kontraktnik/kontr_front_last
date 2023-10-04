module.exports = {
  mode:"jit",
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" // add this line
  ],
  purge: [
    './src/**/*.{html,ts}', './projects/**/*.{html,ts}'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tw-elements/dist/plugin.js'),
    require('flowbite/plugin')
  ],
}
