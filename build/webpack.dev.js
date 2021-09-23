import webpack from 'webpack'
import { merge } from 'webpack-merge'

import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin'

import common from './webpack.common'

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
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshPlugin(),
  ],
  devtool: 'inline-source-map',
})
