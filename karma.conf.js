'use strict'

const webpack = require('webpack')
const webpackConfig = require('./webpack.conf')

const mock = {
  io: function () {}
}

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'spec/support/tests.webpack.js'
    ],
    preprocessors: {
      'spec/support/tests.webpack.js': ['webpack']
    },
    webpack: {
      module: webpackConfig.module,
      plugins: [
        new webpack.DefinePlugin({
          io: mock.io
        })
      ],
      devtool: 'inline-source-map'
    },
    webpackMiddleware: {
      noInfo: true
    },
    autoWatch: true,
    reporters: ['progress'],
    browsers: ['PhantomJS'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    singleRun: false,
    concurrency: Infinity
  })
}
