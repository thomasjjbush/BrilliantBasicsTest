// -------------------------------------------------------------------------------------------------------------------- !!
// Gulp Libraries
// -------------------------------------------------------------------------------------------------------------------- !!

var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var del = require('del');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');
var autoprefixer = require('gulp-autoprefixer');

// -------------------------------------------------------------------------------------------------------------------- !!
// Utils
// -------------------------------------------------------------------------------------------------------------------- !!

var cc = {
    cyan: '\033[0;36m',
    yellow: '\033[0;33m',
    pink:'\033[0;35m',
    clear: '\033[0m'
};
function reportChange(event){
    console.log('File ' + cc.pink + event.path + cc.clear + ' was ' + cc.cyan + event.type + cc.clear + ' running tasks...');
}

// -------------------------------------------------------------------------------------------------------------------- !!
// Gulp Tasks
// -------------------------------------------------------------------------------------------------------------------- !!

// tidy task
gulp.task('clean:build', function() {
  return del.sync('build');
})

// html task
gulp.task('html', function() {
    return gulp.src('src/index.html')
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.stream())
})

// scss task
gulp.task('scss', function() {
  	return gulp.src('src/scss/*.scss') 
    .pipe(sass())
    .pipe(autoprefixer({
        browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream())
});

// javascript task
gulp.task('js', function() {
    return gulp.src('src/js/*')
    .pipe(gulp.dest('build/js/'))
    .pipe(browserSync.stream())
})

// image task
gulp.task('img', function() {
  	return gulp.src('src/img/*')
  	.pipe(gulp.dest('build/img/'))
  	.pipe(browserSync.stream())
})

// browser sync task
gulp.task('browserSync', function() {
  	browserSync.init({
        server: {
            baseDir: "./build/"
        }
    });
})

// watch task
gulp.task('watch', function() {
    gulp.watch('src/index.html', 		['html']).on('change', reportChange);;
    gulp.watch('src/scss/*.scss',   ['scss']).on('change', reportChange);;
    gulp.watch('src/js/*.js', 	    ['js']).on('change', reportChange);;
    gulp.watch('src/img/*', 		    ['img']).on('change', reportChange);;
})

// -------------------------------------------------------------------------------------------------------------------- !!
// Build/Develop tasks
// -------------------------------------------------------------------------------------------------------------------- !!

gulp.task('develop', function () {
  	runSequence('clean:build', 
    	[
    		'html',  
    		'scss', 
    		'js',
    		'img'
    	],
    	'browserSync',
    	'watch'
  	)
})

gulp.task('build', function () {
  	runSequence('clean:build', 
    	[
    		'html',  
        'scss', 
        'js',
        'img'
    	]
  	)
})