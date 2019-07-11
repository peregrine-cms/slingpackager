const request = require('request')
const fs = require('fs')
const path = require('path')

const listEndpoint = "/bin/cpm/package.list.json";
const uploadEndpoint = "/bin/cpm/package.upload.json";
const deleteEndpoint = "/bin/cpm/package.delete.json";
const installEndpoint = "/bin/cpm/package.install.json";
const uninstallEndpoint = "/bin/cpm/package.uninstall.json";

const checkService = (url, username, password, callback) => {
    request.get({ url: url + '/bin/cpm/package.json' }, (error, response, body) => {
        if (response && response.statusCode === 200) {
            callback(true);
        } else {
            callback(false)
        }

    }).auth(username, password);
}

const list = (url, username, password) => {
    console.log('Listing packages on', url);
    listPackages(url, username, password, '');
}

const uploadPackage = (url, username, password, packagePath) => {
    console.log('Uploading package', packagePath, 'on', url);
    let post = request.post({ url: url + uploadEndpoint }, (error, response, body) => {
        if (error) {
            console.log(error);
        }

        if (response && response.statusCode === 200) {
            var json = JSON.parse(body);
            console.log(json.status)
        } else {
            console.log('Unable to upload package. statusCode:', response && response.statusCode);
        }
    }).auth(username, password);

    post.form().append('file', fs.createReadStream(packagePath));
}

const deletePackage = (url, username, password, package) => {
    console.log('Deleting package', package, 'on', url);
    request({ url: url + deleteEndpoint + package, method: 'DELETE' }, (error, response, body) => {
        if (error) {
            console.log(error);
        }

        if (response && response.statusCode === 200) {
            if (body) {
                var json = JSON.parse(body);
                console.log(json.status)
            } else {
                console.log('Unable to delete package. Check package name (try by path).');
            }
        } else {
            console.log('Unable to delete package. statusCode:', response && response.statusCode);
        }
    }).auth(username, password);
}

const installPackage = (url, username, password, package) => {
    console.log('Installing package', package, 'on', url);
    request.post({ url: url + installEndpoint + package }, (error, response, body) => {
        if (error) {
            console.log(error);
        }

        if (response && response.statusCode === 200) {
            if (body) {
                var json = JSON.parse(body);
                console.log(json.status)
            }
        } else {
            console.log('Unable to install package. statusCode:', response && response.statusCode);
        }
    }).auth(username, password);
}

const uninstallPackage = (url, username, password, package) => {
    console.log('Uninstalling package', package, 'on', url);
    // Commented out code bellow does not work wirh Composum 1.7/Sling9
    // var post = request.post({ url: url + uninstallEndpoint + package }, (error, response, body) => {
    var post = request.post({ url: url + '/bin/cpm/core/jobcontrol.job.json' }, (error, response, body) => {
        if (error) {
            console.log(error);
        }

        if (response && response.statusCode === 200) {
            if (body) {
                var json = JSON.parse(body);
                console.log('done');
                // Commented out for Composum 1.7/Sling9
                // console.log(json.status)
            }
        } else {
            console.log('Unable to uninstall package. statusCode:', response && response.statusCode);
        }
    }).auth(username, password);

    // These parameters are not needed when using uninstallEndpoint with Sling11.
    // This is a workaround for Composum 1.7 and Sling9 which does not have this endpoint.
    var form = post.form();
    form.append('event.job.topic', 'com/composum/sling/core/pckgmgr/PackageJobExecutor');
    form.append('reference', package);
    form.append('_charset_', 'UTF-8');
    form.append('operation', 'uninstall');
}

function listPackages(url, username, password, path) {
    request.get({ url: url + listEndpoint + path}, (error, response, body) => {
        if (error) {
            console.log(error);
        }

        if (response && response.statusCode === 200) {
            var json = JSON.parse(body);
            
            // Check for structure diff between Composume in Sling9 and Sling11
            var packages = json.children ? json.children : json;
            displayPackages(url, username, password, packages);
        } else {
            console.log('Unable to connect to server. statusCode:', response && response.statusCode);
        }

    }).auth(username, password);
}

function displayPackages(url, username, password, packages) {
    for (var i = 0; i < packages.length; i++) {
        if(packages[i].type === 'package') {
            console.log('name=' + packages[i].definition.name +
                ' group=' + packages[i].definition.group +
                ' version=' + packages[i].definition.version +
                ' path=' + packages[i].id);
        } else if(packages[i].type === 'folder') {
            // This is not needed on Sling11 as list service returns complete list of packages.
            listPackages(url, username, password, packages[i].path);
        }
    }
}

module.exports = {
    checkService,
    list,
    uploadPackage,
    deletePackage,
    installPackage,
    uninstallPackage
}

