var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');
var replace = require('gulp-replace');
var textTransformation = require('gulp-text-simple');

// Very handcrafted (fragile) function to transform source into a copy-pastable bookmark :(
var bookmarkify = function (fileContents) {
    var modifiedSource = fileContents;
    modifiedSource = modifiedSource.slice(0,-3);
    modifiedSource += ")();";
    modifiedSource = modifiedSource.replace("!function","javascript:(function");
    return modifiedSource;
}

var wrappedBookmarkify = textTransformation(bookmarkify);

gulp.task('compress', function (cb) {
  pump([
        gulp.src('main.js'),
        uglify(),
        gulp.dest('dist')
    ],
    cb
  );
});
 
gulp.task('bookmarkify', function() {
  return gulp.src(['./dist/main.js'])
    .pipe(wrappedBookmarkify())
    .pipe(gulp.dest('dist/'));
});