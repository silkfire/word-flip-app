const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const dotenv = require('dotenv-webpack');

const distPath = path.resolve(__dirname, 'dist');

module.exports = {
  context: path.resolve(__dirname),
  entry: {
    app: ['./src/index.js']
  },
  output: {
    path: distPath,
    publicPath: '/',
    filename: 'assets/[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: {
            loader: 'svg-url-loader',
            options: { }
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './src/favicon.*', to: distPath, flatten: true },
    ]),
    new HtmlWebpackPlugin({
      title: 'Word Flip App',
      template: './src/index.html'
    }),
    new CleanWebpackPlugin(),
    
    new webpack.DefinePlugin({ 'process.env.MAX_SENTENCE_COUNT': 10 })
    // Load environment variables from .env
    // new dotenv()
  ],
  resolve: {
    alias: {
      ['~']: path.resolve(__dirname, 'src')
    }
  },
};