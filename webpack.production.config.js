const package = require('./package.json');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');


module.exports = merge(baseConfig, {
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compress: {
        unsafe_comps: true,
        properties: true,
        keep_fargs: false,
        pure_getters: true,
        collapse_vars: true,
        unsafe: true,
        warnings: false,
        screw_ie8: true,
        sequences: true,
        dead_code: true,
        drop_debugger: true,
        comparisons: true,
        conditionals: true,
        evaluate: true,
        booleans: true,
        loops: true,
        unused: true,
        hoist_funs: true,
        if_return: true,
        join_vars: true,
        cascade: true,
        drop_console: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env.BASE_URL': JSON.stringify('https://example.com'),
    }),
    new webpack.BannerPlugin({
      banner: package.name + " JavaScript Library " + package.version + "\n\nCopyright 2017, SupportBee Inc.",
      include: /.*\.(css|js)$/
    })
  ],
});
