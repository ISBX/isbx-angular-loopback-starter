var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var helpers = require('./helpers');

module.exports = {
  entry: {
    'polyfills': './client/src/polyfills.ts',
    'vendor': './client/src/vendor.ts',
    'app': './client/src/main.ts'
  },

  resolve: {
    extensions: ['', '.ts', '.js']
  },

  resolveLoader: {
    fallback: [
      path.resolve(__dirname, 'loaders'),
      path.join(process.cwd(), 'node_modules')
    ]
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['ts', 'angular2-template']
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.pug$/,
        loaders: ['html', 'pug-custom?doctype=html']
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('client', 'src', 'app'),
        loader: ExtractTextPlugin.extract('style', 'css')
      },
      {
        test: /\.css$/,
        include: helpers.root('client', 'src', 'app'),
        loader: 'raw'
      },
      {
        test: /\.styl$/,
        exclude: helpers.root('client', 'src', 'app'),
        loader: ExtractTextPlugin.extract('style', 'css!stylus-relative')
      },
      {
        test: /\.styl$/,
        include: helpers.root('client', 'src', 'app'),
        loaders: ['css-to-string', 'css', 'stylus-relative']
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: 'client/src/index.html'
    })
  ]
};
