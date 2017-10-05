const fs = require('fs');
const path = require('path');
const paths = require('./paths');

delete require.cache[require.resolve('./paths')];

module.exports = {
  filename: 'js/[name].[hash:8].js',
  chunkedFilename: 'js/[id].[chunkhash].js',
  host: '0.0.0.0',
  port: 3355,
  publicPath: '/',
  extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx'],
  urlConfigsName: path.resolve('dist/media/[name].[hash:8].[ext]'),
  autoprefixerConfig: {
    browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
    flexbox: 'no-2009',
  },
  fileConfigsName: path.resolve('dist/media/[name].[hash:8].[ext]'),
};
