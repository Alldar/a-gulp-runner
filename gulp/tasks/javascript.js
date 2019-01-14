// Подключаем gulp
var gulp         = require('gulp');
// Подключаем concat - Объединение файлов
var concat       = require('gulp-concat');
// Подключаем uglify - углификация файла
var uglify       = require('gulp-uglify');
// Подключаем rename - переименования файла
var rename       = require('gulp-rename');
// Подключаем cache - кешируем файлы
var cache        = require('gulp-cache');
// Подключаем header - используется для добаление текста в шапку файла
var header       = require('gulp-header');
// Не падаем при ошибки
var handleErrors = require('../util/handleErrors');
// Подключаем конифг из файла
var config       = require('../config').js;
// Читаем параметры из package.json
var pkg          = require('../../package.json');
// Добавляем import в js
var jsImport     = require('gulp-file-include');
// Подключаем конифг с настройками углификации
var compress     = require('../config').uglify;
// Размер файла
var fileSize     = require('gulp-size');
// Подключаем browserSync
var browserSync  = require('browser-sync');

// Это баннер который добавляется вверх файла финальным js .min т.к. углификации убирает комменты сюда можно добавить необходимый копирайт
var banner = [
	'/**',
	'<%= pkg.name %> \n'+
	'@author: <%= pkg.maintainers[0].name %>, ' +
	'@website: <%= pkg.maintainers[0].web %>, ' +
	'@version: v<%= pkg.version %> \n' +
	'External lib: ' +
	' **/'
].join('\n');

function scripts(done) {
	return (
			gulp
				.src([
					'source/js/main.js'
				])
				.pipe(jsImport({
					prefix: '@@',
					basepath: '@file'
				}))
				// Объеденяем в файл app.js
				.pipe(concat('app.js'))
				// не даем упасть gulp с ошибкой
				.on('error', handleErrors)
				// Кидаем его в папку назначения
				.pipe(gulp.dest(config.dest))
				// Создаем новый файл с префиксом .min.js
				.pipe(rename({
					suffix: '.min'
				}))
				// Сжимаем и делаем углификацию
				.pipe(cache(uglify(compress.settings)))
				// не даем упасть gulp с ошибкой
				.on('error', handleErrors)
				// Добавляем наверх баннер с текстом
				.pipe(header(banner, {
					pkg: pkg
				}))
				// Измеряем размер файла
				.pipe(fileSize({
					gzip     : false,
					showFiles: true
				}))
				// Отправляем в папку назначения
				.pipe(gulp.dest(config.dest))
				// Даем комманду browserSync обновить js
				.pipe(browserSync.reload({
					stream: true
				}))
	);
}

function clear(done) {
	return cache.clearAll(done);
}

gulp.task('js', gulp.series(scripts));
// Очистка кеша файлов иногда при смене локации пишется все еще старый путь
gulp.task('clear-cache', gulp.series(clear));