const path = require('path')

const watch = require('./lib/watch.js')
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
      console.log(cwd, src)
      return render(
        abs(src),
        abs(dest),
        null,
        { filter, wrap, html },
        emit
      ).then(() => emit('done'))
    },
    watch (src, dest) {
      console.log(abs(src))
      watch(abs(src))
        .on('change', pages => {
          render(
            abs(src),
            abs(dest),
            pages,
            { filter, wrap, html },
            emit
          )
        })
    }
  }
}
