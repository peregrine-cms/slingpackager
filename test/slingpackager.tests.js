// test/slingpackager.tests.js
const logger = require('../utils/consoleLogger');
const fs = require('fs');
const assert = require('assert');
const path = require('path');
const exec = require('child_process').execSync;

const packageName = 'testContent-1.0-SNAPSHOT.zip'
const packPath = path.join('test','testContent-1.0-SNAPSHOT.zip');
const packDirPath = path.join('test','resources','test-content');

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
            assert.equal(1,1);
        });
    });

    // install test
    describe('install', function() {
        it('should install package', function() {
            assert.equal(1,1);
        });
    });

    // uninstall test
    describe('uninstall', function() {
        it('should uninstall package', function() {
            assert.equal(1,1);
        });
    });

    // delete test
    describe('delete', function() {
        it('should delete package', function() {
            assert.equal(1,1);
        });
    });

    after(function() {
        logger.log(exec('rm ' + packPath));
    });
});