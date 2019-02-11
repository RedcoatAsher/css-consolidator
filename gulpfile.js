var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('webserver', function() {
  gulp.src('')
  .pipe(webserver({
    livereload: true,
    directoryListing: false,
    open: true
  }));
});

var gulp = require('gulp'),
    watch = require('gulp-watch');

gulp.task('stream', function () {
	// Endless stream mode
    return watch('app/css/**/*.css', { ignoreInitial: false })
        .pipe(gulp.dest('build'));
    return watch('*.html', { ignoreInitial: false })
        .pipe(gulp.dest('build'));
});

gulp.task('callback', function () {
	// Callback mode, useful if any plugin in the pipeline depends on the `end`/`flush` event
    return watch('app/css/**/*.css', function () {
        gulp.src('app/css/**/*.css')
            .pipe(gulp.dest('build'));
    });
});

gulp.task('default', ['webserver']);
