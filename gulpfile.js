/**
 * Settings
 * Turn on/off build features
 */

var settings = {
  css: true
};

/**
 * Paths
 */
const path = {
  input: 'assets/',
  output: 'dist/',
  css: {
    src: 'assets/sass/**/*.{scss,sass}',
    dist: 'dist/css/'
  },
  js: {
    src: 'assets/js/**/*.js',
    dist: 'dist/js/'
  },
  html: {
    src: 'system/user/templates/**/*.html'
  },
  image: {
    src: 'assets/images/*.png',
    dist: 'dist/images/'
  },
  svg: {
    src: 'assets/images/*.svg',
    dist: 'dist/images/'
  },
  fonts: {
    src: './assets/fonts/**/*.{ttf,woff,woff2,eot,svg}',
    dist: 'dist/fonts/'
  },
  node_modules: './node_modules'
}

/**
 * Gulp Packages
 */
const {gulp, src, dest, watch, series, parallel} = require('gulp');
const sourcemaps = require('gulp-sourcemaps');

// CSS
const sass = require('gulp-sass');
const prefix = require('autoprefixer');
const minify = require('cssnano');

// SVG
const svgmin = require('gulp-svgmin');

// BrowserSync
const browserSync = require('browser-sync');


/**
 * Gulp Packages
 */
var css = function (done) {

	// Make sure this feature is activated before running
	if (!settings.css) return done();

	// Run tasks on all Sass files
	return src(path.css.src)
	  .pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'compressed',
			sourceComments: false
		}))
		.pipe(sass(sass_config).on('error', sass.logError))
		.pipe(cssnano())
		.pipe(sourcemaps.write('./'))
		.pipe(dest(path.css.dist))

	done();
};

// Watch
const watchFiles = (done) => {
  watch(path.input, series(css));

  done();
}

/**
 * Runnable
 */
exports.default = series(
	parallel(
		css
	)
);

exports.watch = series(exports.default);
