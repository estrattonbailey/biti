const fs = require('fs-extra')
const path = require('path')
const { renderToString } = require('react-dom/server')
const getRoutes = require('./getRoutes.js')
const loadRoutes = require('./loadRoutes.js')

/**
 * accepts a `src` directory or array of `pages`
 *
 * if pages is undefined, assumes directory, and vice versa
 *
 * loadRoutes wraps all routes and initiates their loaders,
 * so this file simply needs to wait for those to finish,
 * and render the routes when they're ready to go
 */
module.exports = async function render (src, dest, pages, cb) {
  const routes = await getRoutes(src, pages)

  return Promise.all(
    loadRoutes(routes).map(async resolver => {
      const routes = await resolver

      for (let { pathname, props, view } of routes) {
        const dir = path.join(dest, pathname)

        try {
          const content = renderToString(view(props))

          await fs.outputFile(
            path.join(dir, 'index.html'),
            content,
            e => {
              if (e) {
                cb && cb(e)
              }
            }
          )

          const pathname = dir.split(dest)[1]

          cb && cb(null, pathname || '/')
        } catch (e) {
          cb && cb(e)
        }
      }
    })
  )
}
