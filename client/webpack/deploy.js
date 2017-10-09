const fs = require('fs-extra');
const {
  appBuild,
  appHtml,
  appPublic
} = require('./paths');

fs.emptyDirSync(appBuild);
fs.copySync(appPublic, appBuild, {
  dereference: true,
  filter: file => file !== appHtml,
});
