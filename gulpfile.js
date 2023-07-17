const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

// Static server
gulp.task('server', function() {

    browserSync.init({
        server: {
            baseDir: "dist"
        }
    });

    gulp.watch("src/*html").on('change', browserSync.reload);
});

gulp.task("styles", function() {
  return gulp.src("src/sass/**/*.+(scss|sass)")
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))//компілюємо код, шлях до якого вказали вище. Зжатий стиль коду
    .pipe(rename({
      prefix: "",
      suffix: ".min",
    }))//переіменовуємо наш файл, який компілюється. буде не style.css, a style.min.css
    .pipe(autoprefixer({
			cascade: false
		}))//автопрефікс для будь-якого браузера
    .pipe(cleanCSS({compatibility: 'ie8'}))//очищуємо файл
    .pipe(gulp.dest("dist/css"))//вказуємо шлях, куди буде компілюватися код css
    .pipe(browserSync.stream());//обновляємо сторінку при компіляції
})

gulp.task("watch", function() {
  gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel("styles"))//при зміні вмісту файлів виконується запуск задачі styles, яка в свою чергу після виконання обновить браузер
  gulp.watch("src/*.html").on("change", gulp.parallel("html"))//відстежуємо зміни файла html, і виконуємо задачу browserSync.reload
});


//ПЕРЕНОСИМО ФАЙЛИ В РОБОЧУ ПАПКУ dist із чорнової src, змінюючи деякі

gulp.task('html', function() {//зжатий html переміщаємо в робочу папку dist
  return gulp.src("src/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("dist/"))
});

gulp.task('scripts', function() {//js переміщаємо в робочу папку dist
  return gulp.src("src/js/**/*.js")
    .pipe(gulp.dest("dist/js"))
});

gulp.task('icons', function() {//іконки переміщаємо в робочу папку dist
  return gulp.src("src/icons/**/*")
    .pipe(gulp.dest("dist/icons"))
});

gulp.task('mailer', function() {//mailer переміщаємо в робочу папку dist
  return gulp.src("src/mailer/**/*")
    .pipe(gulp.dest("dist/mailer"))
});

gulp.task('images', function() {//зжимаємо images та переміщаємо в робочу папку dist
  return gulp.src("src/img/**/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/img"))
});

gulp.task("default", gulp.parallel("watch", "server", "styles", "html", "scripts", "icons", "mailer", "images"));//запускаємо паралельно 3 задачі