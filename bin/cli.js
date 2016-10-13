#!/usr/bin/env node

'use strict';

require('babel-register')({
  presets: [
    'es2015',
    'react'
  ]
})

const React = require('react')
const ReactDOMServer = require('react-dom/server')
const path = require('path')
const mkdirp = require('mkdirp')
const fs = require('fs')
const program = require('commander')
const fab = require('./fab.js')

const dir = process.cwd()

program
  .version('0.0.1')
  .option('-c, --config [config]', 'Config file')
  .option('-o, --output [config]', 'Destination')
  .parse(process.argv)

  let config = require(path.join(dir, program.config || './fab.config.js'))
const props = program.props ? require(path.join(dir, program.props)) : {}

config = config.default ? config.default : config

fab.dest(program.output)
fab.pages(config.pages)

fab.renderPages()
