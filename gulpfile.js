const gulp = require('gulp');
const excludeGitignore = require('gulp-exclude-gitignore');
const eslint = require('gulp-eslint');
const jsonlint = require('gulp-jsonlint');
const mocha = require('gulp-mocha');

// Lints JavaScript files
gulp.task('eslint', () => {
    return gulp.src('**/*.js')
        .pipe(excludeGitignore())
        .pipe(eslint())
        .pipe(eslint.formatEach())
        .pipe(eslint.failAfterError());
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

gulp.task('default', ['eslint', 'jsonlint', 'mocha']);
gulp.task('lint', ['eslint', 'jsonlint']);
gulp.task('test', ['mocha']);
