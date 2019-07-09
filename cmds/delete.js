const request = require('request');
const endPoint = "/bin/cpm/package.delete.json";

exports.command = 'delete <package>'
exports.desc = 'delete package on server'
exports.handler = (argv) => {
  let user = argv.user.split(':');
  let userName = user[0];
  let pass = '';
  if(user.length > 1) {
    pass = user[1];
  }

  console.log('Deleting package',argv.package,'on', argv.server)
  let url = argv.server + endPoint + argv.package;
  request({url: url, method: 'DELETE'}, (error, response, body) => {
    if(error) {
      console.log(error);
    }

    if(response && response.statusCode===200) {
      if(body) {
        var json = JSON.parse(body);
        console.log(json.status)
      }
    } else {
      // console.log(body);
      console.log('Unable to delete package. statusCode:', response && response.statusCode);
    }
  }).auth(userName, pass);
}