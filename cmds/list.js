const http = require('http');
const url = require('url');
const endPoint = "/bin/cpm/package.list.json";
const defaultServer = "http://admin:admin@localhost:8080";

exports.command = 'list [server]'
exports.desc = 'list installed packages'
exports.handler = function (argv) {

  var options;
  if(argv.server) {
    options = url.parse(argv.server);
  } else {
    options = url.parse(defaultServer);
  }

  options.path = endPoint;
  options.method = "GET";
  console.log('Listing packages on', options.host)

  let data = '';
  var req = http.request(options, (res) => {
    if(res.statusCode != 200) {
      console.log(`STATUS: ${res.statusCode} ${res.statusMessage}`);
    }

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      var json = JSON.parse(data);
      for(var i in json) {
        console.log(json[i].id);
      }
    });
  
  });

  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });

  req.end();
  
}