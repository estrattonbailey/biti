#!/usr/bin/env node
'use strict';

const fs = require('fs-extra')
const path = require('path')
const write = require('log-update')
const exit = require('exit')
const pkg = require('./package.json')
const req = require('./lib/require.js')

const cwd = process.cwd()

const prog = require('commander')
  .version(pkg.version)
  .option('-c, --config <config>', 'path to config file, default: biti.config.js')
  .parse(process.argv)

const configfile = path.resolve(cwd, (prog.config || './biti.config.js'))
const config = fs.existsSync(configfile) ? require(configfile) : {}

const biti = require('./index.js')

const log = require('./lib/logger.js')('biti')

prog
  .command('render <src> <dest>')
  .action((src, dest) => {
    src = path.resolve(cwd, src)
    dest = path.resolve(cwd, dest)

    let time = Date.now()

    log.info('rendering')

    const app = biti(config)

    app.on('render', p => log.info(`rendered`, p))
    app.on('error', e => log.error(e.message || e))
    app.on('done', e => {
      log.info(`render`, `complete in ${((Date.now() - time) / 1000).toFixed(2)}s`)
    })

    app.render(src, dest)
  })

prog
  .command('watch <src> <dest>')
  .action(async (src, dest) => {
    src = path.resolve(cwd, src)
    dest = path.resolve(cwd, dest)

    const app = biti(config)

    app.on('render', p => log.info(`rendered`, p))
    app.on('error', e => log.error(e.message || e))

    await app.render(src, dest)

    log.info(log.colors.green('watching'), src.replace(cwd, ''))

    app.watch(src, dest)
  })

if (!process.argv.slice(2).length) {
  prog.outputHelp(txt => {
    console.log(txt)
    exit()
  })
} else {
  prog.parse(process.argv)
}
