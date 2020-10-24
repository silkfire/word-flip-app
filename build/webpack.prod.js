const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionPlugin = require('compression-webpack-plugin');

const { merge } = require('webpack-merge');
const common = require('./webpack.common');

const localIdentName = '[sha512:hash:base64:6]';
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
                localIdentName,

                // getLocalIdent: (context, localIdentName, localName) => {
                //   // console.log(generate(localName, context.resourcePath), localName, context.resourcePath);

                //   return generate(localName, context.resourcePath);
                // },

                // localIdentName: '[hash:base64:6]',
                // localIdentName: '[path][name]__[local]',
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
                // ['@dr.pogodin/babel-plugin-react-css-modules', { generateScopedName }],
                ['@babel/plugin-transform-runtime'],
                ['@dr.pogodin/babel-plugin-react-css-modules', {
                  // context: path.join(__dirname, '/../'),
                  generateScopedName: localIdentName,


                  // generateScopedName: (localName, resourcePath) => {
                  //   // console.log('BABEL', generate(a, b), a, b);

                  //   return generate(localName, resourcePath);
                  // },

                }],
                // ['react-css-modules', { generateScopedName: '[hash:base64:6]' }],
                // ['react-css-modules', { generateScopedName: '[path][name]__[local]' }],
              ],
            },
          },
        ],
      },
    ],
  },
  optimization: {
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

    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime/]),

    // new BundleAnalyzerPlugin(),
  ],
});
