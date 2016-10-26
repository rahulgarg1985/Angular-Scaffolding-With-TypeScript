/// <reference path="typings/node/node.d.ts"/>
// set NODE_ENV=prod
var env = process.env.NODE_ENV ? process.env.NODE_ENV : 'prod';

var gulp = require('gulp'),
    browerSync = require("browser-sync"),
    reload = browerSync.reload,
    uglify = require('gulp-uglify'),
    del = require('del'),
    concat = require('gulp-concat'),
    minifyHTML = require('gulp-minify-html'),
    typeScript = require('gulp-typescript'),
    watch = require('gulp-watch'),
    inject = require('gulp-inject'),
    gulpIf = require('gulp-if'),
    sourceMaps = require("gulp-sourcemaps"),
    config = require('./config/' + env),
    plumber = require("gulp-plumber"),
    filter = require('gulp-filter'),
    flatten = require('gulp-flatten'),
    runSequence = require('run-sequence'),
    sass = require('gulp-sass');
    
//angularFilesort = require('gulp-angular-filesort'),
// cache = require('gulp-cache'),
// jshint = require('gulp-jshint'),
// notify = require('gulp-notify'),
// mainBowerFiles = require('main-bower-files'),
//imagemin = require('gulp-imagemin'),

var filterByExtension = function (extension) {
    return filter(function (file) {
        return file.path.match(new RegExp('.' + extension + '$'));
    });
};

var onError = function (err) {
    console.log(err);
};

var plumberSetting = {
    errorHandler: onError
};

function getInjectConfig(name) {
    return {
        ignorePath: '/' + config.root + '/',
        addRootSlash: false,
        starttag: '<!-- inject:' + name + ':{{ext}} -->'
    };
};

function cleanFiles(path, done) {
    console.log('Cleaning:');
    del(path, done);
}

gulp.task('update-ts-ref', function () {

    var target = gulp.src('typings/app.d.ts');
    var sources = gulp.src(['src/**/**/*.ts'], { read: false });
    return target.pipe(inject(sources, {
        starttag: '//{',
        endtag: '//}',
        transform: function (filepath) {
            return '/// <reference path="..' + filepath + '" />';
        }
    })).pipe(gulp.dest('typings'));
});

gulp.task('script', function () {

    console.log("Script Start.");
    cleanFiles(config.root + "/js/**/**/*.js");

    // var tsConfig = {
    //     module: 'commonjs',
    //     removeComments: config.isProd
    // };

    gulp.src(config.assets.lib.js)
        .pipe(plumber(plumberSetting))
        .pipe(gulp.dest(config.root + "/js/lib"));

    if (config.isProd) {

        // compiled all to dev folder and then use 
        gulp.src([
            'src/**/**/*.ts',
            '!src/**/interface/*.ts'
        ]).pipe(plumber(plumberSetting))
            .pipe(typeScript())
            .js
            .pipe(gulp.dest("build/dev/js"));

        // add base files at first so that later file can get referense of them.
        return gulp.src([
            , "!build/dev/js/lib/*"
            , "build/dev/js/**/**/Base*.js"
            , "build/dev/js/**/**/!(*.Module).js"
            , "build/dev/js/**/**/*.Module.js"
        ]).pipe(plumber(plumberSetting))
            .pipe(sourceMaps.init())
            .pipe(concat('app.min.js'))
            .pipe(uglify())
            .pipe(gulpIf(config.isProd, sourceMaps.write('.')))
            .pipe(gulp.dest(config.root + "/js"))
            .pipe(reload({ stream: true }));

    } else {

        return gulp.src([
            'src/**/**/*.ts',
            '!src/**/interface/*.ts'
        ]).pipe(plumber(plumberSetting))
            .pipe(typeScript())
            .js
            .pipe(gulp.dest("build/dev/js"))
            .pipe(reload({ stream: true }));
    }

    console.log("Script End");
});

