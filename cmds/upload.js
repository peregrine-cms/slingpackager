const request = require('request');
const fs = require('fs');
const endPoint = "/bin/cpm/package.upload.json";

exports.command = 'upload <package>'
exports.desc = 'upload package to server'
exports.handler = (argv) => {

  if(!fs.existsSync(argv.package) || !fs.statSync(argv.package).isFile()) {
    console.log("Valid package path not provided.");
    return;
  }

  let user = argv.user.split(':');
  let userName = user[0];
  let pass = '';
  if(user.length > 1) {
    pass = user[1];
  }

  console.log('Uploading package',argv.package,'on', argv.server);
  let post = request.post({url: argv.server + endPoint}, (error, response, body) => {
    if(error) {
      console.log(error);
    }

    if(response && response.statusCode===200) {
      var json = JSON.parse(body);
      console.log(json.status)
    } else {
      // console.log(body);
      console.log('Unable to upload package. statusCode:', response && response.statusCode);
    }
  }).auth(userName, pass);

  post.form().append('file', fs.createReadStream(argv.package));
  
}