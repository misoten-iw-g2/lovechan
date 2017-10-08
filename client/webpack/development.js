process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

require('babel-polyfill');
const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const {
  appIndexJsx,
  appBuild,
  publicPath,
  appNodeModules,
  appSrc,
  appHtml,
} = require('./paths');
const {
  devServerHost,
  devServerPort,
  stringified,
} = require('./env');

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';

module.exports = {
  entry: [
    // First entry must be 'react-hot-loader/patch'
    'react-hot-loader/patch',
    `webpack-dev-server/client?${protocol}://${devServerHost}:${devServerPort}`,
    'webpack/hot/only-dev-server',
    'babel-polyfill',
    require.resolve('./polyfills'),
    // here css files
    // example:
    // 'semantic-ui-css/semantic.min.css'
    // require.resolve('./stylesheets/gc-common.css')
    appIndexJsx,
  ],
  devtool: 'cheap-module-source-map',
  devServer: {
    clientLogLevel: 'none',
    compress: true,
    contentBase: appSrc,
    watchContentBase: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: { disableDotRule: true },
    https: protocol === 'https',
    host: devServerHost,
    hot: true,
    open: true,
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
            // see:
            // https://atom.io/packages/language-postcss
            test: [/\.css$/, /\.pcss$/, /\.sss$/],
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
            ],
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
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: appHtml,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin(stringified),
    new webpack.HotModuleReplacementPlugin(),
    new CaseSensitivePathsPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
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
