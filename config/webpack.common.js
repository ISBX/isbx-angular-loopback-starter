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
    extensions: ['.ts', '.js'],
    unsafeCache: true
  },

  resolveLoader: {
    modules: [path.resolve(__dirname, 'loaders'), path.join(process.cwd(), 'node_modules')]
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader', 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.pug$/,
        use: ['html-loader', 'pug-custom-loader?doctype=html']
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: 'file-loader?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('client', 'src', 'app'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.css$/,
        include: helpers.root('client', 'src', 'app'),
        use: 'raw-loader'
      },
      {
        test: /\.styl$/,
        exclude: helpers.root('client', 'src', 'app'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'stylus-relative-loader']
        })
      },
      {
        test: /\.styl$/,
        include: helpers.root('client', 'src', 'app'),
        use: ['css-to-string-loader', 'css-loader', 'stylus-relative-loader']
      },
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: 'client/src/index.html'
    }),

    // https://github.com/angular/angular/issues/11580
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      path.join(__dirname, '')
    )
  ]
};
