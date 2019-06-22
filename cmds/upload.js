const http = require('http');
const url = require('url');
const fs = require('fs');
const endPoint = "/bin/cpm/package.upload.json";
const defaultServer = "http://admin:admin@localhost:8080";

exports.command = 'upload [server] <package>'
exports.desc = 'upload package on server'
exports.handler = function (argv) {
  var options;
  if(argv.server) {
    options = url.parse(argv.server);
  } else {
    options = url.parse(defaultServer);
  }

  options.path = endPoint;
  options.method = "POST";

  console.log('install package',argv.package,'on', options.host)

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