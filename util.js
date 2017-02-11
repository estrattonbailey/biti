const colors = require('colors')

module.exports = {
  error: msg => console.log(`fab error:`.red, msg),
  log: msg => console.log(`fab:`.green, msg),
  info: msg => console.log(msg.rainbow)
}
