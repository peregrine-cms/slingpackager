const packager = require('../utils/packager')
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

  packager.test(argv, (success, packageManager) => {
    if(success) {
        packageManager.list(argv.server, userName, pass);
    }
  });

}