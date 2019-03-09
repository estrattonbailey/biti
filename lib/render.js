const React = require('react')
const fs = require('fs-extra')
const path = require('path')
const { renderToString } = require('react-dom/server')
const getRoutes = require('./getRoutes.js')
const loadRoutes = require('./loadRoutes.js')
const defaulthtml = require('./html.js')
const ledger = require('./fileLedger.js')

/**
 * accepts a `src` directory or array of `pages`
 *
 * if pages is undefined, assumes directory, and vice versa
 *
 * loadRoutes wraps all routes and initiates their loaders,
 * so this file simply needs to wait for those to finish,
 * and render the routes when they're ready to go
 */
module.exports = async function render (
  src,
  dest,
  pages,
  {
    filter = routes => routes,
    wrap,
    html = defaulthtml
  },
  emit
) {
  const routes = await getRoutes(src, pages).then(filter)

  return Promise.all(
    loadRoutes(routes).map(async resolver => {
      const [ filename, routes ] = await resolver

      let currentpaths = []

      for (let { pathname, props, view, ...rest } of routes) {
        const dir = path.join(dest, pathname)

        currentpaths.push(dir)

        try {
          const content = renderToString(
            wrap ? (
              React.createElement(wrap.default || wrap, props, view(props))
            ) : view(props)
          )

          await fs.outputFile(
            path.join(dir, 'index.html'),
            html({
              ...rest,
              state: props,
              view: content
            }),
            e => {
              if (e) {
                emit('error', e)
              }
            }
          )

          emit('render', dir.split(dest)[1] || '/')
        } catch (e) {
          emit('error', e)
        }
      }

      /**
       * delete old files
       */
      const previouspaths = ledger[filename]

      if (previouspaths) {
        let deleted = []

        for (const prev of previouspaths) {
          if (currentpaths.indexOf(prev) > -1) continue
          deleted.push(prev)
        }

        for (const file of deleted) {
          fs.removeSync(file)
        }
      }

      ledger[filename] = currentpaths
    })
  )
}
