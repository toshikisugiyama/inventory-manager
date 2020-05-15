const mix = require('laravel-mix')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
.webpackConfig({
  module: {
    rules: [{
      test: /\.pug$/,
      oneOf: [
        {
          resourceQuery: /^\?vue/,
          use: ['pug-plain-loader']
        },
        {
          use: ['raw-loader', 'pug-plain-loader']
        }
      ]
    }]
  }
})
.browserSync({
  proxy: '0.0.0.0:80',
  open: false,
  files: [
    'resources/**/*',
    'public/**/*'
  ]
})
.ts('resources/ts/app.ts', 'public/js/app.js')
.sass('resources/sass/app.scss', 'public/css')
.version()
