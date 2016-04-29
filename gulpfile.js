var gulp = require('gulp'),
	concatCSS = require('gulp-concat-css'),
	sass = require('gulp-sass'),
	notify = require('gulp-notify'),
	minifyCSS = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
	connect = require('gulp-connect');

/*          LOCAL       */
gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});

/*		CREATE_CSS	 	*/
gulp.task('scss', function () {
	gulp.src('scss/media.scss') //Путь к папке с файлами, которые нужно соединить
	.pipe(sass())
	.pipe(gulp.dest('css/'))
	.pipe(rename("style.css"))
    // .pipe(concatCSS("style.css"))
    .pipe(gulp.dest('app/css'))
    .pipe(autoprefixer({
		browsers: ['last 100 versions'],
		cascade: false
	}))
    .pipe(minifyCSS({keepBreaks:false}))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest('app/css'))
    .pipe(connect.reload())
    .pipe(notify("Done!"));
});

/*			HTML 		*/
gulp.task('html', function () {
	gulp.src('app/index.html')
	.pipe(connect.reload());
});

/*		WATCH	 	*/
gulp.task('watch', function () {
	gulp.watch('scss/*.scss', ['scss'])
	gulp.watch('app/index.html', ['html'])
});

//default
gulp.task('default', ['connect', 'scss', 'html', 'watch']);