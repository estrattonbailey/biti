/**
 * WIP
 */
const fs = require('fs-extra')
const path = require('path')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const getModule = require('which-module')
const watch = require('./lib/watch.js')
const log = require('./lib/logger.js')

require('@babel/register')({
  plugins: [
    require.resolve('@babel/plugin-syntax-object-rest-spread'),
    require.resolve('@babel/plugin-proposal-class-properties'),
    require.resolve('fast-async')
  ],
  presets: [
    [require.resolve('@babel/preset-env'), {
      targets: {
        ie: '11'
      }
    }],
    require.resolve('@babel/preset-react')
  ]
})

const state = {
  output: 'site/',
  pages: [],
  data: {},
  babel: {}
}

const render = page => {
  const view = page.view.default
  const data = Object.assign({}, state.data, page.data)
  const content = `
    <!DOCTYPE html>
    ${ReactDOMServer.renderToString(view(data))}
  `

  const file = path.join(process.cwd(), state.output, page.path, 'index.html')
  const dir = path.dirname(file)

  fs.mkdirp(dir, err => {
    if (err) return log('error', err)

    fs.writeFile(file, content, { flag: 'w' }, err => {
      if (err) return log('error', err)
      log(`rendering ${dir}`)
    })
  })
}

module.exports = {
  get state () {
    return state
  },
  out (o) {
    if (o) state.output = o
    return state.output
  },
  data (d) {
    if (d) state.data = Object.assign({}, state.data, d)
    return state.data
  },
  pages (p) {
    if (p) state.pages = state.pages.concat(p)
    state.pages = state.pages.map(page => {
      return Object.assign(page, {
        id: getModule(page.view).id
      })
    })
    return state.pages
  },
  watch (dir) {
    log('watching', dir)

    watch(dir, (changed, pages) => {
      delete require.cache[require.resolve(changed)]

      pages.map(page => {
        for (const p of this.state.pages) {
          if (p.id === page) {
            delete require.cache[require.resolve(page)]
            p.view = require(page)
            render(p)
          }
        }
      })
    })
  },
  render (p) {
    !!p ? (
      [].concat(p).map(render)
    ) : (
      state.pages.map(render)
    )
  }
}
