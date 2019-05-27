exports.command = 'list [server]'
exports.desc = 'list installed packages'
exports.handler = function (argv) {
  console.log('list installed packages on', argv.server)
}