#!/usr/bin/env node
'use strict';

const fs = require('fs')
const path = require('path')
const write = require('log-update')
const exit = require('exit')
const pkg = require('./package.json')
const req = require('./lib/require.js')

const cwd = process.cwd()

const prog = require('commander')
  .version(pkg.version)
  .option('-c, --config <config>', 'path to config file, default: fab.config.js')
  .parse(process.argv)

const { mod: config } = req(
  path.resolve(cwd, (prog.config || './fab.config.js'))
)

require('./lib/env.js')(config)

const watch = require('./lib/watch.js')
const render = require('./lib/render.js')

const log = require('./lib/logger.js')('fab')

prog
  .command('build <src> <dest>')
  .action((src, dest) => {
    log.info('building', `${src} to ${dest}`)

    render(
      path.join(cwd, src),
      path.join(cwd, dest)
    )
  })

prog
  .command('watch <src> <dest>')
  .action(async (src, dest) => {
    const _src = path.join(cwd, src)
    const _dest = path.join(cwd, dest)

    // initial render
    await render(_src, _dest)

    log.info('watching', src)

    watch(_src)
      .on('change', pages => {
        render(_src, _dest, pages)
      })
  })

if (!process.argv.slice(2).length) {
  prog.outputHelp(txt => {
    console.log(txt)
    exit()
  })
} else {
  prog.parse(process.argv)
}
