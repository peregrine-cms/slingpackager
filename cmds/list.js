const request = require('request');
const endPoint = "/bin/cpm/package.list.json";

exports.command = 'list'
exports.desc = 'list installed packages'
exports.handler = (argv) => {
  let user = argv.user.split(':');
  let userName = user[0];
  let pass = '';
  if(user.length > 1) {
    pass = user[1];
  }

  console.log('Listing packages on', argv.server)
  request.get({url: argv.server + endPoint}, (error, response, body) => {
    if(error) {
      console.log(error);
    }

    if(response && response.statusCode===200) {
      var json = JSON.parse(body);
      for(var i in json) {
        console.log(json[i].id);
      }
    } else {
      console.log('Unable to connect to server. statusCode:', response && response.statusCode);
    }

  }).auth(userName, pass);
}