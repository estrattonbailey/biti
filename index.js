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

  let quiet = false
  const tmp = path.join(cwd, '.biti')
  const events = {}

  function emit (ev, ...data) {
    if (quiet) return
    return (events[ev] || []).map(fn => fn(...data))
  }

  function on (ev, fn) {
    events[ev] = (events[ev] || []).concat(fn)
    return () => events[ev].slice(events[ev].indexOf(fn), 1)
  }

  function getCompiledFiles (stats) {
    return  stats
      .reduce((pages, stats) => {
        return pages.concat(
          stats.assets
            .filter(asset => !/\.map$/.test(asset.name))
            .map(asset => asset.name)
        )
      }, [])
      .map(page => path.join(tmp, page))
  }

  return {
    on,
    async render (src, dest) {
      return spitball({
        in: path.join(src, '*.js'),
        out: {
          path: tmp,
          libraryTarget: 'commonjs2'
        },
        env,
        alias,
        node: true
      })
        .build()
        .then(stats => {
          const pages = getCompiledFiles(stats)

          return render(
            tmp,
            abs(dest),
            pages,
            { filter, wrap, html },
            emit
          ).then(() => {
            fs.removeSync(tmp, e => {
              if (e) emit('error', e)
            })
            emit('done')
          })
        })
    },
    async watch (src, dest) {
      quiet = true

      onExit(() => {
        fs.removeSync(tmp)
      })

      await this.render(src, dest)

      quiet = false

      let compiler
      let restarting = false

      const watcher = watch(src, {
        ignoreInitial: true
      })
        .on('all', async (ev, page) => {
          if (!/unlink|add/.test(ev)) return

          restarting = true

          const filename = path.basename(page, '.js')
          const removed = ledger.removeFile(filename, { cwd: abs(dest) })

          fs.removeSync(path.join(tmp, filename + '.js'))
          fs.removeSync(path.join(tmp, filename + '.js.map'))

          emit('remove', removed)

          await compiler.close()

          restarting = false

          createCompiler()
        })

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

          if (restarting) return

          const pages = getCompiledFiles(stats)

          render(
            tmp,
            abs(dest),
            pages,
            { filter, wrap, html },
            emit
          )
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
