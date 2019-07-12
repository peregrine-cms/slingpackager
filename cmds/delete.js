const cpmPackager = require('../utils/composumpackager')
const aemPackager = require('../utils/aempackager')
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
  cpmPackager.checkService(argv.server, userName, pass, (success) => {
    if(success) {
      cpmPackager.deletePackage(argv.server, userName, pass, argv.package);
    } else {
      aemPackager.deletePackage(argv.server, userName, pass, argv.package);
    }
  });
}