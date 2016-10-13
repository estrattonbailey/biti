'use strict';

require('babel-register')({
  presets: [
    'es2015',
    'react'
  ]
})

const React = require('react')
const ReactDOMServer = require('react-dom/server')
const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')

const dir = process.cwd()

const state = {
  dest: 'site/',
  pages: []
}

const write = (loc, content) => {
  mkdirp(path.dirname(loc))

  fs.writeFile(loc, content, (err) => {
    err ? console.log('error:', err) : console.log('writing:', loc)
  })
}

const render = p => {
  let content
  let route = path.join(state.dest, p.route || '/')
  let template = p.template 
  let loc = path.join(route, 'index.html')

  let locals = p.locals || {}

  if (!template) { return console.error('No component found at', loc) }

  if (template.default) { template = template.default }

  content = `<!DOCTYPE html>${ReactDOMServer.renderToStaticMarkup(
    React.createElement(template, locals)
  )}`

  write(loc, content)
}

const renderPages = () => state.pages.forEach(render)

const addPages = pages => state.pages = [...state.pages, ...(
  Array.isArray(pages) ? pages : [pages]
)]

module.exports = {
  dest: dest => state.dest = dest,
  pages: addPages,
  renderPages
}
