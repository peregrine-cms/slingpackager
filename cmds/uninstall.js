const http = require('http');
const url = require('url');
const endPoint = "/bin/cpm/package.uninstall.json";
const defaultServer = "http://admin:admin@localhost:8080";

exports.command = 'uninstall [server] <package>'
exports.desc = 'uninstall package on server'
exports.handler = function (argv) {
  var options;
  if(argv.server) {
    options = url.parse(argv.server);
  } else {
    options = url.parse(defaultServer);
  }

  options.path = endPoint;
  options.method = "POST";

  console.log('uninstall package',argv.package,'on', options.host)

  let data = '';
  var req = http.request(options, (res) => {
    if(res.statusCode != 200) {
      console.log(`STATUS: ${res.statusCode} ${res.statusMessage}`);
    }

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      console.log(data);
    });
  
  });

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  req.end();
}