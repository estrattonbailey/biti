require('babel-register')({
  presets: [
    'es2015',
    'react'
  ]
})

const { default: fab } = require('../bin/fab')
const { default: config } = require('./fab.config.js')

fab.dest('./site')
fab.pages(config.pages)

fab.renderPages()
