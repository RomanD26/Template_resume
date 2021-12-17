
const {
    src,
    dest,
    parallel,
    series,
    watch
} =                 require('gulp'),
    browserSync =   require('browser-sync').create(),
    fileInclude =   require('gulp-file-include'),
    changed =       require('gulp-changed'),
    cleanDist =     require('gulp-clean'),
    imageMin =      require('gulp-imagemin'),
    sass  =         require('gulp-sass')(require('sass')),
    rename =        require('gulp-rename'),
    uglify =        require('gulp-uglify-es').default;

let project_folder = 'dist';
let sourse_folder = 'src';

let path = {
    build: {
        html: project_folder + '/',
        css: project_folder + '/css/',
        js: project_folder + '/js',
        img: project_folder + '/img'
    },
    src: {
        html: [sourse_folder + '/*.html', '!' + sourse_folder + '/_*.html'],
        css: sourse_folder + '/scss/*.scss',
        js: sourse_folder + '/js/*.js',
        img: sourse_folder + '/img/**/*.{jpg, png, svg, gif, ico, webp}'
    },
    
    clean: project_folder + '/*'
}
// если в dist копируется только .jpg нужно изменить запись форматов с /*.{jpg, png, svg, gif, ico, webp} на /*.+(png|jpg|gif|ico|svg|webp)

function clear() {
    return src(path.clean, {
        read: false
    })
        .pipe(cleanDist());
}

// html

function html() {
    return src(path.src.html)
        .pipe(fileInclude())
        .pipe(dest(path.build.html))
        .pipe(browserSync.stream())
}

// CSS

function scss() {
    return src(path.src.css)
        .pipe(changed(path.src.css))
        .pipe(
            sass({
                outputStyle: 'expanded'
            })
        )
        .pipe(dest(path.build.css))
        .pipe(
            rename({
                extname: '.min.css'
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browserSync.stream())
}

// JS

function js() {
    return src(path.src.js)
        .pipe(changed(path.src.js))
        .pipe(dest(path.build.js))
        .pipe(
            uglify()
        )
        .pipe(
            rename({
                extname: '.min.js'
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browserSync.stream())
}

// Optimize images

function img() {
    return src(path.src.img)
        .pipe(imageMin())
        .pipe(dest(path.build.img))
        .pipe(browserSync.stream())
}

// Watch files

function watchFiles() {
    watch('./src/**/*.html', html);
    watch('./src/scss/**/*.scss', scss);
    watch('./src/js/**/*.js', js);
    watch('./src/img/**/*.{jpg, png, svg, gif, ico, webp}', img);
}

// BrowserSync

function showBrowserSync(done) {
    browserSync.init({
        server: {
            baseDir: './' + project_folder + '/'
        },
        port: 3000,
        notify: false
    });
    done();
}

exports.watch = parallel(watchFiles, showBrowserSync);
exports.default = series(clear, parallel(html, scss, js, img));

// Start: gulp watch
