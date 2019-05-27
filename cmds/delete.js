exports.command = 'delete [server] <package>'
exports.desc = 'delete package on server'
exports.handler = function (argv) {
  console.log('delete package',argv.package,'on', argv.server)
}