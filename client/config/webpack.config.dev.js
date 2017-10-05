const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const paths = require('./paths');
const env = require('./env');
const webpackDevServerConfig = require('./webpackDevServer.config.js');

module.exports = {
  entry: {
    hotLoaderPatch: require.resolve('react-hot-loader/patch'),
    babelPolyfills: 'babel-polyfill',
    polyfills: require.resolve('./polyfills'),
    app: paths.appIndexJsx,
  },
  devtool: 'cheap-module-source-map',
  devServer: webpackDevServerConfig,
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appIndexHtml,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['app', 'polyfills', 'babelPolyfills', 'hotLoaderPatch'],
      minChunks: 5,
      async: false,
    }),
  ],
  output: {
    filename: env.filename,
    chunkFilename: env.chunkedFilename,
    path: paths.contentBase,
    publicPath: paths.publicPath,
  },
  resolve: {
    extensions: env.extensions,
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    symlinks: false,
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: env.urlConfigsName,
            },
          },
          {
            test: /\.(js|jsx)$/,
            exclude: [path.resolve(__dirname, 'src'), 'node_modules'],
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: true,
            },
          },
          {
            test: /\.css$/,
            include: paths.appSrc,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: { importLoaders: 1 },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer(env.autoprefixerConfig),
                  ],
                },
              },
            ],
          },
          {
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: env.fileConfigsName,
            },
          },
        ],
      },
    ],
  },
  performance: {
    hints: false,
  },
};

/*const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const paths = require('./paths');
const env = require('./env');
const polyfills = require.resolve('./polyfills');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    polyfills,
    paths.appIndexJsx
  ],
  output: {
    path: paths.appBuild,
    pathinfo: true,
    filename: env.filename,
    chunkFilename: env.chunkFilename,
    publicPath: env.publicPath
  },
  resolve: {
    modules: ['node_modules', paths.appNodeModules],
    extensions: env.extensions
  },
  module: {
    strictExportPresence: true,
    rules: [{
      oneOf: [
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: require.resolve('url-loader'),
          options: {
            limit: 10000,
            name: env.urlConfigsName
          },
        }, {
          test: /\.(js|jsx)$/,
          include: paths.appSrc,
          loader: require.resolve('babel-loader'),
          options: {
            cacheDirectory: true
          },
        }, {
          test: /\.css$/,
          use: [
            require.resolve('style-loader'),
            {
              loader: require.resolve('css-loader'),
              options: { importLoaders: 1 }
            }, {
              loader: require.resolve('postcss-loader'),
              options: {
                ident: 'postcss',
                plugins: () => [
                  require('postcss-flexbugs-fixes'),
                  autoprefixer(env.autoprefixerConfig)
                ]
              }
            },
          ],
        }, {
          exclude: [/\.js$/, /\.html$/, /\.json$/],
          loader: require.resolve('file-loader'),
          options: {
            name: fileConfigsName
          }
        },
      ]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appIndexHtml
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  performance: {
    hints: false
  }
}
*/
