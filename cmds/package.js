const archiver = require('archiver')
const fs = require('fs')
const path = require('path')
const logger = require('../utils/consoleLogger')

exports.command = 'package <folder> <package>'
exports.desc = 'create a package'
exports.builder = {
  server: {
    hidden: true
  },
  user: {
    hidden: true
  }
}
exports.handler = (argv) => {
  logger.init(argv);
  
  if(isValid(argv.folder)) {
    archive(argv);
  }
}

function archive(argv) {
  var packagePath = argv.package;
  if(!path.isAbsolute(packagePath)) {
    packagePath = path.join(__dirname, packagePath);
  }

  console.log('package folder', argv.folder, 'as', packagePath);
  var output = fs.createWriteStream(packagePath);
  var archive = archiver('zip');

  archive.on('error', (err) => { throw err });

  archive.pipe(output);

  var jcrRoot = path.join(argv.folder, 'jcr_root');
  archive.directory(jcrRoot, 'jcr_root', { name: 'jcr_root' });

  var metainf = path.join(argv.folder, 'META-INF');
  archive.directory(metainf, 'META-INF', { name: 'META-INF' });

  archive.finalize();
}

function isValid(dir) {
  if(!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
    console.log(dir,"does not exist or is not a folder.");
    return false;
  }

  var jcrRoot = path.join(dir, 'jcr_root');
  if(!fs.existsSync(jcrRoot) || !fs.statSync(jcrRoot).isDirectory()) {
    console.log(jcrRoot,"does not exist or is not a folder.");
    return false;
  }

  var metainf = path.join(dir, 'META-INF');
  if(!fs.existsSync(metainf) || !fs.statSync(metainf).isDirectory()) {
    console.log(metainf,"does not exist or is not a folder.");
    return false;
  }

  return true;
}