const path = require('path')
const merge = require('deepmerge')

module.exports = function loadRoutes (routes) {
  return routes
    .map(({ config }) => Promise.resolve(config ? config() : {}))
    .map(async (loader, i) => {
      const config = await loader

      return [].concat(config)
        .map(conf => merge(routes[i], conf))
        .map(({ pathname, view, props, ...rest })=> {
          return {
            ...rest,
            view,
            props,
            pathname: path.join('/', pathname)
          }
        })
    })
}
