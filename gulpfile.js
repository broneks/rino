'use strict'

const gulp = require('gulp')
const webpack = require('webpack-stream')
const uglify = require('gulp-uglify')
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
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
})

gulp.task('watch', tasks, () => {
  browserSync.init({
    server: './'
  })

  gulp.watch('src/**/*.js', ['standard', 'scripts'])
  gulp.watch('sass/**/*.scss', ['styles'])
  gulp.watch('index.html').on('change', browserSync.reload)
})

gulp.task('default', tasks)
