'use strict'

const gulp = require('gulp')
const webpackStream = require('webpack-stream')
const babel = require('gulp-babel')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const plumber = require('gulp-plumber')
const standard = require('gulp-standard')
const browserSync = require('browser-sync').create()

const webpackConfig = require('./webpack.conf')
const standardConfig = require('./standard.conf')

const tasks = [
  'standard',
  'client-scripts',
  'server-scripts',
  'shared-scripts',
  'styles'
]

gulp.task('standard', () => {
  gulp.src([
    'client/**/*.js',
    'server/**/*.js',
    'shared/**/*.js'
  ])
    .pipe(standard(standardConfig))
    .pipe(standard.reporter('default'))
})

gulp.task('client-scripts', () => {
  gulp.src('client/main.js')
    .pipe(plumber())
    .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest('app/public/js'))
    .pipe(browserSync.stream())
})

gulp.task('server-scripts', () => {
  gulp.src('server/**/*.js')
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest('app/server'));
})

gulp.task('shared-scripts', () => {
  gulp.src('shared/**/*.js')
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest('app/shared'));
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
    .pipe(gulp.dest('app/public/css'))
    .pipe(browserSync.stream())
})

gulp.task('watch', tasks, () => {
  browserSync.init({
    proxy: 'localhost:9000',
    ws: true
  })

  gulp.watch([
    'client/**/*.js',
    'server/**/*.js',
    'shared/**/*.js'
  ], ['standard'])
  gulp.watch('client/**/*.js', ['client-scripts'])
  gulp.watch('server/**/*.js', ['server-scripts'])
  gulp.watch('shared/**/*.js', ['shared-scripts'])
  gulp.watch('sass/**/*.scss', ['styles'])
  gulp.watch('app/**/*.jade').on('change', browserSync.reload)
})

gulp.task('default', tasks)
