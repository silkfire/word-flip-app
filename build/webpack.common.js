const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const dotenv = require('dotenv-webpack');

const srcPath = path.join(__dirname, '../src');
const distPath = path.join(__dirname, '../dist');

module.exports = {
  context: __dirname,
  entry: {
    app: [path.join(srcPath, 'index.js')],
  },
  output: {
    path: distPath,
    publicPath: '/',
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
    new CopyWebpackPlugin([
      { from: path.join(srcPath, 'favicon.*'), to: distPath, flatten: true },
    ]),
    new HtmlWebpackPlugin({
      title: 'Word Flip App',
      template: path.join(srcPath, 'index.html'),
      minify: {
        removeScriptTypeAttributes: true,
      },
      cache: false,
      scriptLoading: 'defer',
    }),
    new CleanWebpackPlugin(),

    new webpack.DefinePlugin({ 'process.env.MAX_SENTENCE_COUNT': JSON.stringify(10) }),
    // Load environment variables from .env
    // new dotenv()
  ],
  resolve: {
    alias: {
      '~': srcPath,
    },
  },
};
