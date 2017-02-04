'use strict';

const fs = require('fs')
const path = require('path')
const detective = require('detective-es6')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const mkdirp = require('mkdirp')
const dir = process.cwd()

const state = {
  dest: 'site/',
  pages: [],
  data: {}
}

const getComponentDeps = pages => pages.map(p => {
  const content = fs.readFileSync(p.template, 'utf8')
  const components = detective(content).filter(c => {
    return /\.|\//.test(c)
  })
  return p.components = components
})

const addPages = pages => state.pages = [
  ...state.pages, 
  ...pages
]

function write(loc, content) {
  mkdirp(path.dirname(loc))

  fs.writeFile(loc, content, (err) => {
    err ? console.log('error:', err) : console.log('writing:', loc)
  })
}

function render(p) {
  let route = path.join(state.dest, p.route || '/')
  let template = require(path.join(dir, p.template))
  let loc = path.join(route, 'index.html')

  let props = Object.assign({}, state.data, {
    locals: p.locals || {}
  })

  if (!template) { return console.error('No component found at', loc) }

  template = template.default || template

  const content = `<!DOCTYPE html>${ReactDOMServer.renderToStaticMarkup(
    React.createElement(template, props)
  )}`

  write(loc, content)
}

module.exports = {
  dest: dest => dest ? state.dest = dest : state.dest,
  data: data => data ? state.data = Object.assign({}, state.data, data) : state.data,
  pages: pages => pages ? addPages(pages) : state.pages,
  getState: () => state,
  renderPages: function() {
    state.pages.forEach(render)
  },
}
