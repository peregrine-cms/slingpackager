const archiver = require('archiver')
const fs = require('fs')
const path = require('path')
const xmlbuilder = require('xmlbuilder');
const logger = require('../utils/consoleLogger')

const configFile = 'slingpackager.config.js'

exports.command = 'package <folder>'
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
  var json = getConfigJson(argv.folder);
  if(json === undefined) {
    logger.error(configFile,'not found in the project.');
    throw "Unable to find configuration " + configFile;
  }

  var packagePath = path.join(process.cwd(), packageName(json));

  logger.log('package folder', argv.folder, 'as', packagePath);
  var output = fs.createWriteStream(packagePath);
  var archive = archiver('zip');

  archive.on('error', (err) => { throw err });

  archive.pipe(output);

  var jcrRoot = path.join(argv.folder, 'jcr_root');
  archive.directory(jcrRoot, 'jcr_root', { name: 'jcr_root' });

  var metainf = path.join(argv.folder, 'META-INF');
  archive.directory(metainf, 'META-INF', { name: 'META-INF' });

  addConfigDefaults(json);
  var xml = propertiesXMLFromJson(json);
  logger.debug('Writing generated META-INF/vault/properties.xml');
  logger.debug(xml);
  archive.append(xml, {name: 'META-INF/vault/properties.xml'});

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

function propertiesXMLFromJson(json) {
  var properties = json['vault-properties'];
  var entries = properties['entry'];
  var xml = xmlbuilder.create('properties'); 

  for(var elem in properties) {
    if(elem != 'entry') {
      xml.ele(elem, properties[elem]);
    }
  }

  for(var entry in entries) {
    xml.ele('entry', {'key': entry}, entries[entry]);
  }

  xml.end({ pretty: true});
  
  var xmlProlog = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n' 
    + '<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">\n';

  return xmlProlog + xml.toString({ pretty: true});
}

function addConfigDefaults(json) {
  var properties = json['vault-properties'];
  var entries = properties['entry'];

  if(!entries['createdBy']) {
    entries['createdBy'] = 'slingpackager';
  }

  if(!entries['acHandling']) {
    entries['acHandling'] = 'IGNORE';
  }

  if(!entries['allowIndexDefinitions']) {
    entries['allowIndexDefinitions'] = false;
  }

  if(!entries['requiresRoot']) {
    entries['requiresRoot'] = false;
  }

  if(!entries['path']) {
    entries['path'] = '/etc/packages/' 
       + entries['group'] 
       + '/' + entries['name'] 
       + '-' + entries['version'] 
       + '.zip';
  }
}

function packageName(json) {
  var properties = json['vault-properties'];
  var entries = properties['entry'];
  var name = entries['name'];
  var group = entries['group'];
  var version = entries['version'];

  if(!name || !group || !version) {
    logger.error(configFile,
      "is missing one or more of the required entries for 'name', 'group' or 'version' to generate a package.");
    throw "Config is missing one or more of the required entries for 'name', 'group' or 'version' to generate a package."
  }

  return name+"-"+version+".zip";
}

function getConfigJson(dirPath) {
  var configFile = findConfigFile(dirPath);

  if(configFile != undefined) {
    var json = JSON.parse(fs.readFileSync(configFile, 'utf8'));
    logger.debug(JSON.stringify(json));
    return json;
  }

  return undefined;
}

function findConfigFile(dirPath) {
  logger.debug('Looking for', configFile, 'in', dirPath);
  var filePath = path.join(dirPath, configFile);
  if(fs.existsSync(filePath)) {
    logger.debug('Found', filePath);
    return filePath;
  } else {
    var parentPath = path.resolve(dirPath, '..');
    if(parentPath && parentPath != dirPath) {
      return findConfigFile(parentPath);
    }
  }

  logger.warn('Unable to find package.json');
  return undefined;
}