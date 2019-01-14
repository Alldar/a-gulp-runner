# Gulp 4 таск ранер

## Начало работы

1. Установить [Node.js](https://nodejs.org/en/) последнюю LTS версию
2. Обновить npm npm install -g npm
3. Установить [gulpjs 4](http://gulpjs.com/)npm install -g gulp и [browsersync](http://browsersync.io) npm install -g browser-sync
4. В консоли перейти в директорию с проектом с помощью команды cd путь/до/шаблона
5. Запустить команду npm install
6. После этого можно запустить дефолтную задачу командой gulp (в директории с шаблоном)

## Задачи

Все задачи находятся в папке [gulp/tasks](gulp/tasks), файл [gulp/config.js](gulp/config.js) отвечает за конфигурацию задач.
### Список задач

1. `gulp` - стандартная задача, запускает все задачи описанные выше и следит за изменениями в файлах запуская перегенерацию/обновление контента
2. `gulp js` - файл [gulp/tasks/javascript.js](gulp/tasks/javascript.js) отвечает за сборку js файлов, забирая исходники из этой папки **source/js**, собирает в один файл, сжимает с помощью uglifyjs (настройки сжатия находятся в файле [gulp/config.js](gulp/config.js#L139)).
**Внимание:** отслеживается файл main.js, в него можно импортировать другие файлы из source/js например конструкцией **@@include 'относительный_путь_до_файла'**;
3. `gulp sass` запускает генерацию из source/sass/*.scss файлов в css и отправляет их в папку **/css**, генерируются только файлы в корне и без префикса _ в имени (т.е. файл _test.scss останется нетронутым, а файл test.scss сгенерируется в файл test.css). Настройки сжатия генерируемых файлов находится в файле [gulp/config.js](gulp/config.js#L32). Подробнее о типах сжатия на сайте [sass-lang.com](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#output_style). Так же в папке **/css/map** создается карта css (source map), она помогает найти где находятся css свойства в оригинальных scss файлах (поддержку карт нужно выключить в настройках инструментов разработчиков [Chrome](https://developer.chrome.com/devtools/docs/settings)/[FireFox](https://developer.mozilla.org/en-US/docs/Tools/Debugger/How_to/Use_a_source_map)), поэтому имеет смысл загружать на сервер и css и исходники scss.
Отдельно заслуживает упоминание тo, что сгенерированный файл обрабатывается с помощью [postcss](https://github.com/postcss/postcss), а конкретно плагином [autoprefixer](https://github.com/postcss/autoprefixer) (он добавляет вендорные префиксы в зависимости от параметров [gulp/config.js](gulp/config.js#L52) и файла [.browserslistrc](.browserslistrc), подробнее о статистики поддержки браузеров можно почитать тут [browserslist](https://github.com/browserslist/browserslist)) и [postcss-flexbugs-fixes](https://github.com/luisrudge/postcss-flexbugs-fixes) (помогает избежать багов при использовании flexbox)
4. `gulp build` - файл [gulp/tasks/javascript.js](gulp/tasks/server-build.js) отвечает за однократную сборку sass и js файлов.
5. `gulp images` - файл [gulp/tasks/images.js](gulp/tasks/images.js) отвечает за сжатие изображений, эта задаче берет файлы из папки **source/images/assets** сжимает их и переносит в папку **images/**
6. `gulp browserSync` - файл [gulp/tasks/browserSync.js](gulp/tasks/browserSync.js) запускает прокси сервер для livereload (обновления css/js/изображений сразу после их изменения в проекте автоматически). Настройки для него находятся в файле [gulp/config.js](gulp/config.js#L9). Внимательно прочитайте комментарии к настройкам в этом файле и только после этого запускайте задачу
7. Стоит отдельно в нем отметить параметр `serverReloadDelay: 2000`, [gulp/config.js](gulp/config.js#L4) это время задержки при обновлении страницы. Данная опция необходима browserSync, если ваш файл не моментально обновляется на удаленном сервере.
[Подробнее о browserSync](https://www.browsersync.io/)

### Вспомогательные задачи
1. `gulp sprite` - задача генерирует спрайты из svg в папке **source/images/sprite** и сохраняет их в папку **/images/svg/** при этом генерирует файл с scss переменными в [source/sass/helpers/_sprite-svg.scss](source/sass/helpers). Умеет работать как с чистым css так и с less/scss/styl. Настройки в файле [gulp/config.js](gulp/config.js#L97)
2. `gulp clear-cache` - необходим для очистки кеша в котором сохранились пути до js файлов при их удалении, если ваш файл js генерируется не верно (там есть файлы которых физически уже нет на диске) попробуйте запустить эту команду

Все строки в файлах задач имеют комментарии, поэтому не стесняйтесь их читать, что бы лучше понять, как и что работает.

### Проблемы

1. При работе с phpStorm/webStrom необходимо запускать задачи через внутренний таск ранер
![Интерфейс phpstorm - настройка Gulp](http://i.imgur.com/eIC1Eg2.png)
-Upload changed files automatically to the default server - Always
-Upload external changes - Yes
![Интерфейс phpstorm - настройки ftp](http://i.imgur.com/sVHDAdS.png)
В противном случае не всегда при изменении scss файла, на сервер сразу отправляется и css.

## Licence

[GPL](LICENSE)