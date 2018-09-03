const del = require('del'); // 删除文件
const less = require('gulp-less'); // less 编译
const cssnano = require('gulp-cssnano'); // 压缩 CSS
const uglify = require('gulp-uglify'); // 压缩 JS
const imagemin = require('gulp-imagemin'); // 图片优化
const fileinclude = require('gulp-file-include'); // include html 文件
const rev = require('gulp-rev'); // 添加版本号
const revCollector = require('gulp-rev-collector'); // 替换已添加版本号的文件路径

module.exports = function (gulp) {
    gulp.task('build_dist', ['clean'], function () {
        gulp.start('minify');
    });

    gulp.task('minify', ['less', 'css', 'js', 'image'], function () {
        gulp.start('rev');
    });

    gulp.task('rev', ['revTPL', "revCSS"], function () {
        gulp.start('tpl');
    });

    gulp.task('clean', function () {
        return del('dist/**/*');
    });

    gulp.task('less', function () {
        return gulp.src(['src/css/**/*.less'])
            .pipe(less())
            .pipe(cssnano())
            .pipe(rev())
            .pipe(gulp.dest('dist/static/css'))
            .pipe(rev.manifest())
            .pipe(gulp.dest('dist/rev/css'));
    });

    gulp.task('css', function () {
        return gulp.src('src/css/**/*.css')
            .pipe(cssnano())
            .pipe(rev())
            .pipe(gulp.dest('dist/static/css'))
            .pipe(rev.manifest())
            .pipe(gulp.dest('dist/rev/css'));
    });

    gulp.task('js', function () {
        return gulp.src('src/js/**/*.js')
            .pipe(uglify())
            .pipe(rev())
            .pipe(gulp.dest('dist/static/js'))
            .pipe(rev.manifest())
            .pipe(gulp.dest('dist/rev/js'));
    });

    gulp.task('image', function () {
        return gulp.src('src/images/**/*')
            .pipe(imagemin([
                imagemin.gifsicle({interlaced: true}),
                imagemin.jpegtran({progressive: true}),
                imagemin.optipng({optimizationLevel: 5}),
                imagemin.svgo({
                    plugins: [
                        {removeViewBox: true},
                        {cleanupIDs: false}
                    ]
                })
            ]))
            .pipe(rev())
            .pipe(gulp.dest('dist/static/images'))
            .pipe(rev.manifest())
            .pipe(gulp.dest('dist/rev/images'));
    });

    gulp.task('revTPL', function () {
        return gulp.src(['src/tpl/**/*.html', 'dist/rev/**/*.json'])
            .pipe(revCollector({
                replaceReved: true,
                dirReplacements: {
                    'css': 'static/css',
                    'js': 'static/js',
                    'images': 'static/images'
                }
            }))
            .pipe(gulp.dest('dist/tpl'));
    });

    gulp.task('revCSS', function () {
        return gulp.src(['dist/static/css/**/*.css', 'dist/rev/**/*.json'])
            .pipe(revCollector())
            .pipe(gulp.dest('dist/static/css'));
    });

    gulp.task('tpl', function () {
        return gulp.src([ 'dist/tpl/**/*.html', '!src/tpl/pub/*.html'])
            .pipe(fileinclude({
                prefix: '@@',
                basepath: '@file'
            }))
            .pipe(gulp.dest('dist/tpl'));
    });
}