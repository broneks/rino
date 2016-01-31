'use strict'

const gulp = require('gulp')
const webpack = require('webpack-stream')
const uglify = require('gulp-uglify')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const plumber = require('gulp-plumber')
const livereload = require('gulp-livereload')
const http = require('http')
const st = require('st')
const standard = require('gulp-standard')

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
    // .pipe(uglify())
    .pipe(gulp.dest('dist'))
    .pipe(livereload())
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
    .pipe(gulp.dest('dist/css'))
    .pipe(livereload())
});

gulp.task('server', (done) => {
  http.createServer(
    st({
      path: __dirname,
      index: 'index.html',
      cache: false
    })
  ).listen(8080, done)
});

gulp.task('watch', tasks.concat(['server']), () => {
  gulp.watch('src/**/*.js', ['standard', 'scripts'])
  gulp.watch('sass/**/*.scss', ['styles'])
})

gulp.task('default', tasks)
