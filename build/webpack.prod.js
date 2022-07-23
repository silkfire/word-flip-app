import TerserPlugin from 'terser-webpack-plugin'
import CssMinimizerWebpackPlugin from 'css-minimizer-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CompressionPlugin from 'compression-webpack-plugin'
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

import { merge } from 'webpack-merge'
import common from './webpack.common.js'

export default merge(common, {
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
              envName: 'production',
            },
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          enforce: true,
          test: /[\\/]node_modules[\\/]/,
          name: (module) => {
            // console.log(module.context);
            // console.log(module.context.match(/[\\/]node_modules[\\/](@babel|scheduler|object-assign|regenerator-runtime|prop-types)/));

            // eslint-disable-next-line max-len
            if (module.context.match(/@babel|@emotion|scheduler|object-assign|regenerator-runtime|prop-types|styled-components|shallowequal/)) return 'core'
            if (module.context.match(/react([\\]|-dom|-hot-loader)/)) return 'react'
            // if (module.context.match(/[\\/]node_modules[\\/]sanitize\.css/)) return 'sanitize';
            return 'vendor'
          },
        },
      },
    },
    minimizer: [
      // Minify JS
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          output: {
            comments: false,
          },
        },
        extractComments: false,
      }),

      // Minify CSS
      new CssMinimizerWebpackPlugin({
        parallel: true,
        minimizerOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
      }),
    ],
  },
  plugins: [
    // Persist CSS modules to individual files
    new MiniCssExtractPlugin({
      filename: ({ chunk: { name } }) => `${name === 'vendor' ? 'sanitize' : '[name]'}.[contenthash:12].css`,
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

    // new BundleAnalyzerPlugin(),
  ],
})
