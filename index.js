const path = require('path')

const watch = require('./lib/watch.js')
const render = require('./lib/render.js')

const cwd = process.cwd()

module.exports = function biti (config) {
  require('./lib/env.js')(config)

  return {
    render (src, dest, cb) {
      return render(
        path.join(cwd, src),
        path.join(cwd, dest),
        null,
        cb
      )
    },
    watch (src, dest, cb) {
      const _src = path.join(cwd, src)
      const _dest = path.join(cwd, dest)

      watch(_src)
        .on('change', pages => {
          render(_src, _dest, pages, cb)
        })
    }
  }
}
