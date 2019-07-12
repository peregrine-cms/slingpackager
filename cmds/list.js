const cpmPackager = require('../utils/composumpackager')
const aemPackager = require('../utils/aempackager')
const logger = require('../utils/consoleLogger')

exports.command = 'list'
exports.desc = 'list installed packages'
exports.handler = (argv) => {
  logger.init(argv);

  let user = argv.user.split(':');
  let userName = user[0];
  let pass = '';
  if(user.length > 1) {
    pass = user[1];
  }

  cpmPackager.checkService(argv.server, userName, pass, (success) => {
    if(success) {
      cpmPackager.list(argv.server, userName, pass);
    } else {
      aemPackager.list(argv.server, userName, pass);
    }
  }); 
}