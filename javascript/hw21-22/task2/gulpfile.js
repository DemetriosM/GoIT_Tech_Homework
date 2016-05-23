

var gulp = require('gulp'),
    babel = require('gulp-babel');


gulp.task('js:build', function () {
    gulp.src('js/main.js')
        .pipe(babel({
              presets: ['es2015']
            }))
        .pipe(gulp.dest('js/dist'));
});


gulp.task('default', ['js:build']);