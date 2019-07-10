const request = require('request')
const fs = require('fs')
const path = require('path')
const xml2js = require('xml2js')
const util = require('util')

const endpoint = "/crx/packmgr/service.jsp";

const checkService = (url, username, password, callback) => {
    request.get({url: url + endpoint}, (error, response, body) => {
        if(response && response.statusCode===200) {
            callback(true);
        } else {
            callback(false)
        }
    }).auth(username, password);
}

const list = (url, username, password) => {
  console.log('Listing packages on', url)
  request.post({url: url + endpoint + '?cmd=ls'}, (error, response, body) => {
    if(error) {
      console.log(error);
    }

    if(response && response.statusCode===200) {
      // console.log(body);
      xml2js.parseString(body, (error, result) => {
        if(result) {
          var data = getData(result);
          displayPackages(data[0].packages[0].package);
        } else if(error) {
          console.log(error);
        }
      });
    } else {
      console.log('Unable to connect to server. statusCode:', response && response.statusCode);
    }

  }).auth(username, password);
}

const uploadPackage = (url, username, password, packagePath) => {
  console.log('Uploading AEM package',packagePath,'on', url);
  var post = request.post({url: url + endpoint}, (error, response, body) => {
    if(error) {
      console.log(error);
    }

    if(response && response.statusCode===200) {
      xml2js.parseString(body, (error, result) => {
        if(result) {
          if(getStatusCode(result) === '200') {
            console.log("Done!");
          } else {
            console.log("Something went wrong! Check server logs.");
          }
        } else if(error) {
          console.log(error);
        }
      });
    } else {
      console.log('Unable to connect to server. statusCode:', response && response.statusCode);
    }

  }).auth(username, password);
  post.form().append('file', fs.createReadStream(packagePath));
}

const deletePackage = (url, username, password, package) => {
  console.log('Deleting AEM package',package,'on', url);
  executePackageCommand(url, username, password, package, 'rm');
}

const installPackage = (url, username, password, package) => {
  console.log('Installing AEM package',package,'on', url);
  executePackageCommand(url, username, password, package, 'inst');
}

const uninstallPackage = (url, username, password, package) => {
  console.log('Uninstalling AEM package',package,'on', url);
  executePackageCommand(url, username, password, package, 'uninst');
}

function executePackageCommand(url, username, password, packageName, cmd) {
  var post = request.post({url: url + endpoint + '?cmd='+cmd}, (error, response, body) => {
    if(error) {
      console.log(error);
    }

    if(response && response.statusCode===200) {
      xml2js.parseString(body, (error, result) => {
        if(result) {
          if(getStatusCode(result) === '200') {
            console.log("Done!");
          } else {
            console.log(getStatusText(result));
          }
        } else if(error) {
          console.log(error);
        }
      });
    } else {
      console.log('Unable to connect to server. statusCode:', response && response.statusCode);
    }

  }).auth(username, password);
  post.form().append('name', packageName);
}

function displayPackages(packages) {
  for(var i=0; i<packages.length; i++) {
    console.log('name='+packages[i].name[0]+
       ' group='+packages[i].group[0]+
       ' version='+packages[i].version[0]+
       ' downloadName='+packages[i].downloadName[0]);
  }
}

function getStatusCode(result) {
  return result.crx.response[0].status[0].$.code;
}

function getStatusText(result) {
  return result.crx.response[0].status[0]._;
}

function getData(result) {
  return result.crx.response[0].data;
}

module.exports = {
    checkService,
    list,
    uploadPackage,
    deletePackage,
    installPackage,
    uninstallPackage
}

