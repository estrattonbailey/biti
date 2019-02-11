const path = require('path')
const cwd = process.cwd()

module.exports = function babel (config = {}) {
  let { alias = {}, env = {} } = config

  for (let key in alias) {
    alias[key] = path.resolve(cwd, alias[key])
  }

  require('module-alias').addAliases({
    '@': cwd,
    ...alias
  })

  for (let key in env) {
    process.env[key] = env[key]
  }

  require('@babel/register')({
    plugins: [
      require.resolve('@babel/plugin-syntax-object-rest-spread'),
      require.resolve('@babel/plugin-proposal-class-properties'),
      require.resolve('fast-async')
    ],
    presets: [
      [require.resolve('@babel/preset-env'), {
        targets: {
          ie: '11'
        }
      }],
      require.resolve('@babel/preset-react')
    ]
  })
}
