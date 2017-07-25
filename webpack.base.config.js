const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const iframeHTMLExtractor = new ExtractTextPlugin('iframe.html');
const appCSSExtractor = new ExtractTextPlugin('app.magicwidget.css');


module.exports = {
  entry: {
    app: './src/js/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].magicwidget.js',
    library: 'MagicWidget',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    alias: {
      '~': path.resolve(path.join(__dirname, 'src', 'js'))
    },
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: 'babel-loader',
      include: /src\/js/
    },{
      test: /\.(scss|css)$/,
      use: appCSSExtractor.extract({
        use: [
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      }),
      include: /\/src\/css/
    },{
      test: path.resolve(path.join(__dirname, 'src', 'html', 'iframe.html')),
      loader: iframeHTMLExtractor.extract('html-loader?interpolate')
    }]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    appCSSExtractor
  ],
};
