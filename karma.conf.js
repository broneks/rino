'use strict'

const webpack = require('webpack')
const webpackConfig = require('./webpack.conf')

module.exports = (config) => {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'spec/**/*.client.spec.js'
    ],
    preprocessors: {
      'spec/**/*.client.spec.js': ['webpack']
    },
    webpack: {
      module: webpackConfig.module,
      plugins: [
        new webpack.DefinePlugin({
          io: () => {}
        })
      ],
      devtool: 'inline-source-maps'
    },
    webpackMiddleware: {
      noInfo: true
    },
    autoWatch: false,
    reporters: ['progress'],
    browsers: ['Chrome'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    singleRun: false,
    concurrency: Infinity
  })
}
