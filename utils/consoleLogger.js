const verbosity = require('verbosity');

const logger = verbosity.createConsole({
    outStream: process.stdout,
    errorStream: process.stderr,
    verbosity: 3,
});

logger.init = (argv) => {
    if(argv.verbose) {
        logger.verbosity(5);
    }
}

module.exports = logger