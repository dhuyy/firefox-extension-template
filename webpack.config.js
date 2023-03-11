/* eslint-disable no-useless-computed-key */
const path = require('path');
const packageJson = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const Visualizer = require('webpack-visualizer-plugin2');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { DuplicatesPlugin } = require('inspectpack/plugin');

const isProdEnv = process.env.NODE_ENV === 'production';

const config = {
  target: 'web',
  mode: process.env.NODE_ENV || 'development',
  entry: {
    ['background-script']: [
      path.resolve(__dirname, 'src', 'background-script', 'index.ts'),
    ],
    ['content-scripts']: [
      path.resolve(__dirname, 'src', 'content', 'index.ts'),
    ],
    popup: [path.resolve(__dirname, 'src', 'popup', 'index.tsx')],
    options: [path.resolve(__dirname, 'src', 'options', 'index.tsx')],
  },
  devServer: {
    port: 3000,
    compress: true,
    watchFiles: ['src/(popup|options)/**/*'],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          filename: './common/[name].js',
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(?:svg|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
        generator: {
          filename: './common/images/[name][ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  // prettier-ignore
  output: {
    filename: ({ chunk }) => {
      return /(popup|options)/.test(chunk.name)
        ? '[name]/[name].js'
        : chunk.name === 'content-scripts'
          ? 'scripts/[name].js'
          : '[name].js';
    },
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]/[name].css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'popup', 'index.html'),
      filename: 'popup/popup.html',
      chunks: ['popup'],
      inject: 'body',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'options', 'index.html'),
      filename: 'options/options.html',
      chunks: ['options'],
      inject: 'body',
    }),
    new FileManagerPlugin({
      events: {
        onEnd: {
          copy: [
            {
              source: path.join(__dirname, 'src', 'manifest.json'),
              destination: path.join(__dirname, 'dist', 'manifest.json'),
            },
            {
              source: path.join(__dirname, 'src', 'common', 'icons', '*'),
              destination: path.join(__dirname, 'dist', 'icons'),
            },
            ...(!isProdEnv
              ? [
                  {
                    source: path.join(__dirname, 'public', 'index.html'),
                    destination: path.join(__dirname, 'dist', 'index.html'),
                  },
                ]
              : []),
          ],
          ...(isProdEnv && {
            delete: [
              path.join(__dirname, 'dist', '**/*.LICENSE.txt'),
              path.join(__dirname, '*.zip'),
            ],
            archive: [
              {
                source: path.join(__dirname, 'dist'),
                destination: path.join(
                  __dirname,
                  `firefox-extension-${packageJson.version}.zip`
                ),
              },
            ],
          }),
        },
      },
    }),
  ],
};

if (process.env.NODE_ENV === 'developmemt') {
  config.devtool = 'eval-source-map';
}

if (process.env.NODE_ENV === 'production') {
  config.plugins = [
    ...config.plugins,
    new DuplicatesPlugin({
      emitErrors: false,
      emitHandler: undefined,
      ignoredPackages: undefined,
      verbose: false,
    }),
  ];
}

if (process.env.ANALYZE) {
  config.plugins = [...config.plugins, new BundleAnalyzerPlugin()];
}

if (process.env.VISUALIZE) {
  config.plugins = [...config.plugins, new Visualizer()];
}

module.exports = config;
