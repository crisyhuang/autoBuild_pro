### gulp_project
#### web_1.0
- 运行命令：gulp build_dist
- npm包： npm install --save-dev gulp del gulp-less gulp-cssnano gulp-uglify gulp-imagemin gulp-file-include
gulp-rev gulp-rev-collector
- 支持功能：删除文件、less 编译、压缩css/js/images、添加版本号、html included；
- 尚未支持：gulp build_dev

#### web_2.0
- 运行命令：见 package.json/scripts
- 改进：
   - 支持 gulp build-dev，添加了实时重载功能
   - 优化目录结构
   - 每条 gulp 命令对应一个文件，统一放在 tasks 文件夹中