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
const cache = require('gulp-cache');

// CSS
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const critical = require('critical');
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
sass.compiler = require('node-sass');

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
		.pipe(browserSync.reload({ stream: true }))
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
const criticalCSS = (done) => {
  critical.generate({
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
    inline: false,
    minify: true,
    extract: false,
    include: [
      '.headline-b',
      '.primary .fill-s1',
      '.primary',
      '.hiding'
    ],
    ignore: [
      '@font-face',
      '.dashes'
    ]
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
const images = (done) => {
  src(path.image.src)
    .pipe(cache(
      imagemin(
        [
          imagemin.optipng({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true,
            mergePaths: false
          })
        ],
        {
          verbose: true
        }
      )
    ))
    .pipe(dest(path.image.dist));

  done();
}

const svg = (done) => {
  src(path.svg.src)
    .pipe(cache(
      imagemin(
        [
          imagemin.svgo({
            plugins: [
              { removeViewBox: false },
              { cleanupIDs: false },
              { mergePaths: false }
            ]
          })
        ],
        {
          verbose: true
        }
      )
    ))
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
 * Single tasks
 */
exports.css = css;
exports.criticalCSS = criticalCSS;
exports.images = images;
exports.svg = svg;
exports.serve = serve;
exports.fonts = fonts;

/**
 * Multiple tasks
 */
exports.default = series(
	parallel(
		css,
		fonts,
		svg,
		images
	)
);

exports.build = series(exports.default, exports.criticalCSS);

exports.watch = series(
  exports.default,
	watching,
	serve
);
