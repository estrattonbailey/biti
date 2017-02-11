#!/usr/bin/env node

'use strict';

const fs = require('fs')
const path = require('path')
const program = require('commander')
const colors = require('colors')
const chokidar = require('chokidar')
const unique = require('array-unique')
const { info } = require('./util')
const pkg = require('./package.json')
const dir = process.cwd()

program
  .version(pkg.version)
  .option('-c, --config [config]', 'config file')
  .option('-w, --watch [watch]', 'watched dir')
  .parse(process.argv)

const configPath = path.join(dir, program.config || './fab.config.js')
const config = require(configPath)

require('babel-register')(config.babel)

const fab = require('./index.js')

fab.config = config
fab.data(config.data || {})
fab.output(config.output)
fab.pages(config.pages)

info(`fab - v${pkg.version}`)

fab.render()

if (program.watch) {
  const watch = chokidar.watch(
    unique([
      ...fab.pages().map(p => path.dirname(p.template)),
      program.watch || null,
      configPath
    ])
  )

  watch.on('change', path => fab.render(fab.pages()))
}
