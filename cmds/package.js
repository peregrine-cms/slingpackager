exports.command = 'package <folder>'
exports.desc = 'create a package'
exports.handler = function (argv) {
  console.log('package folder', argv.folder)
}