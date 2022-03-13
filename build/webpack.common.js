// process.traceDeprecation = true;

import path from 'path'
import { fileURLToPath } from 'url'
// eslint-disable-next-line import/default
import CopyPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
// const dotenv = require('dotenv-webpack');

const pathJoinUnix = (...arg) => path.join(...arg).replace(/\\/g, '/')

export const __dirname = path.dirname(fileURLToPath(import.meta.url))
const srcPath = pathJoinUnix(__dirname, '../src')
const distPath = pathJoinUnix(__dirname, '../dist')

export default {
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
        type: 'asset/inline',
      },
      {
        test: /\.js$/,
        resolve: {
          fullySpecified: false
        }
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: pathJoinUnix(srcPath, 'favicon.*'), to: `${distPath}/[name][ext]` },
      ],
    }),
    new HtmlWebpackPlugin({
      title: 'Word Flip App',
      template: pathJoinUnix(srcPath, 'index.html'),
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
}
