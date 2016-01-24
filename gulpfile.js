'use strict';

const gulp = require('gulp');
const webpack = require('webpack-stream');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');

const tasks = [
  'scripts'
];

gulp.task('scripts', () => {
  const config = {
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
  };

  return gulp.src('src/main.js')
    .pipe(plumber())
    .pipe(webpack(config))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
});

gulp.task('default', tasks);

gulp.task('watch', tasks, () => {
  gulp.watch('src/**/*.js', ['scripts']);
});
