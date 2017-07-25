const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');

const DashboardPlugin = require('webpack-dashboard/plugin');


module.exports = merge(baseConfig, {
  plugins: [
    new DashboardPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.BASE_URL': JSON.stringify('http://example.com'),
    }),
  ],
});
