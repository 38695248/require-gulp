var gulp = require('gulp'),
    rjs = require('requirejs'),
    config = require('./config.json');

gulp.task('build', function(cb){
    rjs.optimize({
        appDir: 'moblie/require',//应用程序的目录（即<root>）。在这个文件夹下的所有文件将会被复制到dir参数标注的文件夹下。
        baseUrl: './js',//相对于appDir，代表查找文件的锚点（that represents the anchor path for finding files）。
        paths: config.paths,
        dir: 'moblie/app',//这是一个输出目录，所有的应用程序文件将会被复制到该文件夹下
        fileExclusionRegExp: /^(r.js|build.js)$/,//任何与此规则匹配的文件或文件夹都将不会被复制到输出目录。
        optimizeCss: 'standard',////"standard"：标准的压缩方式；"standard.keepLines"：保留换行；"standard.keepComments"：保留注释；"standard.keepComments.keepLines"：保留换行；"none"：不压缩
        //removeCombined: true,//如果为true，优化器（optimizer）将从输出目录中删除已合并的文件。
        modules:config.modules
    }, function(buildResponse){
        // console.log('build response', buildResponse);
        cb();
    }, cb);
});

gulp.task('default', ['build']);