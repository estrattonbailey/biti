const path = require('path')
const readdir = require('recursive-readdir')
const req = require('./require.js')

const log = require('./logger.js')('fab')

module.exports = function getRoutes (src, pages) {
  return new Promise(res => {
    if (pages) {
      let routes = []

      for (let file of pages) {
        const { mod, err } = req(file)

        if (err) {
          log.error(err.message)
          continue
        }

        if (!mod) continue

        routes.push({
          base: path.dirname(file.split(src)[1]),
          ...mod
        })
      }

      res(routes)
    } else {
      readdir(src, (e, files) => {
        let routes = []

        for (let file of files) {
          const { mod, err } = req(file)

          if (err) {
            log.error(err.message)
            continue
          }

          if (!mod) continue

          routes.push({
            base: path.dirname(file.split(src)[1]),
            ...mod
          })
        }

        res(routes)
      })
    }
  })
}
