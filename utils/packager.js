const cpmPackager = require('./composumpackager');
const aemPackager = require('./aempackager');
const logger = require('./consoleLogger');

var pm = cpmPackager;
var testCount = 0; 

function testService(argv, callback) {
    let user = argv.user.split(':');
    let userName = user[0];
    let pass = '';
    if(user.length > 1) {
        pass = user[1];
    }

    checkService({server: argv.server, 
        userName: userName, 
        password: pass, 
        maxRetry: argv.retry,
        retryInterval: 1000,
        callback
    }, _callback);
}

function checkService(data, callback) {
    testCount = testCount + 1;
    logger.debug(testCount + '. Testing',pm.getName(),'on',data.server);
    pm.checkService(data.server, data.userName, data.password, (success) => {
        if(success) {
            callback(data, true);
        } else {
            logger.debug(testCount + '. Testing',aemPackager.getName(),'on',data.server);
            aemPackager.checkService(data.server, data.userName, data.password, (success) => {
              if(success) {
                  pm = aemPackager;
              }
              
              callback(data, success);
            });
        }
    });
}

function _callback(data, success) {
    if (success) {
        if(data.callback) { 
            data.callback(success, pm); 
        }
    } else {
        if(testCount < data.maxRetry) {
            setTimeout(()=>checkService(data, _callback), data.retryInterval);
        } else {
            logger.error('Failed to connect to',cpmPackager.getName(),'or',aemPackager.getName(),'on',data.server);
            if(data.callback) { 
                data.callback(success, pm); 
            } else { 
                throw 'NetworkError: Failed to connect to Package Manager. Server might be down.'; 
            }
        }
    }
}

module.exports = {
    test: (argv, callback) => { testService(argv, callback) }
}