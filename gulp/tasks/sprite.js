// Подключаем gulp
var gulp      = require('gulp');
// Подключаем генератор SVG Спрайт
var svgSprite = require('gulp-svg-sprite');
var configSvg = require('../config').spriteSvg;

function sprite() {
	return gulp
			.src(configSvg.src)
			.pipe(svgSprite(configSvg.config))
			.pipe(gulp.dest(configSvg.dest));
}

gulp.task('sprite', gulp.series(sprite));

// Пример для сбора png спрайта, необходимо доустановить npm i gulp.spritesmith
// Подключаем spritesmith - генератор спрайтов
// var spritesmith = require('gulp.spritesmith');
// Подключаем imagemin - сжатие изображий
// var imagemin    = require('gulp-imagemin');
// var buffer      = require('vinyl-buffer');
// Размер файла
// var fileSize    = require('gulp-size');
// Подключаем конифг из файла
// var config      = require('../config').sprite;
// var configParam = require('../config').spriteParam;

// Таск создания спрайтов
// function spritePng() {
// 	var spriteData =
// 			    gulp.src(config.src)
// 			    // Настройки https://github.com/twolfson/gulp.spritesmith
// 					    .pipe(spritesmith(configParam));
//
// 	// Сжимаем файлы изобржения, затем располагаем в месте назначения
// 	spriteData.img
// 	// Достает из потока для imagemin
// 			.pipe(buffer())
// 			.pipe(imagemin({
// 				optimizationLevel: 5,
// 				progressive      : true,
// 				interlaced       : true
// 			}))
// 			// Измеряем размер файла
// 			.pipe(fileSize({
// 				gzip     : true,
// 				showFiles: true
// 			}))
// 			.pipe(gulp.dest(config.dest));
//
// 	// Указываем где сохранить файл стилей
// 	spriteData.css.pipe(gulp.dest(config.css));
//
// 	return spriteData;
// }
//
// gulp.task('spritePng', gulp.series(spritePng));