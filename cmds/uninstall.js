exports.command = 'uninstall [server] <package>'
exports.desc = 'uninstall package on server'
exports.handler = function (argv) {
  console.log('uninstall package',argv.package,'on', argv.server)
}