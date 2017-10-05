const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const paths = require('./paths');
const polyfills = require.resolve('./polyfills');
const env = require('./env');
const webpackDevServerConfig = require('./webpackDevServer.config.js');

module.exports = {
  entry: {
    babelPolyfills: 'babel-polyfill',
    polyfills: require.resolve('./polyfills'),
    app: paths.appIndexJsx,
  },
  devtool: false,
  devServer: webpackDevServerConfig,
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: '/Users/sr1994lu/Documents/gemcook/playground/',
      verbose: true,
      dry: false,
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appIndexHtml,
    }),
    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['babelPolyfills', 'polyfills', 'common'],
      minChunks: Infinity,
      async: true,
    }),
    new UglifyJSPlugin({
      ecma: 8,
      parallel: {
        cache: true,
        workers: 2,
      },
      compress: process.env.NODE_ENV === 'production',
    }),
  ],
  output: {
    filename: env.filename,
    chunkFilename: env.filename,
    path: paths.contentBase,
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
              compact: true,
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
};

// const autoprefixer = require('autoprefixer');
// const path = require('path');
// const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const ManifestPlugin = require('webpack-manifest-plugin');
// const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
// const paths = require('./paths');
// const env = require('./env');
// const polyfills = require.resolve('./polyfills');
//
// module.exports = {
//   bail: true,
//   devtool: process.env.GENERATE_SOURCEMAP !== 'false' ? 'source-map' : false,
//   entry: [
//     polyfills,
//     paths.appIndexJsx
//   ],
//   output: {
//     path: paths.appBuild,
//     filename: env.filename,
//     chunkFilename: env.chunkFilename,
//     publicPath: env.publicPath
//   },
//   resolve: {
//     modules: ['node_modules', paths.appNodeModules],
//     extensions: env.extensions
//   },
//   module: {
//     strictExportPresence: true,
//     rules: [{
//       oneOf: [
//         {
//           test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
//           loader: require.resolve('url-loader'),
//           options: {
//             limit: 10000,
//             name: env.urlConfigsName,
//           },
//         }, {
//           test: /\.(js|jsx)$/,
//           include: paths.appSrc,
//           loader: require.resolve('babel-loader'),
//           options: {
//             compact: true
//           },
//         }, {
//           test: /\.css$/,
//           loader: ExtractTextPlugin.extract(Object.assign({
//             fallback: require.resolve('style-loader'),
//             use: [{
//               loader: require.resolve('css-loader'),
//               options: {
//                 importLoaders: 1,
//                 minimize: true,
//                 sourceMap: process.env.GENERATE_SOURCEMAP !== 'false'
//               }
//             }, {
//               loader: require.resolve('postcss-loader'),
//               options: {
//                 ident: 'postcss',
//                 plugins: () => [
//                   require('postcss-flexbugs-fixes'),
//                   autoprefixer(env.autoprefixerConfig)
//                 ]
//               }
//             }]
//           },
//           {
//           publicPath: Array((env.cssFileName).split('/').length).join('../')
//            }))
//         }, {
//           loader: require.resolve('file-loader'),
//           exclude: [/\.js$/, /\.html$/, /\.json$/],
//           options: {
//             name: fileConfigsName
//           }
//         },
//       ]
//     }]
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       inject: true,
//       template: paths.appIndexHtml,
//       minify: {
//         removeComments: true,
//         collapseWhitespace: true,
//         removeRedundantAttributes: true,
//         useShortDoctype: true,
//         removeEmptyAttributes: true,
//         removeStyleLinkTypeAttributes: true,
//         keepClosingSlash: true,
//         minifyJS: true,
//         minifyCSS: true,
//         minifyURLs: true
//       }
//     }),
//     new webpack.optimize.UglifyJsPlugin({
//       compress: {
//         warnings: false,
//         comparisons: false,
//       },
//       output: {
//         comments: false,
//         ascii_only: true,
//       },
//       sourceMap: process.env.GENERATE_SOURCEMAP !== 'false',
//     }),
//     new ExtractTextPlugin({
//       filename: env.cssFileName,
//     }),
//     new ManifestPlugin({
//       fileName: 'asset-manifest.json',
//     }),
//     new SWPrecacheWebpackPlugin({
//       dontCacheBustUrlsMatching: /\.\w{8}\./,
//       filename: 'service-worker.js',
//       logger(message) {
//         if (message.indexOf('Total precache size is') === 0) {
//           return;
//         }
//         if (message.indexOf('Skipping static resource') === 0) {
//           return;
//         }
//         console.log(message);
//       },
//       minify: true,
//       navigateFallback: `${env.publicUrl}/index.html`,
//       navigateFallbackWhitelist: [/^(?!\/__).*/],
//       staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
//     }),
//     new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
//   ],
//   node: {
//     dgram: 'empty',
//     fs: 'empty',
//     net: 'empty',
//     tls: 'empty',
//     child_process: 'empty'
//   }
// }
