'use strict';

var gulp = require('gulp');
var webpack = require('gulp-webpack');


gulp.task('webpackdev', function() {
  return gulp.src('./app/js/**/*.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('copy', function() {
  var opts = {
    conditionals: true,
    spare: true
  };

  return gulp.src('./app/**/*.html')
    .pipe(gulp.dest('./public/'));
});

gulp.task('build', ['copy', 'webpackdev']);
gulp.task('default', ['build']);
