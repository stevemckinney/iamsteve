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
var sourcemaps = require('gulp-sourcemaps');
var reload = browserSync.reload;


var src = {
  scss: 'assets/sass/**/*.scss',
  css: 'dist/css',
  html: 'system/user/templates/**/*.html',
  js: 'assets/js/**/*.js',
  images: 'assets/images/*.png',
  svg: 'assets/images/*.svg'
};

var path = {
  js: 'assets/js',
  node_modules: './node_modules'
};

// browser-sync watched files
// automatically reloads the page when files changed
var browserSyncWatchFiles = [
  src.css,
  src.js,
  src.html
];

// browser-sync options
// see: https://www.browsersync.io/docs/options/
var browserSyncOptions = {
  proxy: 'https://iamsteve.dev',
  injectChanges: true
};

// CSS
gulp.task('sass', () =>
  sass(src.scss, { compass: true })
    .on('error', sass.logError)
    .pipe(gulp.dest(src.css))
    .pipe(browserSync.reload({
      stream: true
    }))
);

gulp.task('sass-build', () =>
  sass(src.scss, { compass: true, style: 'compressed' })
    .on('error', sass.logError)
    .pipe(gulp.dest(src.css))
);

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
    .pipe(cache(imagemin(
      { 
        optimizationLevel: 3,
        progressive: true,
        interlaced: true,
        mergePaths: false
      }
    )))
    .pipe(gulp.dest('dist/images/*.png'));
});

gulp.task('svg', function() {
  return gulp.src(src.svg)
    .pipe(cache(imagemin({ mergePaths: false })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('watch', function () {
  gulp.watch('dist/css/master.css', ['autoprefixer']);
});

gulp.task('browser-sync', function() {
  browserSync.init(browserSyncWatchFiles, browserSyncOptions);
});

// Serve, Sass and live reloading
gulp.task('serve', ['browser-sync', 'watch'], function() {
  gulp.watch(src.scss, ['sass']);
  gulp.watch(src.html).on('change', reload);
});


gulp.task('default', ['serve']);
gulp.task('build', ['sass-build', 'autoprefixer']);