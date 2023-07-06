const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BabelLoaderExcludeNodeModulesExcept = require('babel-loader-exclude-node-modules-except');

const __dirname = path.resolve();

module.exports = async () => {
  try {
    return {
      mode: 'production',
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
        new HtmlWebpackPlugin({ template: './src/index.html' }),
        new WebpackPwaManifest({
          /* manifwebpacest config */
          name: 'Just Another Text Editor',
          short_name: 'JATE',
          description: 'A simple text editor that works offline.',
          background_color: '#142C3B',
          crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
          icons: [
            {
              src: path.resolve(__dirname, 'src/images/logo.png'),
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
        ]
      },
    };
  } catch (error) {
    console.error('There was an error configuring webpack');
    throw error;
  };
};