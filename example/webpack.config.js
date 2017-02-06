const path = require('path')
const webpack = require('webpack')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: path.join(__dirname, '/src/js/index.js'),
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'app'),
        loaders: ['babel-loader', 'eslint-loader']
      },
    ]
  },
  plugins: [
    new LodashModuleReplacementPlugin,
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],
  performance: {
    maxAssetSize: 400000,
    hints: false,
  },
}
