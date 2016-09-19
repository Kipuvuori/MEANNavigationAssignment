var gulp = require('gulp');
var googlecdn = require('gulp-google-cdn');

gulp.task('default', function () {
	//TODO minify and combine js & css for production
    return gulp.src('./public/index.html')
        .pipe(googlecdn(require('./bower.json')))
        .pipe(gulp.dest('public'));
});

gulp.task('copy', function() {
    gulp.src(['bower_components/angular-simple-logger/dist/angular-simple-logger.min.js',
		'node_modules/ui-leaflet/dist/ui-leaflet.min.js',
    'node_modules/drmonty-leaflet-awesome-markers/js/leaflet.awesome-markers.min.js',
		'node_modules/ui-leaflet-draw/dist/ui-leaflet-draw.js'])
    .pipe(gulp.dest('public/js/'))

    gulp.src([
    'node_modules/drmonty-leaflet-awesome-markers/css/leaflet.awesome-markers.css',
    'node_modules/drmonty-leaflet-awesome-markers/css/images'])
    .pipe(gulp.dest('public/cdd/'))
});
