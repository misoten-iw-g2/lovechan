const path = require('path');
const fs = require('fs');

const resolvePath = relativePath => path.resolve(
  fs.realpathSync(process.cwd()),
  relativePath,
);

module.exports = {
  appNodeModules: resolvePath('node_modules'),
  appIndex: resolvePath('src/index.js'),
  appBuild: resolvePath('../go/src/app/public/dist'),
  appHtml: resolvePath('public/index.html'),
  publicPath: '/',
  appSrc: resolvePath('src'),
  appCss: resolvePath('src/styles/index.scss'),
  appPublic: resolvePath('public'),
};