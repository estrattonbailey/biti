const path = require('path')
const readdir = require('recursive-readdir')
const req = require('./require.js')

module.exports = function getRoutes (src, pages) {
  return new Promise(res => {
    if (pages) {
      let routes = []

      for (let file of pages) {
        /** 
         * if pages are passed, we're watching for changes
         * so we need to clear the previous cache
         */
        delete require.cache[file]

        const { mod, err } = req(file)

        if (err) {
          console.error(err)
          continue
        }

        if (!mod) continue

        routes.push(mod)
      }

      res(routes)
    } else {
      readdir(src, (e, files) => {
        if (e) {
          throw e
        }

        let routes = []

        for (let file of files) {
          if (/chunk|\.map$/.test(file)) continue

          const { mod, err } = req(file)

          if (err) {
            console.error(err)
            continue
          }

          if (!mod) continue

          routes.push(mod)
        }

        res(routes)
      })
    }
  })
}
