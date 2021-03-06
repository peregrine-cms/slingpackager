const fs = require('fs');
const path = require('path')
const packager = require('../utils/packager')
const logger = require('../utils/consoleLogger')

exports.command = 'upload <package>'
exports.desc = 'upload package to server'
exports.builder = {
  install: {
    alias: 'i',
    describe: 'install the package after it\'s uploaded',
    default: false,
    boolean: true
  }
}
exports.handler = (argv) => {
  logger.init(argv);

  var packagePath = argv.package;
  if(!path.isAbsolute(packagePath)) {
    packagePath = path.join(process.cwd(), packagePath);
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

  packager.test(argv, (success, packageManager) => {
    if(success) {
        packageManager.uploadPackage(argv.server, userName, pass, packagePath, argv.install, argv.retry);
    }
  });

}