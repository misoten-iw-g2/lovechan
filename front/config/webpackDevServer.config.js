const paths = require('./paths');
const env = require('./env');

module.exports = {
  clientLogLevel: 'none',
  compress: true,
  contentBase: paths.contentBase,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  historyApiFallback: { disableDotRule: true },
  host: env.host,
  hot: true,
  open: true,
  port: env.port,
  proxy: {
    '/': {
      target: `http://${env.host}:${env.port}`,
      bypass: function(req, res, proxyOptions) {
        if (req.headers.accept.indexOf('html') !== -1) {
          console.log('Skipping proxy for browser request.');
          return '/index.html';
        }
      },
    },
  },
  quiet: true,
  publicPath: paths.publicPath,
};

/*
const config = require('./webpack.config.dev');
const paths = require('./paths');

module.exports = function(proxy, allowedHost) {
  return {
    disableHostCheck:
    !proxy || process.env.DANGEROUSLY_DISABLE_HOST_CHECK === 'true',
    compress: true,
    clientLogLevel: 'none',
    contentBase: paths.appPublic,
    watchContentBase: true,
    hot: true,
    publicPath: config.output.publicPath,
    quiet: true,
    watchOptions: {
      ignored: /node_modules/,
    },
    https: env.protocol === 'https',
    host: env.host,
    overlay: false,
    historyApiFallback: { disableDotRule: true },
    public: allowedHost,
    proxy
  }
}*/
