const {gulp, src, dest, watch, series, parallel} = require('gulp');
const del = require('del');
const plumber = require('gulp-plumber');
const order = require('gulp-order');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const purgecss = require('gulp-purgecss');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const concat = require('gulp-concat');
const critical = require('critical');

const importer = require('node-sass-globbing');
const glob = require('glob');
const gulpicon = require('gulpicon/tasks/gulpicon');

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

// browser-sync watched files
// automatically reloads the page when files changed
const browserSyncWatchFiles = [
  path.css.dist,
  path.js.src,
  path.html.src
];

// browser-sync options
// see: https://www.browsersync.io/docs/options/
const browserSyncOptions = {
  proxy: 'http://iamsteve.dev',
  injectChanges: true
}

// BrowserSync
const reloader = (done) => {
  browserSync.reload();

  done();
}

const serve = (done) => {
  browserSync.init(browserSyncWatchFiles, browserSyncOptions);

  done();
}

/**
 * Tasks
 */

// Start fresh and empty the '/dist' folder
const clean = () => del([path.output]);

// CSS
sass.compiler = require('node-sass');

const css = (done) => {
	src(path.css.src)
  	.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'expanded',
			sourceComments: false
		}))
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write('./'))
		.pipe(dest(path.css.dist));

	done();
}

const sass_config = {
  importer,
  includePaths: [
    './node_modules/breakpoint-sass/stylesheets/'
  ]
};

const cssBuild = (done) => {
	src(path.css.src)
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

// Clean unused CSS using uncss
const cleanCSS = (done) => {
  src(`${path.css.dist}/global.css`)
    .pipe(
      purgecss({
        content: [path.html.src, path.js.src],
        css: [`${path.css.dist}/global.css`]
      })
    )
    .pipe(dest(path.css.dist))

  done();
}

// Critical CSS
const criticalCSS = (done) => {
  critical.generate({
    inline: false,
    base: './',
    src: 'http://iamsteve.dev',
    css: [`${path.css.dist}/global.css`],
    dimensions: [{
      width: 320,
      height: 480
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

// Images
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

// Watch
const watchFiles = (done) => {
  watch(path.css.src, series(css, cleanCSS));
  watch(path.js.src);
  watch(path.html.src, series(reloader));

  done();
}

/**
 * Runnable
 */
exports.watch = series(watchFiles);
exports.build = series(cssBuild, prefix, criticalCSS, parallel(fonts, svg, image));
exports.clean = series(clean);
exports.critical = series(criticalCSS);
exports.fonts = series(fonts);
exports.autoprefixer = series(prefix);
exports.imageminify = parallel(image, svg);
exports.cleaner = parallel(cleanCSS);
exports.serve = serve;
