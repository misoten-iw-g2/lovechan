const fs = require('fs-extra');
const {
  appBuild,
  appPublic
} = require('./paths');

fs.emptyDirSync(appBuild);
fs.copySync(appPublic, appBuild, {
  dereference: true
});
