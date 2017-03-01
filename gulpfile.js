var gulp = require('gulp');
var $ = require('gulp-load-plugins')(); //便利使用gulp模块,这个模块需要()进行实例化调用
var open = require('open');

var app={  //声明全局变量，用来定义目录路径。
	srcPath:'src/',
	devPath:'build/',
	prdPath:'dist/'
};

//gulp操作都是在pipe()流里面进行代码操作的

//创建task任务
gulp.task('lib',function () {  //用来copy依赖模块
	gulp.src('bower_components/**/*.js')  //读取文件
	.pipe(gulp.dest(app.devPath + 'vendor')) //对读取的文件进行操作(copy),dest为写入位置
	.pipe(gulp.dest(app.prdPath + 'vendor'))	//对读取的文件进行操作(copy),dest为写入位置
	.pipe($.connect.reload()); //刷新浏览器（仅限高级浏览器除IE）
});

gulp.task('html',function(){
	gulp.src(app.srcPath + '**/*.html')  //读取文件
	.pipe(gulp.dest(app.devPath)) //对读取的文件进行操作(copy),dest为写入位置
	.pipe(gulp.dest(app.prdPath))	//对读取的文件进行操作(copy),dest为写入位置
	.pipe($.connect.reload());
});

gulp.task('json',function(){
	gulp.src(app.srcPath + 'data/**/*.json')  //读取文件
	.pipe(gulp.dest(app.devPath + 'data')) //对读取的文件进行操作(copy),dest为写入位置
	.pipe(gulp.dest(app.prdPath + 'data'))	//对读取的文件进行操作(copy),dest为写入位置
	.pipe($.connect.reload());
});

gulp.task('less',function(){
	gulp.src(app.srcPath + 'style/**/*.less') //读取文件
	.pipe($.plumber()) //发生错误不会终止后续进程
	.pipe($.less())  //使用less对文件进行编译/直接可以使用$来调取gulp插件进行操作
	.pipe(gulp.dest(app.devPath + 'css')) //把文件copy到开发环境
	.pipe($.cssmin())  //放入生产环境之前需要进行代码压缩
	.pipe(gulp.dest(app.prdPath + 'css'))
	.pipe($.connect.reload());
});

gulp.task('js',function(){
	gulp.src(app.srcPath + 'script/**/*.js')
	.pipe($.plumber()) //发生错误不会终止后续进程
	.pipe($.concat('index.js'))  //对文件进行合并到index.js
	.pipe(gulp.dest(app.devPath + 'js')) //发布开发环境
	.pipe($.uglify())  //js代码进行压缩
	.pipe(gulp.dest(app.prdPath + 'js')) //发布生产环境
	.pipe($.connect.reload());
});

gulp.task('image',function(){
	gulp.src(app.srcPath + 'image/**/*')
	.pipe($.plumber()) //发生错误不会终止后续进程
	.pipe(gulp.dest(app.devPath + 'image'))
	.pipe($.imagemin())
	.pipe(gulp.dest(app.prdPath + 'image'))
	.pipe($.connect.reload());
});

gulp.task('build',['image','js','less','lib','html','json']); //执行所有的任务

gulp.task('clean',function(){  //发布之前把开发环境与生产环境文件清空
	gulp.src([app.devPath,app.prdPath])
	.pipe($.clean());
});

gulp.task('serve',['build'],function(){
	$.connect.server({  //启动web服务器
		root:[app.devPath], //选择服务器读取路径
		livereload:true,   //自动刷新浏览器(高级浏览器)，ie不支持
		port:1234   //定义端口号
	});
	open('http://localhost:1234'); //自动打开浏览器
	gulp.watch('bower_components/**/*',['lib'])
	gulp.watch(app.srcPath + '**/*.html',['html'])
	gulp.watch(app.srcPath + 'data/**/*.json',['json'])
	gulp.watch(app.srcPath + 'style/**/*.less',['less'])
	gulp.watch(app.srcPath + 'script/**/*.js',['js'])
	gulp.watch(app.srcPath + 'image/**/*',['image'])

});

gulp.task('default',['serve']);//执行默认操作