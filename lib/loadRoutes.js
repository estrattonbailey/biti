const path = require('path')
const merge = require('deepmerge')

module.exports = function loadRoutes (routes) {
  return routes
    .map(({ config }) => Promise.resolve(config ? config() : {}))
    .map(async (loader, i) => {
      const config = await loader
      const route = routes[i]

      return [
        route.__filename,
        [].concat(config)
          .map(conf => merge(route, conf))
          .filter(conf => conf.pathname && conf.view) // invalid routes
          .map(({ pathname, view, props, ...rest })=> {
            return {
              ...rest,
              view,
              props,
              pathname: path.join('/', pathname)
            }
          })
      ]
    })
}
