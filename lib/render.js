const React = require('react')
const fs = require('fs-extra')
const path = require('path')
const { renderToString } = require('react-dom/server')
const getRoutes = require('./getRoutes.js')
const loadRoutes = require('./loadRoutes.js')
const defaulthtml = require('./html.js')

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
    filter,
    wrap,
    html = defaulthtml
  },
  emit
) {
  const routes = await getRoutes(src, pages).then(filter)

  return Promise.all(
    loadRoutes(routes).map(async resolver => {
      const routes = await resolver

      for (let { pathname, props, view, ...rest } of routes) {
        const dir = path.join(dest, pathname)

        try {
          const content = renderToString(
            wrap ? (
              React.createElement(wrap, props, view(props))
            ) : view(props)
          )

          await fs.outputFile(
            path.join(dir, 'index.html'),
            html({
              ...rest,
              state: props,
              content
            }),
            e => {
              if (e) {
                emit('error', e)
              }
            }
          )

          const pathname = dir.split(dest)[1]

          emit('render', pathname || '/')
        } catch (e) {
          emit('error', e)
        }
      }
    })
  )
}
