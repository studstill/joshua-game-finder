'use strict';

var gulp = require('gulp');
var webpack = require('webpack-stream');
var sass = require('gulp-sass');

gulp.task('sass', function() {
  gulp.src('./app/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('sass:watch', function() {
  gulp.watch('./app/sass/**/*.scss', ['sass']);
});

gulp.task('webpackdev', function() {
  return gulp.src('./app/js/**/*.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('./public/js/'));
});
gulp.task('webpackdev:watch', function() {
  gulp.watch('./app/js/**/*.js', ['webpackdev']);
});

gulp.task('copy', function() {
  var opts = {
    conditionals: true,
    spare: true
  };
  return gulp.src('./app/**/*.html')
    .pipe(gulp.dest('./public/'));
});
gulp.task("copy:watch", function() {
  gulp.watch("./app/**/*.html", ["copy"]);
});
gulp.task('build', ['copy', 'webpackdev', 'sass', 'copy:watch', 'webpackdev:watch', 'sass:watch']);
gulp.task('default', ['build']);
