const gulp = require('gulp')
const plumber = require('gulp-plumber')
const pug = require('gulp-pug')
const pugLinter = require('gulp-pug-linter')
const htmlValidator = require('gulp-w3c-html-validator')
const bemValidator = require('gulp-html-bem-validator')
const pretty = require('gulp-pretty-html')
const config = require('../config')

module.exports = function pug2html(cb) {
	return gulp.src('src/pages/dashboard.pug')
		.pipe(plumber())
		.pipe(pugLinter({ reporter: 'default' }))
		.pipe(pug())
		.pipe(htmlValidator())
		.pipe(bemValidator())
    .pipe(pretty())
		.pipe(gulp.dest('build'))

}
