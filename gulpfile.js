const gulp = require('gulp');
const excludeGitignore = require('gulp-exclude-gitignore');
const jscs = require('gulp-jscs');
const jsonlint = require('gulp-jsonlint');
const mocha = require('gulp-mocha');

// Lints JavaScript files
gulp.task('jscs', () => {
    return gulp.src('**/*.js')
        .pipe(excludeGitignore())
        .pipe(jscs())
        .pipe(jscs.reporter())
        .pipe(jscs.reporter('fail'));
});

// Lints JSON files
gulp.task('jsonlint', () => {
    return gulp.src('**/*.json')
        .pipe(excludeGitignore())
        .pipe(jsonlint())
        .pipe(jsonlint.reporter())
        .pipe(jsonlint.failAfterError());
});

// Tests
gulp.task('mocha', () => {
    return gulp.src('test/*.js', {read: false})
        .pipe(mocha({reporter: 'spec'}));
});

gulp.task('default', ['jscs', 'jsonlint', 'mocha']);
gulp.task('lint', ['jscs', 'jsonlint']);
gulp.task('test', ['mocha']);
