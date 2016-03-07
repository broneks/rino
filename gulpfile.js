'use strict'

const gulp = require('gulp')
const webpackStream = require('webpack-stream')
const webpack = require('webpack')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const plumber = require('gulp-plumber')
const standard = require('gulp-standard')
const browserSync = require('browser-sync').create()

const tasks = [
  'standard',
  'scripts',
  'styles'
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
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  devtool: 'inline-source-maps'
}

const standardConfig = {
  globals: [
    'io'
  ],
  ignore: [
    'public/'
  ],
  parser: 'babel-eslint'
}

gulp.task('standard', () => {
  gulp.src([
    'client/**/*.js',
    'server/**/*.js'
  ])
    .pipe(standard(standardConfig))
    .pipe(standard.reporter('default'))
})

gulp.task('scripts', () => {
  gulp.src('client/main.js')
    .pipe(plumber())
    .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest('public/js'))
    .pipe(browserSync.stream());
})

gulp.task('styles', () => {
  gulp.src('sass/main.scss')
    .pipe(plumber())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.stream());
})

gulp.task('watch', tasks, () => {
  browserSync.init({
    proxy: 'localhost:9000',
    ws: true
  })

  gulp.watch([
    'client/**/*.js',
    'server/**/*.js'
  ], ['standard'])
  gulp.watch('client/**/*.js', ['scripts'])
  gulp.watch('sass/**/*.scss', ['styles'])
  gulp.watch('server/**/*.jade').on('change', browserSync.reload)
})

gulp.task('default', tasks)
