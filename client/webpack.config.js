// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const WebpackPwaManifest = require('webpack-pwa-manifest');
// const path = require('path');
// const { InjectManifest } = require('workbox-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const BabelLoaderExcludeNodeModulesExcept = require('babel-loader-exclude-node-modules-except');

// // TODO: Add and configure workbox plugins for a service worker and manifest file.
// // TODO: Add CSS loaders and babel to webpack.

// module.exports = () => {
//   return {
//     mode: 'development',
//     entry: {
//       main: './src/js/index.js',
//       install: './src/js/install.js'
//     },
//     output: {
//       filename: '[name].bundle.js',
//       path: path.resolve(__dirname, 'dist'),
//     },
//     plugins: [
//       new CleanWebpackPlugin(),
//       new HtmlWebpackPlugin({ template: './src/index.html' }),
//       new WebpackPwaManifest({ /* manifwebpacest config */
//         name: 'Just Another Text Editor',
//         short_name: 'JATE',
//         description: 'A simple text editor that works offline.',
//         background_color: '#142C3B',
//         crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
//         icons: [
//           {
//             src: path.resolve('src/img/icon.png'),
//             sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
//             destination: path.join('assets', 'icons'),
//           },
          
//         ],

//           }),
//       new InjectManifest({ swSrc: './src-sw.js', swDest: 'sw.js' }),
//       new MiniCssExtractPlugin(),
//     ],

//     module: {
//       rules: [
//         {
//           test: /\.js$/,
//           exclude: BabelLoaderExcludeNodeModulesExcept(['idb']),
//           use: {
//             loader: 'babel-loader',
//             options: { presets: ['@babel/preset-env'] },
//           },
//         },
//         {
//           test: /\.css$/,
//           use: [MiniCssExtractPlugin.loader, 'css-loader'],
//         },
//       ]
//     },
//   };

// };

import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackPwaManifest from 'webpack-pwa-manifest';
import path from 'path';
import { InjectManifest } from 'workbox-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import BabelLoaderExcludeNodeModulesExcept from 'babel-loader-exclude-node-modules-except';

const __dirname = path.resolve();

export default () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({ template: './index.html' }),
      new WebpackPwaManifest({
        /* manifest config */
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'A simple text editor that works offline.',
        background_color: '#142C3B',
        crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
      new InjectManifest({ swSrc: './src-sw.js', swDest: 'sw.js' }),
      new MiniCssExtractPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: BabelLoaderExcludeNodeModulesExcept(['idb']),
          use: {
            loader: 'babel-loader',
            options: { presets: ['@babel/preset-env'] },
          },
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
      ],
    },
  };
};
