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
var babel = require('gulp-babel');
var reload = browserSync.reload;
const eslint = require('gulp-eslint');


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
  proxy: 'iamsteve.dev',
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

// JavaScript
gulp.task('js-blog', function() {
  return gulp.src([
    path.node_modules + '/fitvids/fitvids.js',
    path.node_modules + '/linkjuice/dist/linkjuice.js',
    path.js + '/prism.js'
  ]).pipe(sourcemaps.init())
    .pipe(concat('home.js'))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist/js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(sourcemaps.write('.'))
    .pipe(reload({ stream: true }));
});

gulp.task('js-iamsteve', function() {
  return gulp.src([
    path.js + '/modernizr.js',
    path.js + '/cookie.js',
    path.node_modules + '/fontfaceobserver/fontfaceobserver.js',
    path.node_modules + '/headroom.js/headroom.js',
    path.node_modules + '/lazysizes/lazysizes.js',
    path.js + '/load-svg.js',
    path.js + '/global.js'
  ]).pipe(sourcemaps.init())
    .pipe(concat('iamsteve.js'))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist/js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(sourcemaps.write('.'))
    .pipe(reload({ stream: true }));
});

gulp.task('js-home', function() {
  return gulp.src([
    path.node_modules + '/flickity/flickity.pkgd.js'
  ]).pipe(sourcemaps.init())
    .pipe(concat('home.js'))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist/js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(sourcemaps.write('.'))
    .pipe(reload({ stream: true }));
});

// Linting
gulp.task('lint', () => {
  // ESLint ignores files with "node_modules" paths. 
  // So, it's best to have gulp ignore the directory as well. 
  // Also, Be sure to return the stream from the task; 
  // Otherwise, the task may end before the stream has finished. 
  return gulp.src(['assets/js/*.js','!node_modules/**'])
    // eslint() attaches the lint output to the "eslint" property 
    // of the file object so it can be used by other modules. 
    .pipe(eslint({
      extends: "airbnb",
      rules: {
        "no-unused-vars": 1,
        "comma-dangle": 0
      }
    }))
    // eslint.format() outputs the lint results to the console. 
    // Alternatively use eslint.formatEach() (see Docs). 
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on 
    // lint error, return the stream and pipe to failAfterError last. 
    .pipe(eslint.failAfterError());
});

// Watch files
gulp.task('js', function () {
  gulp.watch(src.js, ['js-iamsteve', 'js-home', 'js-blog']);
});

gulp.task('watch', function () {
  gulp.watch('dist/css/master.css', ['autoprefixer']);
  gulp.watch(src.js, ['js', 'lint']);
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