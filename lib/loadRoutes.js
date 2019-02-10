const path = require('path')
const merge = require('merge-deep')

module.exports = function loadRoutes (routes) {
  return routes
    .map(({ load }) => Promise.resolve(load ? load() : {}))
    .map(async (loader, i) => {
      const config = await loader

      return [].concat(config)
        .map(conf => merge(routes[i], conf))
        .map(({ base, pathname, view, load, state })=> {
          return {
            load,
            view,
            state,
            pathname: path.join(base, pathname)
          }
        })
    })
}
