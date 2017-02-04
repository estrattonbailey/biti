const chokidar = require('chokidar')
const store = require('./storage')

module.exports = dir => {
  console.log(store.getState().pages)
}
