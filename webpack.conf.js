'use strict'

const config = require('./config.json')
const webpack = require('webpack')

module.exports = {
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  output: {
    filename: 'main.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      ENV: config
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  devtool: 'inline-source-maps'
}
