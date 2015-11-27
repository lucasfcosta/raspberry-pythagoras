const gulp = require('gulp');
const jscs = require('gulp-jscs');
const jsonlint = require('gulp-jsonlint');
const excludeGitignore = require('gulp-exclude-gitignore');

// Lints JavaScript files
gulp.task('jscs', () => {
    return gulp.src('**/*.js')
	    .pipe(excludeGitignore())
        .pipe(jscs())
        .pipe(jscs.reporter())
});

// Lints JSON files
gulp.task('jsonlint', () => {
   	return gulp.src('**/*.json')
	    .pipe(excludeGitignore())
        .pipe(jsonlint())
        .pipe(jsonlint.reporter())
        .pipe(jsonlint.failAfterError())
});





gulp.task('default', ['jscs', 'jsonlint']);