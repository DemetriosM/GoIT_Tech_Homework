var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    cssmin = require('gulp-clean-css'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel'),
    jshint = require('gulp-jshint'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rigger = require('gulp-rigger'),
    rename = require('gulp-rename'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        jsLib: 'build/js/lib/',
        css: 'build/css/',
        cssIE8: 'build/css/IE8/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: {
        html: 'src/index.html',
        js: 'src/js/*.js',
        jsLib: 'src/js/lib/*.js',
        scss: 'src/style/main.scss',
        cssIE8: 'src/styleIE8/cssIE8.css',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/*.js',
        jsLib: 'src/js/lib/*.js',
        scss: 'src/style/**/*.scss',
        cssIE8: 'src/styleIE8/*.css',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: false,
    host: 'localhost',
    port: 9000,
    logPrefix: "Frontend"
};

gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(babel({
              presets: ['es2015']
            }))
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(rename('main.min.js'))
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('jsLib:build', function () {
    gulp.src(path.src.jsLib)
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest(path.build.jsLib))
        .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
    gulp.src(path.src.scss)
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(cssmin({debug: true}, function(details) {
             console.log(details.name + ': ' + details.stats.originalSize);
             console.log(details.name + ': ' + details.stats.minifiedSize);
         }))
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('cssIE8:build', function () {
    gulp.src(path.src.cssIE8)
        .pipe(plumber())
        .pipe(cssmin({debug: true}, function(details) {
             console.log(details.name + ': ' + details.stats.originalSize);
             console.log(details.name + ': ' + details.stats.minifiedSize);
         }))
        .pipe(rename('cssIE8.min.css'))
        .pipe(gulp.dest(path.build.cssIE8))
        .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant({quality: '65-80', speed: 10})],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});

gulp.task('build', [
    'html:build',
    'jsLib:build',
    'js:build',
    'style:build',
    'cssIE8:build',
    'fonts:build',
    'image:build'
]);

gulp.task('watch', function(){
    gulp.watch(path.watch.html, function(event) {
        gulp.start('html:build');
    });
    gulp.watch(path.watch.scss, function(event) {
        gulp.start('style:build');
    });
    gulp.watch(path.watch.cssIE8, function(event) {
        gulp.start('cssIE8:build');
    });
    gulp.watch(path.watch.js, function(event) {
        gulp.start('js:build');
    });
    gulp.watch(path.watch.jsLib, function(event) {
        gulp.start('jsLib:build');
    });
    gulp.watch(path.watch.img, function(event) {
        gulp.start('image:build');
    });
    gulp.watch(path.watch.fonts, function(event) {
        gulp.start('fonts:build');
    });
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);