gulp.task('image', function () {
    return gulp.src('src/**/asset/image/**/*')
    // .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(flatten())
        .pipe(gulp.dest(config.root + "/asset/image"))
        .pipe(reload({ stream: true }));
});

gulp.task('font', function () {
    return gulp.src('src/**/asset/font/**/*')
        .pipe(flatten())
        .pipe(gulp.dest(config.root + "/asset/font"))
        .pipe(reload({ stream: true }));
});

gulp.task('css', function () {
    gulp.src(config.assets.lib.css)
        .pipe(flatten())
        .pipe(gulp.dest(config.root + "/asset/css/lib"));

    //// for sass compilaiton - incase we are using SASS
    // return gulp.src('src/**/asset/css/*.scss')
    //     .pipe(plumber(plumberSetting))
    //     .pipe(sass({
    //         errLogToConsole: true
    //     }))
    //     .pipe(flatten())
    //     .pipe(gulp.dest(config.root + "/asset/css/app"))
    //     .pipe(reload({ stream: true }));

    // for normla css files
    return gulp.src('src/**/asset/css/**/*.css')
        .pipe(flatten())
        .pipe(gulp.dest(config.root + "/asset/css/app"))
        .pipe(reload({ stream: true }));
        
    // we can also concat and minify for production environment as we do for scripts.
    // If required , you may  also maintain the order in case of minificaiton and injection in index.
});


gulp.task('html', function () {
    var opts = {
        conditionals: true,
        spare: true
    };
    return gulp.src('src/**/template/**/*.html')
        .pipe(gulpIf(config.isProd, minifyHTML(opts)))
        .pipe(flatten())
        .pipe(gulp.dest(config.root + "/template"))
        .pipe(reload({ stream: true }));
});

gulp.task('inject', function () {

    console.log("Inject Start.........");

    var libs = [],
        app = [],
        modules = [];

    if (config.isProd) {
        libs = [
            config.root + "/js/lib/angular.min.js",
            config.root + "/js/lib/*.js",
            config.root + "/asset/css/lib/*.css"
        ];

        app = [
            '!' + config.root + "/js/lib/*"
            , config.root + "/js/**/**/*.js"
            , config.root + "/asset/css/app/*.css"
        ];

    } else {
        libs = [
            config.root + "/js/lib/angular.js",
            config.root + "/js/lib/*.js",
            config.root + "/asset/css/lib/*.css"
        ];

        app = [
            '!' + config.root + "/js/lib/*"
            , '!' + config.root + "/js/**/*.Module.js",
            , config.root + "/js/**/**/Base*.js"
            , config.root + "/js/**/**/*.js"
            , config.root + "/asset/css/app/*.css"
        ];

        modules = [
            config.root + "/js/core/Core.Module.js",
            config.root + "/js/app/App.Module.js"

        ];
    }

    return gulp.src(config.root + '/index.html')
        .pipe(inject(gulp.src(libs, { read: false }), getInjectConfig('lib')))
        .pipe(inject(gulp.src(app, { read: false }), getInjectConfig('app')))
        .pipe(inject(gulp.src(modules, { read: false }), getInjectConfig('module')))
        .pipe(gulp.dest(config.root));
});


gulp.task('serve', function () {
    browerSync({
        server: {
            baseDir: config.root
        }
    });
});

gulp.task('index', function () {
    gulp.src('index.html')
        .pipe(gulp.dest(config.root));
});

gulp.task('watch', function () {
    gulp.watch('src/**/**/*.ts', ['script']);
    gulp.watch('src/**/*asset/css/*', ['css']);
    gulp.watch('src/**/template/**/*.html', ['html']);
    gulp.watch('src/**/asset/image/**/*', ['images']);
});

gulp.task('default', function () {
    return runSequence(
        ['index', 'update-ts-ref']
        ,['script', 'image', 'html', 'css', 'font', 'watch']
        ,'inject'
        ,'serve'
        );
});

