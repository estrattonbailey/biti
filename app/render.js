const path = require('path')
const fab = require('../bin/fab')
const config = require('./fab.config.js')

const dir = process.cwd()

fab.dest(config.dest ? path.join(dir, config.dest) : './site')
fab.pages(config.pages)

fab.renderPages()
