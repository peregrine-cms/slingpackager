/**  
 * test/serverInfo.js
 * 
 * This script can be used to discover some of server information dynamically and/or start test 
 * server instance when running test.
 * 
 * TODO: for now all values are hardcoded.
 */

const server = 'http://localhost:8080';
const packServerPath = '/etc/packages/slingpackager/testContent-1%2E0-SNAPSHOT.zip';
const packServerName = '/slingpackager/testContent-1.0-SNAPSHOT.zip';
const testInstallPath = '/content/slingpackager/test.json';
const username = 'admin';
const password = 'admin';

module.exports = {
    server,
    packServerPath,
    packServerName,
    testInstallPath,
    username,
    password
}