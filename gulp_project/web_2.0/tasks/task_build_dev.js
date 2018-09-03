const browserSync = require('browser-sync').create(); // 实时重载
const reload = browserSync.reload;
const del = require('del'); // 删除文件
const less = require('gulp-less'); // less 编译
const fileinclude = require('gulp-file-include'); // include html 文件

module.exports = function (gulp) {
    gulp.task('build_dev', ['clean:dev'], function () {
        gulp.start('build:dev');
    });

    gulp.task('build:dev', ['less:dev', 'css:dev', 'js:dev', 'image:dev'], function () {
        gulp.start('serve:dev');
    });

    gulp.task('serve:dev', ['tpl:dev'], function () {
        gulp.start('browser-sync:dev');
    });

    gulp.task('clean:dev', function () {
        return del('dev/**/*');
    });

    gulp.task('less:dev', function () {
        return gulp.src(['src/css/**/*.less'])
            .pipe(less())
            .pipe(gulp.dest('dev/css'))
            .pipe(reload({stream: true}));
    });

    gulp.task('css:dev', function () {
        return gulp.src('src/css/**/*.css')
            .pipe(gulp.dest('dev/css'));
    });

    gulp.task('js:dev', function () {
        return gulp.src('src/js/**/*.js')
            .pipe(gulp.dest('dev/js'));
    });

    gulp.task('image:dev', function () {
        return gulp.src('src/images/**/*')
            .pipe(gulp.dest('dev/images'));
    });

    gulp.task('tpl:dev', function () {
        return gulp.src([ 'src/tpl/**/*.html', '!src/tpl/pub/*.html'])
            .pipe(fileinclude({
                prefix: '@@',
                basepath: '@file'
            }))
            .pipe(gulp.dest('dev/tpl'));
    });

    gulp.task('browser-sync:dev', function () {
        browserSync.init({
            server: './dev',
            startPath: '/tpl',
            files: ['./dev/**/*.*']
        });

        gulp.watch('src/css/*.less', ['less:dev']);
        gulp.watch('src/css/*.css', ['css:dev']);
        gulp.watch('src/js/*.js', ['js:dev']);
        gulp.watch('src/images/*.*', ['image:dev']);
        gulp.watch('src/tpl/**/*.html', ['tpl:dev']);
    });
}