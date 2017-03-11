'use strict';

const fs = require('fs-extra')
const path = require('path')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const { log, error } = require('./util.js')

require('babel-register')({
  presets: [
    'es2015',
    'react',
  ]
})

const state = {
  config: {},
  output: 'site/',
  pages: [],
  data: {},
  babel: {}
}

const resolvePage = page => Object.assign(page, {
  template: path.join(process.cwd(), page.template),
  route: path.join(state.output, page.route || '/')
})

const addPages = pages => {
  if (Array.isArray(pages)) {
    state.pages = state.pages.concat(pages.map(resolvePage))
  } else {
    state.pages.push(resolvePage(pages))
  }
}

const write = (loc, content) => {
  const dir = path.dirname(loc)

  fs.mkdirp(dir, err => {
    if (err) return error(err)

    fs.writeFile(loc, content, { flag: 'w' }, err => {
      if (err) return error(err)
      log(`writing ${loc}`)
    })
  })
}

const render = page => {
  let template = require(page.template)
  let loc = path.join(page.route, 'index.html')

  let props = Object.assign({}, state.data, {
    locals: page.locals || {}
  })

  template = template.default || template

  const content = `<!DOCTYPE html>${ReactDOMServer.renderToStaticMarkup(React.createElement(template, props))}`

  write(loc, content)
}

module.exports = {
  config: c => c ? state.config = c : state.config,
  getState: () => state,
  output: output => output ? state.output = output : state.output,
  data: data => data ? state.data = Object.assign({}, state.data, data) : state.data,
  pages: pages => pages ? addPages(pages) : state.pages,
  render: pages => {
    pages ? (
      Array.isArray(pages) ? (
        pages.forEach(render)
      ) : (
        render(pages)
      )
    ) : (
      state.pages.forEach(render)
    )
  },
}
