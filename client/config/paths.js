const path = require('path');
const fs = require('fs');
const url = require('url');

module.exports = {
  appIndexJsx: path.resolve('src/index.jsx'),
  contentBase: path.resolve('../go/src/app/server/dist'),
  appIndexHtml: path.resolve('public/index.html'),
  publicPath: '/',
  appSrc: path.resolve('src'),
};
