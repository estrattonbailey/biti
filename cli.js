#!/usr/bin/env node

'use strict';

const fs = require('fs')
const path = require('path')
const program = require('commander')
const colors = require('colors')
const pkg = require('./package.json')
const dir = process.cwd()

program
  .version(pkg.version)
  .option('-c, --config [config]', 'Config file')
  .option('-o, --output [config]', 'Destination')
  .parse(process.argv)

const config = require(path.join(dir, program.config || './fab.config.js'))
const props = program.props ? require(path.join(dir, program.props)) : {}

require('babel-register')(config.babel)

const fab = require('./index.js')

fab.data(config.data || {})
fab.dest(config.output || program.output)
fab.pages(config.pages)

console.log(`fab - v${pkg.version}`.rainbow)

fab.renderPages()
