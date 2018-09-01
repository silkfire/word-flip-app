const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(common, {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  optimization: {
    // Consolidate all CSS imports (used as input for MiniCssExtractPlugin)
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'app',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    },
    minimizer: [
      // Minify JS
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),

      // Minify CSS
      new OptimizeCSSAssetsPlugin()
    ]
  },
  plugins: [
    // Bundle all CSS into one file
    new MiniCssExtractPlugin({
      filename: 'assets/[name].css',
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // Inject the CSS bundle at the bottom of the <head> tag of index.html
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/'
            }
          },
          // Parses CSS files into JS objects
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[hash:base64:6]'
            }
          }
        ]
      },

      // Converts React code into ES code with Babel
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              envName: 'production'
            }
          }
        ],
      },
    ]
  }
});