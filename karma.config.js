const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');


module.exports = function(config) {
  config.set({
    singleRun: true,
    autoWatch: false,
    browsers: ['Firefox', 'Chrome'],      // run in Firefox and Chrome
    frameworks: [                         // use jasmine and sinon
      'jasmine',
      'sinon'
    ],
    files: [
      'spec/js/**/*Spec.js'               // just load specs files
    ],
    plugins: [
      'karma-jasmine',
      'karma-sinon',
      'karma-mocha-reporter',
      'karma-webpack',
      'karma-firefox-launcher',
      'karma-chrome-launcher'
    ],
    preprocessors: {
      'spec/js/**/*Spec.js': ['webpack'], // preprocess spec files with webpack
      'src/**/*.js': ['webpack']          // preprocess source files with webpack
    },
    reporters: ['mocha'],
    mochaReporter: {
      showDiff: true,
    },
    webpack: merge(baseConfig, {
      devtool: 'inline-source-map',       // just do inline source maps instead of the default
      module: {
        rules: [{
          test: /\.js$/,
          use: 'babel-loader',
          include: /(src\/js|spec\/js)/
        }]
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.BASE_URL': JSON.stringify(''),
        }),
      ]
    }),
    webpackMiddleware: {
      noInfo: true                        // don't spam the console when running in karma
    }
  })
};
