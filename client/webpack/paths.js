const path = require('path');
const fs = require('fs');

const resolvePath = relativePath => path.resolve(
  fs.realpathSync(process.cwd()),
  relativePath,
);

module.exports = {
  appNodeModules: resolvePath('node_modules'),
  appIndexJsx: resolvePath('src/index.js'),
  contentBase: resolvePath('../../go/src/app/server/dist'),
  appHtml: resolvePath('public/index.html'),
  publicPath: '/',
  appSrc: resolvePath('src'),
};
