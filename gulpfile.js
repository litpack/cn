const gulp = require('gulp');
const jsonEditor = require('gulp-json-editor');
const clean = require('gulp-clean');
const shell = require('gulp-shell');

const paths = {
  package: './package.json',
  dist: './dist',
  distPackage: './dist-package',
};

gulp.task('clean-dist-package', () => {
  return gulp.src(paths.distPackage, { read: false, allowEmpty: true }).pipe(clean());
});

gulp.task('copy-dist', () => {
  return gulp.src(`${paths.dist}/**/*`).pipe(gulp.dest(paths.distPackage));
});

gulp.task('prepare-package-json', () => {
  return gulp
    .src(paths.package)
    .pipe(
      jsonEditor((json) => {
        delete json.scripts;
        delete json.devDependencies;
        json.main = 'index.js';
        json.types = 'index.d.ts';
        return json;
      })
    )
    .pipe(gulp.dest(paths.distPackage));
});

gulp.task('publish', shell.task([`npm publish ${paths.distPackage} --access public`]));

gulp.task(
  'publish-packages',
  gulp.series(
    'clean-dist-package',
    'copy-dist',
    'prepare-package-json',
    'publish',
    'clean-dist-package'
  )
);
