const gulp = require('gulp');
const del = require('del'); // 删除文件
const less = require('gulp-less'); // less 编译
const cssnano = require('gulp-cssnano'); // 压缩 CSS
const uglify = require('gulp-uglify'); // 压缩 JS
const imagemin = require('gulp-imagemin'); // 图片优化
const fileinclude = require('gulp-file-include'); // include html 文件
const insert = require('gulp-insert'); // 操作 html 文件

/* build_dist START */
gulp.task('build_dist', ['clean'], function () {
    gulp.start('build');
});

gulp.task('clean', function () {
    return del('dist/**/*');
});

gulp.task('build', ['less', 'css', 'js', 'image'], function () {
    gulp.start('html');
});

gulp.task('less', function () {
    return gulp.src('src/css/**/*.less')
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/static/css'));
});

gulp.task('css', function () {
    return gulp.src('src/css/**/*.css')
        .pipe(cssnano())
        .pipe(gulp.dest('dist/static/css'));
});

gulp.task('js', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/static/js'));
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
       .pipe(gulp.dest('dist/static/images'));
});

gulp.task('html', function () {
   return gulp.src(['src/html/**/*.html', '!src/html/tpl/*.html'])
       .pipe(fileinclude({
           prefix: '@@',
           basepath: '@file'
       }))
       .pipe(insert.transform(function (content) {
           content = content.replace(/\.\.\/(css|js|images)/g, '../static/$1');
           return content;
       }))
       .pipe(gulp.dest('dist/html'))
});
/* build_dist END */
