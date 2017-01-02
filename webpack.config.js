var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',

  entry: {
    'polyfills': './app/polyfills.ts',
    'vendor': './app/vendor.ts',
    'app': './app/app.ts'
  },

  output: {
    path: path.join('dist'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    extensions: ['', '.ts', '.js']
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/i,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.css$/,
        exclude: path.join('app'),
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new ExtractTextPlugin('[name].css'),

    new HtmlWebpackPlugin({
      template: 'app/index.html'
    })
  ]
};
