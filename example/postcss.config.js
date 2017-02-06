const path = require('path')
const postcss = require('postcss')

const shared = [
  'postcss-import',
  'precss',
  'postcss-custom-properties',
  'postcss-calc',
  'postcss-discard-comments',
  'autoprefixer',
  'postcss-reporter',
]
const plugins = process.env.NODE_ENV !== 'production' ? [
  ...shared,
  'postcss-prettify',
] : [
  ...shared,
  'cssnano',
]

module.exports = {
  use: plugins,
  "postcss-import": {
    onImport: function(sources) {
      global.watchCSS(sources, this.from);
    },
    path: 'src/styles',
  },
  input: path.join(__dirname, 'src/styles/main.css'),
  output: path.join(__dirname, 'public/main.css'),
}
