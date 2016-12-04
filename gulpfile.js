// Include Plug-ins
var gulp = require("gulp");
var webserver = require("gulp-webserver");
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var browserify = require('browserify');
var rename = require("gulp-rename");
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var smoosher = require('gulp-smoosher');
var imageop = require('gulp-image-optimization');

// Config vars
var config = {
  styles: {
    main: './assets/scss/app.scss',
    watch: './assets/scss/**/*.scss',
    output: './public/css'
  },
  html: {
    watch: './*.html'
  },
  scripts: {
    main: './assets/js/app.js',
    watch: './app/**/*.js',
    output: './public/js'
  },
  images: {
    watch: ['./assets/images/*.png', './assets/images/**/*.jpg'],
    output: './public/images'
  }
};

// Run local webserver
gulp.task('server', function(){
	gulp.src('./')
		.pipe(webserver({      
			host             : '0.0.0.0',
			port             : 8080,
			livereload       : true      
		}));
});

// Build css
gulp.task('sass', function () {
 gulp.src(config.styles.watch)
   .pipe(sass({
        outputStyle: 'compressed',
        sourceComments: false,
        includePaths: [
          './bower_components/lumx/dist',
          './bower_components/bourbon/app/assets/stylesheets'
        ]
      }).on('error', sass.logError))
   .pipe(autoprefixer({
      versions: ['last 2 browsers']
   }))
   .pipe(concat('app.css'))
   .pipe(gulp.dest(config.styles.output));
});

// Copy fonts
gulp.task('copy:fonts', function () {
  return gulp.src('./bower_components/lumx/dist/fonts/*')
    .pipe(gulp.dest('./public/css/fonts'));
});

// Concat Js
gulp.task('scripts', function() {
  return gulp.src(config.scripts.watch)
    .pipe(concat('app.js', {newLine: ';'}))
    .pipe(gulp.dest('./public/js'));
});
 
// Build Js
gulp.task('build:js', function() {
  return browserify(config.scripts.main)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(rename('app.js'))
    .pipe(gulp.dest(config.scripts.output));
});

// Build Vendor
gulp.task('vendor', function() {
  gulp.src([
          'bower_components/angular/angular.js',
          'bower_components/angular-route/angular-route.js',
          'bower_components/jquery/dist/jquery.min.js'
      ])
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js/'));
});

// Images Optimization
gulp.task('images', function() {
  gulp.src(config.images.watch)
    .pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    }))
    .pipe(gulp.dest(config.images.output));
});

// Replaces css and js links with file contents
gulp.task('inline', function() {
  gulp.src('.public/index.html')
    .pipe(smoosher())
    .pipe(gulp.dest('./public'));
});

// Watch task
gulp.task('watch', function() {
  gulp.watch(config.styles.watch,   ['sass']);
  gulp.watch(config.scripts.watch,  ['scripts']);
  gulp.watch(config.scripts.watch,  ['build:js']);
  gulp.watch(config.images.watch,   ['image']);
  gulp.watch(config.html.watch,     ['build']);
});

// Build Task
gulp.task('build', ['sass', 'copy:fonts', 'scripts', 'vendor', 'images', 'inline']);

// Default gulp task
gulp.task('default', ['server', 'watch', 'build']);
