'use strict';

const fs = require('fs-extra')
const path = require('path')
const detective = require('detective-es6')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const colors = require('colors')
const dir = process.cwd()

const state = {
  output: 'site/',
  pages: [],
  data: {}
}

function addPages(pages) {
  state.pages = [
    ...state.pages, 
    ...pages
  ]
}

function write(loc, content) {
  const dir = path.dirname(loc)

  fs.mkdirp(dir, err => {
    if (err) return console.log(err.red)

    fs.writeFile(loc, content, err => {
      err ? (
        console.log('fab - error:'.red, err)
      ) : (
        console.log('fab - writing:'.green, loc)
      )
    })
  })
}

function render(p) {
  let route = path.join(state.output, p.route || '/')
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
  output: output => output ? state.output = output : state.output,
  data: data => data ? state.data = Object.assign({}, state.data, data) : state.data,
  pages: pages => pages ? addPages(pages) : state.pages,
  getState: () => state,
  render: () => state.pages.forEach(render),
}
