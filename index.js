const path = require('path')

const watch = require('./lib/watch.js')
const render = require('./lib/render.js')

const cwd = process.cwd()

module.exports = function biti ({
  env,
  alias,
  filter,
  wrap,
  html
}) {
  require('./lib/env.js')({ env, alias })

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
    render (src, dest) {
      return render(
        path.resolve(cwd, src),
        path.resolve(cwd, dest),
        null,
        { filter, wrap, html },
        emit
      ).then(() => emit('done'))
    },
    watch (src, dest) {
      watch(path.resolve(cwd, src))
        .on('change', pages => {
          render(
            path.resolve(cwd, src),
            path.resolve(cwd, dest),
            pages,
            { filter, wrap, html },
            emit
          )
        })
    }
  }
}
