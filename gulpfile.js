var gulp = require('gulp');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
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
          .pipe(babel({
              presets: [
                ["env", {
                  "targets": {
                    // The % refers to the global coverage of users from browserslist
                    "browsers": [ ">0.25%", "not ie 11", "not op_mini all"]
                  }
                }]
              ]
          }))
          .pipe(gulp.dest('temp/'));
    });
});

gulp.task('build', function () {
    return gulp.src('src/*.js')
        .pipe(concat('main.js'))
        .pipe(babel({
            presets: [
                ["env", {
                  "targets": {
                    // The % refers to the global coverage of users from browserslist
                    "browsers": [ ">0.25%", "not ie 11", "not op_mini all"]
                  }
                }]
              ]
        }))
        .pipe(uglify('main.js'))
        .pipe(wrappedBookmarkify())
        .pipe(gulp.dest('dist/'));
});