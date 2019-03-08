const fs = require('fs-extra')
const path = require('path')
const { watch } = require('chokidar')
const onExit = require('exit-hook')
const match = require('matched')
const spitball = require('spitball')

const render = require('./lib/render.js')

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
}) {
  require('./lib/env.js')({ env, alias })

  const tmp = path.join(__dirname, 'tmp')
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
          out: tmp,
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
        fs.removeSync(tmp)
        emit('done')
        return
      })
    },
    async watch (src, dest) {
      await this.render(src, dest)

      let compiler
      let watcher
      let renderers = new Map()

      function createCompiler () {
        const pages = match.sync(path.join(src, '*.js'))

        compiler = spitball(pages.map(page => ({
          in: page,
          out: tmp,
          env,
          alias,
          node: true
        }))).watch((e, stats) => {
          if (e) emit('error', e)

          if (!watcher) {
            watcher = watch([ tmp, src ], {
              ignored: [
                /chunk-(?:[a-z]|[0-9])+\.js$/,
                /\.map$/
              ],
              ignoreInitial: true
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

      onExit(() => {
        fs.removeSync(tmp)
      })

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
