const request = require('request');
const url = require('url');
const endPoint = "/bin/cpm/package.uninstall.json";

exports.command = 'uninstall <package>'
exports.desc = 'uninstall package on server'
exports.handler = (argv) => {
  let user = argv.user.split(':');
  let userName = user[0];
  let pass = '';
  if(user.length > 1) {
    pass = user[1];
  }

  console.log('uninstall package',argv.package,'on', argv.server)
  let url = argv.server + endPoint + argv.package;
  request.post({url: url}, (error, response, body) => {
    if(error) {
      console.log(error);
    }

    if(response && response.statusCode===200) {
      if(body) {
        var json = JSON.parse(body);
        console.log(json.status)
      }
    } else {
      console.log('Unable to uninstall package. statusCode:', response && response.statusCode);
    }
  }).auth(userName, pass);
}