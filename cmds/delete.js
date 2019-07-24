const packager = require('../utils/packager')
const logger = require('../utils/consoleLogger')

exports.command = 'delete <package>'
exports.desc = 'delete package on server'
exports.handler = (argv) => {
  let user = argv.user.split(':');
  let userName = user[0];
  let pass = '';
  if(user.length > 1) {
    pass = user[1];
  }

  logger.init(argv);
  packager.test(argv, (success, packageManager) => {
    if(success) {
        packageManager.deletePackage(argv.server, userName, pass, argv.package, argv.retry);
    }
  });

}