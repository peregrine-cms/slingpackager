const fs = require('fs');
const path = require('path')
const cpmPackager = require('../utils/composumpackager')
const aemPackager = require('../utils/aempackager')
const logger = require('../utils/consoleLogger')

exports.command = 'upload <package>'
exports.desc = 'upload package to server'
exports.builder = {
  install: {
    alias: 'i',
    describe: 'install the package after it\'s uploaded'
  }
}
exports.handler = (argv) => {
  logger.init(argv);

  var packagePath = argv.package;
  if(!path.isAbsolute(packagePath)) {
    packagePath = path.join(__dirname, packagePath);
  }

  if(!fs.existsSync(packagePath) || !fs.statSync(packagePath).isFile()) {
    logger.error("Valid package path not provided.");
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
      cpmPackager.uploadPackage(argv.server, userName, pass, packagePath, argv.install);
    } else {
      aemPackager.uploadPackage(argv.server, userName, pass, packagePath, argv.install);
    }
  });
}