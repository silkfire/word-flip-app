// process.traceDeprecation = true;

const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const dotenv = require('dotenv-webpack');

const pathJoinUnix = (...arg) => path.join(...arg).replace(/\\/g, '/');

const srcPath = path.join(__dirname, '../src');
const distPath = path.join(__dirname, '../dist');
// TOOD: Use Asset Modules instead: https://webpack.js.org/guides/asset-modules/
module.exports = {
  entry: {
    app: [path.join(srcPath, 'index.js')],
  },
  output: {
    path: distPath,
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: {
          loader: 'svg-url-loader',
          options: { },
        },
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: pathJoinUnix(srcPath, 'favicon.*'), to: `${distPath}/[name][ext]` },
      ],
    }),
    new HtmlWebpackPlugin({
      title: 'Word Flip App',
      template: path.join(srcPath, 'index.html'),
      minify: {
        removeScriptTypeAttributes: true,
      },
      cache: false,
      scriptLoading: 'defer',
      inject: 'body',
    }),
    new CleanWebpackPlugin(),

    // Load environment variables from .env
    // new dotenv()
  ],
  resolve: {
    alias: {
      '~': srcPath,
    },
  },
};
