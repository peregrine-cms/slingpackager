exports.command = 'install [server] <package>'
exports.desc = 'install package on server'
exports.handler = function (argv) {
  console.log('install package',argv.package,'on', argv.server)
}