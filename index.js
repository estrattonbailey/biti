const fs = require('fs-extra')
const path = require('path')
const { watch } = require('chokidar')
const onExit = require('exit-hook')
const match = require('matched')
const spitball = require('spitball')

const render = require('./lib/render.js')
const ledger = require('./lib/fileLedger.js')

const cwd = process.cwd()

function abs (p) {
  return path.join(cwd, p.replace(cwd, ''))
}

module.exports = function biti ({
  env,
  alias,
  filter,
  wrap,
  html
} = {}) {
  require('./lib/env.js')({ env, alias })

  const tmp = path.join(__dirname, '__tmp')
  const events = {}

  function emit (ev, data) {
    return (events[ev] || []).map(fn => fn(data))
  }

  function on (ev, fn) {
    events[ev] = events[ev] ? events[ev].concat(fn) : [ fn ]
    return () => events[ev].slice(events[ev].indexOf(fn), 1)
  }

  return {
    on,
    async render (src, dest) {
      try {
        await spitball({
          in: path.join(src, '*.js'),
          out: {
            path: tmp,
            libraryTarget: 'commonjs2'
          },
          env,
          alias,
          node: true
        }).build()
      } catch (e) {
        emit('error', e)
      }

      return render(
        tmp,
        abs(dest),
        null,
        { filter, wrap, html },
        emit
      ).then(() => {
        fs.removeSync(tmp, e => {
          if (e) emit('error', e)
        })
        emit('done')
        return
      })
    },
    async watch (src, dest) {
      onExit(() => {
        fs.removeSync(tmp)
      })

      await this.render(src, dest)

      let compiler
      let watcher
      let renderers = new Map()

      function createCompiler () {
        const pages = match.sync(abs(`${src}/*.js`))

        compiler = spitball(pages.map(page => ({
          in: page,
          out: {
            path: tmp,
            libraryTarget: 'commonjs2'
          },
          env,
          alias,
          node: true
        }))).watch((e, stats) => {
          if (e) emit('error', e)

          if (!watcher) {
            /**
             * we're watching both dest and src dirs here
             * need to filter results below
             */
            watcher = watch([ tmp, src ], {
              ignored: [
                /chunk-(?:[a-z]|[0-9])+\.js$/,
                /\.map$/
              ],
              ignoreInitial: true
            })
              .on('unlink', page => {
                // ignore deletions from dest
                if (page.indexOf(src) < 0) return

                const filename = path.basename(page, '.js')
                const pages = ledger[filename]

                if (pages && pages.length) {
                  pages.map(file => fs.removeSync(file))
                }
              })
              .on('add', async page => {
                // only add pages added to src
                if (page.indexOf(src) < 0) return

                emit('add', page)

                await compiler.close()
                createCompiler()
              })
              .on('change', page => {
                // don't render un-compiled pages
                if (page.indexOf(tmp) < 0) return

                if (renderers.has(page)) return

                renderers.set(page, (function (p) {
                  render(
                    tmp,
                    abs(dest),
                    [ p ],
                    { filter, wrap, html },
                    emit
                  ).then(() => {
                    renderers.delete(p)
                  })
                })(page))
              })
          }
        })
      }

      createCompiler()

      return {
        async close () {
          watcher.close()
          await compiler.close()
        }
      }
    }
  }
}
