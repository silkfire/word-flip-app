const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');


module.exports = merge(common, {
  mode: 'development',
  entry: {
    app: ['webpack-hot-middleware/client']
  },
  output: {
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              singleton: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]'
            }
          }
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [ 
                [ 'env', { modules: false } ] 
              ],
              forceEnv: 'development'
            }
          }
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'inline-source-map'
});