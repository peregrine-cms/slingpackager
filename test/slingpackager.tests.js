// test/slingpackager.tests.js
const logger = require('../utils/consoleLogger');
const fs = require('fs');
const assert = require('assert');
const path = require('path');
const request = require('request');
const exec = require('child_process').execSync;

const packageName = 'testContent-1.0-SNAPSHOT.zip'
const packPath = path.join('test','testContent-1.0-SNAPSHOT.zip');
const packDirPath = path.join('test','resources','test-content');

const server = 'http://localhost:8080';
const packServerPath = '/etc/packages/slingpackager/testContent-1%2E0-SNAPSHOT.zip';
const packServerName = '/slingpackager/testContent-1.0-SNAPSHOT.zip';
const testInstallPath = '/content/slingpackager/test.json';

describe('slingpackager', function() {

    // package test
    describe('create', function() {
        it('should create package', function() {
            var cmd = 'node bin/slingpackager package -d test ' + packDirPath;
            var output = exec(cmd);
            assert.equal((fs.existsSync(packPath) && fs.statSync(packPath).size>0), true);
        });
    });

    // upload test
    describe('upload', function() {
        it('should upload package', function() {
            var cmd = 'node bin/slingpackager upload ' + packPath;
            var output = exec(cmd);
            logger.log(output);

            // setTimeout(() => {assert200(server + packServerPath);}, 1000);
        });
    });

    // list test
    describe('list', function() {
        it('should list packages', function() {
            var cmd = 'node bin/slingpackager list';
            var output = exec(cmd);
            logger.log(output);
        });
    });

    // install test
    describe('install', function() {
        it('should install package', function() {
            var cmd = 'node bin/slingpackager install ' + packServerName;
            var output = exec(cmd);
            logger.log(output);
        });
    });

    // uninstall test
    describe('uninstall', function() {
        it('should uninstall package', function() {
            var cmd = 'node bin/slingpackager uninstall ' + packServerName;
            var output = exec(cmd);
            logger.log(output);
        });
    });

    // delete test
    describe('delete', function() {
        it('should delete package', function() {
            var cmd = 'node bin/slingpackager delete ' + packServerName;
            var output = exec(cmd);
            logger.log(output);
        });
    });

    after(function() {
        logger.log(exec('rm ' + packPath));
    });
});

function assert200(testURL) {
    request.get({url: testURL}, function(error, response, body) {
        assert.equal(response && response.statusCode===200);
    });
}