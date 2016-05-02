var gulp = require('gulp');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var order = require('gulp-order');
var rename = require('gulp-rename');
var compass = require('gulp-compass');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var src = {
  scss: 'assets/sass/**/*.scss',
  css: 'dist/css',
  html: 'system/user/templates/**/*.html',
  js: 'assets/js/**/*.js',
  images: 'assets/images/**/*'
};

// CSS
gulp.task('sass', function() {
  return sass(src.scss, { compass: true })
    .pipe(gulp.dest(src.css))
    .pipe(reload({ stream: true }));
});

gulp.task('autoprefixer', function() {
  gulp.src(src.css + '/master.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }));
});

// Images
gulp.task('images', function() {
  return gulp.src(src.images)
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'));
});

// JavaScript
gulp.task('js', function() {
  return gulp.src(src.js)
    .pipe(order([
      'assets/js/fitvids.js',
      'assets/js/flickity.js',
      'assets/js/headroom.js',
      'assets/js/prism.js',
      'assets/js/global.js'
    ], { base: './' }))
    .pipe(concat('iamsteve.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(reload({ stream: true }));
});

// Serve
gulp.task('serve', ['sass'], function() {
  browserSync.init({
    injectChanges: true,
    proxy: "iamsteve.dev"
  });

  gulp.watch(src.scss, ['sass']);
  gulp.watch(src.html).on('change', reload);
});


gulp.task('default', ['serve']);
gulp.task('build', ['js', 'images', 'autoprefixer']);