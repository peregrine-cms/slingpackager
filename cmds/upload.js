const fs = require('fs');
const path = require('path')
const cpmPackager = require('../utils/composumpackager')
const aemPackager = require('../utils/aempackager')

exports.command = 'upload <package>'
exports.desc = 'upload package to server'
exports.handler = (argv) => {
  var packagePath = argv.package;
  if(!path.isAbsolute(packagePath)) {
    packagePath = path.join(__dirname, packagePath);
  }

  if(!fs.existsSync(packagePath) || !fs.statSync(packagePath).isFile()) {
    console.log("Valid package path not provided.");
    return;
  }

  let user = argv.user.split(':');
  let userName = user[0];
  let pass = '';
  if(user.length > 1) {
    pass = user[1];
  }

  cpmPackager.checkService(argv.server, userName, pass, (success) => {
    if(success) {
      cpmPackager.uploadPackage(argv.server, userName, pass, packagePath);
    } else {
      aemPackager.uploadPackage(argv.server, userName, pass, packagePath);
    }
  });
}