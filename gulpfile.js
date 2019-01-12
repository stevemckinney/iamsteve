var gulp = require('gulp');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var order = require('gulp-order');
var rename = require('gulp-rename');
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
var critical = require('gulp-penthouse');
var checkCSS = require('gulp-check-unused-css');

var src = {
  scss: 'assets/sass/**/*.scss',
  css: 'dist/css',
  html: 'system/user/templates/**/*.html',
  js: 'assets/js/**/*.js',
  images: 'assets/images/*.png',
  svg: 'assets/images/*.svg',
  fonts: './assets/fonts/**/*.{ttf,woff,woff2,eot,svg}'
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
  proxy: 'http://iamsteve.dev',
  injectChanges: true
};

// CSS
gulp.task('sass', () =>
  sass(src.scss, {
    compass: false
  })
    .on('error', sass.logError)
    .pipe(gulp.dest(src.css))
    .pipe(browserSync.reload({
      stream: true
    }))
);

gulp.task('sass-build', () =>
  sass(src.scss, { compass: false, style: 'compressed' })
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

gulp.task('purify', function() {
  return gulp.src('./dist/css/global.css')
    .pipe(purify(['./dist/js/**/*.js', './system/user/templates/default_site/**/*.html']))
    .pipe(gulp.dest(src.css));
});

gulp.task('purify', function() {
  return gulp.src(['./dist/css/global.css', './system/user/templates/default_site/**/*.html']).pipe(checkCSS());
});

// Critical CSS
gulp.task('critical', function () {
  return gulp.src('./dist/css/global.css')
    .pipe(critical({
      out: 'critical.css',
      url: 'http://iamsteve.dev',
      width: 1680,
      height: 1200,
      strict: true,
      minify: true,
      userAgent: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
      include: [
        '.headline-b',
        '.primary .fill-s1',
        '.primary'
      ],
      ignore: [
        '.dashes'
      ]
    }))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(cssnano())
    .pipe(rename('critical.html'))
    .pipe(gulp.dest('./system/user/templates/default_site/_partials/'));
});

// Copy fonts
gulp.task('fonts', function() {
  return gulp
    .src(src.fonts)
    .pipe(gulp.dest('./dist/fonts'));
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
gulp.task('build', ['sass-build', 'autoprefixer', 'critical', 'purify', 'fonts']);
