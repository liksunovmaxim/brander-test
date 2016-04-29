var gulp = require('gulp'),
    watch = require('gulp-watch'),
    concat = require('gulp-concat'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-minify-css'),
    rename = require('gulp-rename'),
  	plumber = require('gulp-plumber'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),    
    browserSync = require("browser-sync"),
    mainBowerFiles = require("main-bower-files"),
    rimraf = require('rimraf'),
    reload = browserSync.reload;

var path = {
  build : {
    html: 'build',
  	js: 'build/js',
    style: 'build/css',
    img: 'build/images/',
    fonts: 'build/fonts/'
  },
  src: {
  	html: 'src/*.jade',
  	js: 'src/js/*.js',
    style: 'src/sass/*.*',
    img: 'src/images/**/*.*',
    fonts: 'src/fonts/**/*.*'    
  },
  watch: {
    html: 'src/**/*.jade',
    js: 'src/js/**/*.js',
    style: 'src/sass/**/*.*',
    img: 'src/images/**/*.*',
    fonts: 'src/fonts/**/*.*'     
  },
  clean: './build'

};

var config = {
    server: {
        baseDir: "build"
    },
    tunnel: false,
    host: 'localhost',
    port: 8080,
    logPrefix: "Holz"
};

gulp.task('bower:build', function() {
    gulp.src(mainBowerFiles('**/*.js'))
        .pipe(uglify())
        .pipe(rename({suffix:".min"}))
        .pipe(gulp.dest(path.build.js));    
    gulp.src(mainBowerFiles('**/*.scss'))
        .pipe(gulp.dest('src/sass/'));        
    gulp.src(mainBowerFiles('**/*.sass'))
        .pipe(gulp.dest('src/sass/'));         
});

gulp.task('html:build', function () {
    gulp.src(path.src.html) //Найдем наш main файл
    .pipe(jade({pretty: true}))
    .on('error', console.log)
    .pipe(gulp.dest(path.build.html)) 
    .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js) //Найдем наш main файл
        // .pipe(uglify())
        // .pipe(rename({suffix: ".min"}))
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
        .pipe(reload({stream: true})); //И перезагрузим сервер
});

gulp.task('style:build', function () {
    gulp.src(path.src.style) //Выберем наш main.scss
	// .pipe(plumber())
    // .pipe(sass()) //Скомпилируем
    .pipe(sass().on('error', sass.logError))
    .pipe(prefixer()) //Добавим вендорные префиксы
    // .pipe(cssmin())
    // .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest(path.build.style)) //И в build
    .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img) //Выберем наши картинки
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img)) //И бросим в build
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
        .pipe(reload({stream: true}));
});

gulp.task('build', ['html:build', 'js:build', 'style:build', 'fonts:build', 'image:build']);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });  
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });    
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);