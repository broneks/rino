'use strict'

const gulp = require('gulp')
const webpack = require('webpack-stream')
const uglify = require('gulp-uglify')
const plumber = require('gulp-plumber')
const standard = require('gulp-standard')

const tasks = [
  'standard',
  'scripts'
]

const webpackConfig = {
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
  }
}

const standardConfig = {
  // globals: [],
  ignore: [
    'dist/'
  ],
  parser: 'babel-eslint'
}

gulp.task('standard', () => {
  gulp.src('src/**/*.js')
    .pipe(standard(standardConfig))
    .pipe(standard.reporter('default'))
})

gulp.task('scripts', () => {
  gulp.src('src/main.js')
    .pipe(plumber())
    .pipe(webpack(webpackConfig))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
})

gulp.task('default', tasks)

gulp.task('watch', tasks, () => {
  gulp.watch('src/**/*.js', ['standard', 'scripts'])
})
