/**
 * Paths
 */
const path = {
  src: 'assets/',
  dist: 'dist/',
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
const del = require('del');
const sourcemaps = require('gulp-sourcemaps');

// CSS
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
// const importer = require('node-sass-globbing');

// Images
const imagemin = require('gulp-imagemin');
const svgmin = require('gulp-svgmin');

// BrowserSync
const browserSync = require('browser-sync').create();

/**
 * Start *fresh*
 */
const fresh = (done) => {
  del([path.output]);

  done();
}

/**
 * Browsersync
 * see: https://www.browsersync.io/docs/options/
 **/
const browserSyncOptions = {
  proxy: 'http://iamsteve.dev',
  injectChanges: true
}

// Reload
const reloader = (done) => {
  browserSync.reload();

  done();
}

// Serve
const serve = (done) => {
  // Watch everything in src, run default & refresh the browser
  browserSync.init([path.src, path.html.src], browserSyncOptions);

  done();
}

/**
 * CSS
 */
const sass_config = {
  outputStyle: 'compressed',
  sourceComments: false,
  includePaths: [
    './node_modules/breakpoint-sass/stylesheets/'
  ]
}

const css = (done) => {
	return src(path.css.src)
	  .pipe(sourcemaps.init())
		.pipe(sass(sass_config).on('error', sass.logError))
		.pipe(cssnano())
		.pipe(sourcemaps.write('./'))
		.pipe(dest(path.css.dist))

	done();
}

const prefix = (done) => {
	src(path.css.dist)
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: true,
			remove: true
		}))
		.pipe(dest(path.css.dist))

	done();
}

// Critical CSS
const critical = (done) => {
  critical.generate({
    inline: false,
    base: './',
    src: 'http://iamsteve.dev',
    css: [`${path.css.dist}/global.css`],
    dimensions: [{
      width: 414,
      height: 738
    }, {
      width: 768,
      height: 1024
    }, {
      width: 1680,
      height: 1200
    }],
    dest: './system/user/templates/default_site/_partials/critical.html',
    minify: true,
    extract: false,
    include: [
      '.headline-b',
      '.primary .fill-s1',
      '.primary',
      '.hiding'
    ],
    ignore: {
      atrule: ['font-face'],
      rule: ['.dashes']
    }
  });

  done();
}

// Fonts
const fonts = (done) => {
  src(path.fonts.src)
  .pipe(dest(path.fonts.dist));

	done();
}

/**
 * Images
 */
// @todo: tasks do not work due to some error
const image = (done) => {
  src(path.image.src)
    .pipe(imagemin(
      [
        imagemin.optipng({
          optimizationLevel: 3,
          progressive: true,
          interlaced: true,
          mergePaths: false
        })
      ],
    ))
    .pipe(dest(path.image.dist));

  done();
}

const svg = (done) => {
  src(path.svg.src)
    .pipe(imagemin([
        imagemin.svgo({
          plugins: [
            { removeViewBox: false },
            { cleanupIDs: false },
            { mergePaths: false }
          ]
        })
      ]))
    .pipe(dest(path.svg.dist));

  done();
}

/**
 * Watch
 */
const watching = (done) => {
  watch(path.src, series(exports.default, reloader));

  done();
}

/**
 * Run
 */
exports.default = series(
	parallel(
		css
	)
);

exports.build = series(exports.default, critical);

exports.serve = series(serve);

exports.watch = series(
  exports.default,
	watching,
	serve
);
