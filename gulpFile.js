/**
 * Created by humorHan on 2017/2/4.
 */
var gulp = require('gulp');
var path = require('path');
var webpack = require('webpack');
var gulpUtil = require('gulp-util');
var webpackConfig = require('./webpack-config.js');
var del = require('del');
var vinylPaths = require('vinyl-paths');

gulp.task('bundle', ['publish-img-dev'], function (done) {
    webpack(webpackConfig(true, true), function (err, stats) {
        if (err) {
            throw new gulpUtil.PluginError('webpack', err);
        }
        gulpUtil.log('[webpack]', stats.toString({colors: true}));
        //done();
    });
});

//发布图片资源
gulp.task('publish-img-dev', ['static-js-dev'], function () {
    return gulp.src(path.join(__dirname, '/img/**/*.*'))
        .pipe(gulp.dest(path.join(__dirname, '/dist/img/')));
});

//发布静态js资源
gulp.task('static-js-dev', function () {
    return gulp.src([path.join(__dirname, '/dep/jquery-3.1.1.js')])
        .pipe(gulp.dest(path.join(__dirname, '/dist/js/')));
});

/*
//线上
gulp.task('package', ['publish-img'], function (done) {
    webpack(webpackConfig(false, false), function (err, stats) {
        if (err) {
            throw new gulpUtil.PluginError('webpack', err);
        }
        gulpUtil.log('[webpack]', stats.toString({colors: true}));
        //done();
    });
});*/

//清理文件夹
gulp.task('del', function () {
    return gulp.src(path.join(__dirname, '/dist'), {read: false})
        .pipe(vinylPaths(del));
});