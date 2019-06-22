const http = require('http');
const url = require('url');
const endPoint = "/bin/cpm/package.delete.json";
const defaultServer = "http://admin:admin@localhost:8080";

exports.command = 'delete [server] <package>'
exports.desc = 'delete package on server'
exports.handler = function (argv) {
  var options;
  if(argv.server) {
    options = url.parse(argv.server);
  } else {
    options = url.parse(defaultServer);
  }

  options.path = endPoint;
  options.method = "POST";

  console.log('delete package',argv.package,'on', options.host)
}