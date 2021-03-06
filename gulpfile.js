const { parallel } = require('gulp');

const gulp = require('gulp');
    
const browserSync = require('browser-sync');

const sass = require('gulp-sass');

const concat = require('gulp-concat');

const sourcemaps = require('gulp-sourcemaps');

gulp.task('scss', function(){
	return gulp.src('app/sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(concat('bundle.css'))
        .pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false
	});
});
 
gulp.task('code', function() {
	return gulp.src('app/*.html')
	.pipe(browserSync.reload({ stream: true }))
});
 
gulp.task('watch', function() {
	gulp.watch('app/sass/**/*.scss', gulp.parallel('scss'));
	gulp.watch('app/*.html', gulp.parallel('code'));
});

gulp.task('default', gulp.parallel('scss', 'browser-sync', 'watch'));