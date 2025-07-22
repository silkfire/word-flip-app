import webpack from 'webpack'
import { merge } from 'webpack-merge'

import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin'

import common from './webpack.common.js'

export default merge(common, {
  mode: 'development',
  entry: {
    app: ['webpack-hot-middleware/client'],
  },
  output: {
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              injectType: 'singletonStyleTag',
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.js', '.jsx'],
        },
        use: [
          {
            loader: 'babel-loader',
            options: {
              envName: 'development',
              plugins: ['react-refresh/babel'],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshPlugin({
      overlay: {
        sockIntegration: 'whm',
      },
    }),
  ],
  devtool: 'inline-source-map',
})
