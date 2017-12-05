const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const {
  appIndex,
  publicPath,
  appNodeModules,
  appSrc,
  appCss,
  semanticCss,
  semanticOverrideCss,
  appHtml,
  appPublic,
} = require('./config/paths');
const {raw, stringified} = require('./config/env');

const postcssLoaderOptions = {
  ident: 'postcss',
  plugins: () => [
    require('postcss-flexbugs-fixes'),
    autoprefixer({
      browsers: [
        '> 1% in JP',
        'not Chrome 49',
        'last 2 Edge versions',
        'last 2 iOS versions',
      ],
      flexbox: 'no-2009',
    }),
  ],
};

const sassLoaderOptions = {
  sourceMap: true,
};

module.exports = {
  bail: true,
  devtool: 'nosources-source-map',
  entry: [
    require.resolve('@webpack-utils/polyfills'),
    semanticCss,
    semanticOverrideCss,
    appCss,
    appIndex,
  ],
  output: {
    path: appPublic,
    pathinfo: false,
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
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
          /**
           * HTML resolve
           */
          {
            test: /\.html/,
            loader: require.resolve('html-loader'),
          },
          /**
           * Assets resolve
           */
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          /**
           * Babel
           */
          {
            test: /\.(js|jsx|mjs)$/,
            include: appSrc,
            loader: require.resolve('babel-loader'),
            options: {
              compact: true,
            },
          },
          {
            test: [/\.css$/, /\.scss$/],
            loader: ExtractTextPlugin.extract(
              Object.assign(
                {
                  fallback: {
                    loader: require.resolve('style-loader'),
                    options: {
                      hmr: false,
                    },
                  },
                  use: [
                    /**
                     * CSS Modules resolve
                     */
                    {
                      loader: require.resolve('css-loader'),
                      options: {importLoaders: 3},
                    },
                    require.resolve('resolve-url-loader'),
                    {
                      loader: require.resolve('sass-loader'),
                      options: sassLoaderOptions,
                    },
                    {
                      loader: require.resolve('postcss-loader'),
                      options: postcssLoaderOptions,
                    },
                    /**
                     * Raw CSS resolve
                     */
                    {
                      test: [/\.css$/, /\.scss$/],
                      use: [
                        require.resolve('raw-loader'),
                        require.resolve('resolve-url-loader'),
                        {
                          loader: require.resolve('sass-loader'),
                          options: sassLoaderOptions,
                        },
                        {
                          loader: require.resolve('postcss-loader'),
                          options: postcssLoaderOptions,
                        },
                      ],
                    },
                  ],
                },
                {}
              )
            ),
            // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
          },
          /**
           * File resolve
           */
          {
            loader: require.resolve('file-loader'),
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new InterpolateHtmlPlugin(raw),
    new HtmlWebpackPlugin({
      inject: true,
      template: appHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new webpack.DefinePlugin(stringified),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        // Disabled because of an issue with Uglify breaking seemingly valid code:
        // https://github.com/facebookincubator/create-react-app/issues/2376
        // Pending further investigation:
        // https://github.com/mishoo/UglifyJS2/issues/2011
        comparisons: false,
      },
      output: {
        comments: false,
        // Turned on because emoji and regex is not minified properly using default
        // https://github.com/facebookincubator/create-react-app/issues/2488
        ascii_only: true,
      },
      sourceMap: false,
    }),
    new ExtractTextPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
    }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css|html|json|ico|svg|eot|otf|ttf)$/,
    }),
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
};
