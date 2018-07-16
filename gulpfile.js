var gulp = require('gulp');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var textTransformation = require('gulp-text-simple');

// Very handcrafted (fragile) function to transform source into a copy-pastable bookmark :(
var bookmarkify = function (fileContents) {
    var modifiedSource = fileContents;
    modifiedSource = "javascript:(function(){" + modifiedSource + "})();";
    return modifiedSource;
}

var wrappedBookmarkify = textTransformation(bookmarkify);

gulp.task('watch', function () {
    return watch('src/*.js', function () {
        return gulp.src('src/*.js')
          .pipe(concat('main.js'))
          .pipe(gulp.dest('temp/'));
    });
});

gulp.task('build', function () {
    return gulp.src('src/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify('main.js'))
        .pipe(wrappedBookmarkify())
        .pipe(gulp.dest('dist/'));
});