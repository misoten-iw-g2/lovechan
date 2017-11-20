process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const path = require('path');
const webpack = require('webpack');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const {
  appIndex,
  appBuild,
  publicPath,
  appNodeModules,
  appSrc,
  appCss,
  semanticCss,
  semanticOverrideCss,
  appHtml,
} = require('./config/paths');
const {
  protocol,
  devServerHost,
  devServerPort,
  raw,
  stringified,
} = require('./config/env');

module.exports = {
  entry: [
    require.resolve('./config/polyfills'),
    // activate HMR for React
    'react-hot-loader/patch',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint
    `webpack-dev-server/client?${protocol}://${devServerHost}:${devServerPort}`,
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    'webpack/hot/only-dev-server',
    semanticCss,
    semanticOverrideCss,
    appCss,
    appIndex
  ],
  devtool: 'cheap-module-source-map',
  devServer: {
    stats: 'errors-only',
    clientLogLevel: 'none',
    compress: true,
    contentBase: appSrc,
    watchContentBase: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: { disableDotRule: true },
    https: protocol === 'https',
    host: devServerHost,
    hot: true,
    open: false,
    inline: true,
    port: devServerPort,
    watchOptions: {
      ignored: /node_modules/,
    },
    publicPath,
  },
  output: {
    path: appBuild,
    pathinfo: true,
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath,
  },
  resolve: {
    modules: ['node_modules', appNodeModules].concat(
      // It is guaranteed to exist because we tweak it in `env.js`
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean),
    ),
    extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx'],
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        oneOf: [
          {
            test: /\.html/,
            loader: require.resolve('html-loader'),
          },
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.(js|jsx)$/,
            include: appSrc,
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: true,
            },
          },
          {
            test: [/\.css$/, /\.scss$/],
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: { importLoaders: 2 },
              },
              require.resolve('resolve-url-loader'),
              {
                loader: require.resolve('sass-loader'),
                options: {
                  sourceMap: true
                }
              }
            ]
          },
          {
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new InterpolateHtmlPlugin(raw),
    new HtmlWebpackPlugin({
      inject: true,
      template: appHtml
    }),
    new webpack.DefinePlugin(stringified),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new CaseSensitivePathsPlugin()
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  stats: 'detailed',
  performance: {
    hints: false,
  },
};
