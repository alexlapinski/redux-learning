'use strict';

import path from 'path';
import gulp from 'gulp';
import del from 'del';
import sass from 'gulp-sass';
import named from 'vinyl-named';
import webpack from 'webpack-stream';
import browserSync from 'browser-sync';
import webpackConfig from './webpack.config.js';

const reload = browserSync.reload;

gulp.task('clean', () => del(['dist/*'], {dot:true}));

gulp.task('html', () =>
  gulp.src('src/*.html')
      .pipe(gulp.dest('dist/'))
      .pipe(browserSync.stream())
);

gulp.task('styles', () =>
  gulp.src('src/styles/**/*.scss')
      .pipe(sass({
        outputStyle: 'compressed',
        includePaths: [
          'node_modules/susy/sass',
          'node_modules/bootstrap/scss'
        ]}).on('error', sass.logError))
      .pipe(gulp.dest('dist/styles'))
      .pipe(browserSync.stream())
);

gulp.task('webpack', () =>
  gulp.src(['src/scripts/main.js'])
      .pipe(named())
      .pipe(webpack(webpackConfig))
      .pipe(gulp.dest('dist/scripts'))
      .pipe(browserSync.stream())
);

gulp.task('serve', ['html', 'styles', 'webpack'], () => {
  browserSync({
    notify: false,
    logPrefix: 'AKL',
    server: 'dist',
    port: 3000
  });

  gulp.watch('src/*.html', ['html', reload]);
  gulp.watch('src/styles/**/*.scss', ['styles', reload]);
  gulp.watch('src/scripts/**/*.js', ['webpack', reload]);
});

gulp.task('default', ['clean', 'html', 'styles', 'webpack']);
