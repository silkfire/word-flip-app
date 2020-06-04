const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionPlugin = require('compression-webpack-plugin');

const merge = require('webpack-merge');
const common = require('./webpack.common');
// const generateScopedName = require('./createUniqueIdGenerator');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[contenthash:12].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // Inject the CSS bundle at the bottom of the <head> tag of index.html
          MiniCssExtractPlugin.loader,

          // Parses CSS files into JS objects (used as input for MiniCssExtractPlugin)
          {
            loader: 'css-loader',
            options: {
              modules: {
                context: path.join(__dirname, '/..'),
                localIdentName: '[hash:base64:6]',
                // getLocalIdent: (context, localIdentName, localName) => generateScopedName(localName, context.resourcePath, true, 'css-loader'),
              },
            },
          },
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
              envName: 'production',
              plugins: [
                // ['react-css-modules', { generateScopedName }],
                ['react-css-modules', { generateScopedName: '[hash:base64:6]' }],
              ],
            },
          },
        ],
      },
    ],
  },
  optimization: {
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          enforce: true,
          test: /[\\/]node_modules[\\/]/,
          name: (module) => {
            // console.log(module.context);
            // console.log(module.context.match(/[\\/]node_modules[\\/](@babel|scheduler|object-assign|classnames|regenerator-runtime|prop-types)/));

            if (module.context.match(/@babel|babel-plugin-react-css-modules|scheduler|object-assign|classnames|regenerator-runtime|prop-types/)) return 'core';
            if (module.context.match(/react([\\/]|-dom|-hot-loader)/)) return 'react';
            // if (module.context.match(/[\\/]node_modules[\\/]sanitize\.css/)) return 'sanitize';
            return 'vendor';
          },
        },
      },
    },
    minimizer: [
      // Minify JS
      new TerserPlugin({
        cache: true,
        parallel: true,
        terserOptions: {
          output: {
            comments: false,
          },
        },
        extractComments: false,
      }),

      // Minify CSS
      new OptimizeCssAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
      }),
    ],
  },
  plugins: [
    // Persist CSS modules to individual files
    new MiniCssExtractPlugin({
      chunkFilename: ({ chunk: { name } }) => `${name === 'vendor' ? 'sanitize' : '[name]'}.[contenthash:12].css`,
    }),

    new CompressionPlugin({
      filename: 'gz/[file].gz',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 0,
      minRatio: 1,
      deleteOriginalAssets: false,
    }),

    new CompressionPlugin({
      filename: 'br/[file].br',
      algorithm: 'brotliCompress',
      test: /\.js$|\.css$|\.html$/,
      compressionOptions: { level: 11 },
      threshold: 0,
      minRatio: 1,
      deleteOriginalAssets: false,
    }),

    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime/]),

    // new BundleAnalyzerPlugin(),
  ],
});
