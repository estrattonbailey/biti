'use strict';

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import path from 'path'
import mkdirp from 'mkdirp'
import fs from 'fs'

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
  let route = path.join(state.dest, p.path || '/')
  let template = p.template 
  let loc = path.join(state.dest, 'index.html')

  let locals = p.locals || {}

  if (!template) { return console.error('No component found at', loc) }

  if (template.default) { template = template.default }

  content = `<!DOCTYPE html>${ReactDOMServer.renderToStaticMarkup(
    React.createElement(template, locals)
  )}`

  write(loc, content)
}

export const renderPages = () => state.pages.forEach(render)

export default {
  pages: pages => state.pages = [state.pages, ...pages],
  dest: dest => state.dest = dest
}

module.exports = exports

