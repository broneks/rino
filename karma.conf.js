'use strict'

const webpackConfig = require('./webpack.conf')

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'spec/tests.webpack.js'
    ],
    preprocessors: {
      'spec/tests.webpack.js': ['webpack']
    },
    webpack: {
      module: webpackConfig.module,
      devtool: 'inline-source-map'
    },
    webpackMiddleware: {
      noInfo: true
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    concurrency: Infinity
  })
}
