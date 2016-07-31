var gulp 					= require('gulp'),
    sass 					= require('gulp-ruby-sass'),
    autoprefixer 	= require('gulp-autoprefixer'),
    cssnano 			= require('gulp-cssnano'),
    jshint 				= require('gulp-jshint'),
    uglify 				= require('gulp-uglify'),
    imagemin 			= require('gulp-imagemin'),
    rename 				= require('gulp-rename'),
    concat 				= require('gulp-concat'),
    notify 				= require('gulp-notify'),
    cache 				= require('gulp-cache'),
    livereload 		= require('gulp-livereload'),
    del 					= require('del');


gulp.task('styles', function() {
  return sass('src/styles/main.scss', { style: 'expanded' })
    .pipe(autoprefixer('last 3 version'))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/assets/css'));
});


gulp.task('scripts', function() {
  return gulp.src('src/scripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js'));
});


gulp.task('images', function() {
  return gulp.src('src/images/**/*')
    .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
    .pipe(gulp.dest('dist/assets/img'));
});


gulp.task('clean', function() {
   return del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img']);
});


gulp.task('default', ['clean'], function() {
  gulp.start('styles', 'scripts', 'images');
});

gulp.task('watch', function() {
  gulp.watch('src/styles/**/*.scss', ['styles']);
  gulp.watch('src/scripts/**/*.js', ['scripts']);
  gulp.watch('src/images/**/*', ['images']);

	livereload.listen();
  gulp.watch(['dist/**']).on('change', livereload.changed);
});



