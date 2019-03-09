const path = require('path')
const readdir = require('recursive-readdir')
const req = require('./require.js')

module.exports = async function getRoutes (src, pages) {
  const files = pages || await readdir(src)

  let routes = []

  for (let file of files) {
    if (/chunk|\.map$/.test(file)) continue

    /** 
     * if pages are passed, we're watching for changes
     * so we need to clear the previous cache
     */
    if (require.cache[file]) {
      delete require.cache[file]
    }

    const { mod, err } = req(file)

    if (err) continue
    if (!mod) continue

    mod.__filename = path.basename(file, '.js')

    routes.push(mod)
  }

  return routes
}
