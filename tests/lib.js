require('../lib/babel.js')()

const getRoutes = require('../lib/getRoutes.js')

async function test () {
  const routes = await getRoutes(
    '/Users/estrattonbailey/Sites/oss/fab/demo/pages',
    [
      '/Users/estrattonbailey/Sites/oss/fab/demo/pages/Home.js'
    ]
  )

  console.log(routes)
}

test()
