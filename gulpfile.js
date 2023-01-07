const { src, dest, task, series, watch, parallel } = require("gulp");
const rm = require("gulp-rm");
const sass = require("gulp-sass")(require("node-sass"));
const concat = require("gulp-concat"); 
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;
const sassGlob = require("gulp-sass-glob");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const env = process.env.NODE_ENV;

const { SRC_PATH, DIST_PATH, STYLE_LIBS } = require("./gulp.config");

task("clean", () => {
    return src( `${DIST_PATH}/**/*`, { read: false }).pipe( rm() );
});

task ("styles", () => {
    return src([...STYLE_LIBS, `${SRC_PATH}/styles/main.scss`])
    .pipe(gulpif(env === "dev", sourcemaps.init()))
    .pipe(concat("main.min.scss"))
    .pipe(sassGlob())
    .pipe(sass().on("error", sass.logError))
    .pipe(
        gulpif(env === "prod",
            autoprefixer({
            cascade: false
            })
        )
    )
    .pipe(gulpif(env === "prod", cleanCSS()))
    .pipe(gulpif(env === "dev", sourcemaps.write()))
    .pipe(dest(`${DIST_PATH}`))
    .pipe(reload({ stream: true }));
});

task("copy:html", () => {
    return src(`${SRC_PATH}/*.html`).pipe(dest(`${DIST_PATH}`)).pipe(reload({ stream: true }));
});

task ("copy:icons", ()=> {
    return src(`${SRC_PATH}/img/**`).pipe(dest(`${DIST_PATH}/img`));
})
task ("copy:js", ()=> {
    return src(`${SRC_PATH}/script/**`).pipe(dest(`${DIST_PATH}/script`)).pipe(reload({ stream: true }));
})
task("watch", () => {
    watch(`./${SRC_PATH}/styles/**/*.scss`, series("styles"));
    watch(`./${SRC_PATH}/*.html`, series("copy:html"));
    watch(`./${SRC_PATH}/img/**`, series("copy:icons"));
    watch(`./${SRC_PATH}/script/**`, series("copy:js"));
});


task ("server", () => {
    browserSync.init({
        server: {
            baseDir: `./${DIST_PATH}`
        },
        open: false,
    });
});

task(
    "build",
    series(
    "clean",
    parallel("copy:html", "styles", "copy:icons", "copy:js"))
);


task(
    "default",
    series("clean",
    parallel("copy:html", "styles", "copy:icons", "copy:js"),
    parallel("watch", "server"))
);