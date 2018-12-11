var gulp = require("gulp");


// 复制文件
gulp.task("copy-index",function(){
	return gulp.src("index.html").pipe(gulp.dest("dist")).pipe(connect.reload())
});
gulp.task("copy-html",function(){
	return gulp.src("html/**/*.html").pipe(gulp.dest("dist/html")).pipe(connect.reload())
});

// 复制图片
gulp.task("images",function(){
	return gulp.src("src/images/**/*").pipe(gulp.dest("dist/src/images")).pipe(connect.reload())
});
gulp.task("fonts",function(){
	return gulp.src("src/fonts/**/*").pipe(gulp.dest("dist/src/fonts")).pipe(connect.reload())
});
gulp.task("js",function(){
	return gulp.src("src/js/**/*").pipe(gulp.dest("dist/src/js")).pipe(connect.reload())
});
gulp.task("json",function(){
	return gulp.src("src/json/**/*").pipe(gulp.dest("dist/src/json")).pipe(connect.reload())
});
gulp.task("php",function(){
	return gulp.src("src/php/**/*").pipe(gulp.dest("dist/src/php")).pipe(connect.reload())
});

// 一次执行多个任务
gulp.task("bulid",['copy-index','images','fonts','js','json','php','sass','copy-html'],function(){
	console.log("编译成功");
});

// 监听
gulp.task("watch",function(){
	gulp.watch("index.html",["copy-index"]);
	gulp.watch("src/images/**/*",["images"]);
	gulp.watch("src/fonts/**/*",["fonts"]);
	gulp.watch("src/js/**/*",["js"]);
	gulp.watch("src/json/**/*",["json"]);
	gulp.watch("src/php/**/*",["php"]);
	gulp.watch("src/sass/**/*",["sass"]);
	gulp.watch("html/**/*.html",["copy-html"]);
});

var sass = require("gulp-sass-china");
var rename = require("gulp-rename");
const minifyCSS = require("gulp-minify-css");
gulp.task("sass",function(){
	return gulp.src("src/sass/**/*").pipe(sass({outputStyle:'expanded'})).pipe(gulp.dest('dist/src/css')).pipe(minifyCSS()).pipe(rename("index.min.css")).pipe(gulp.dest("dist/src/css")).pipe(connect.reload())
});

var connect = require("gulp-connect");

gulp.task("server",function(){
	connect.server({
		root:'dist',
		port:999,
		livereload:true
	});
})
gulp.task("default",['watch','server'],function(){})


