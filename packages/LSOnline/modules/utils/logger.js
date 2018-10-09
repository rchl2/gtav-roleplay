// Get logger
const log4js = require('log4js');

// Configuration logger
log4js.configure({
  appenders: {
    file: { type: 'file', layout: { type: 'basic' }, filename: `logs/server.log` },
    console: { type: 'console' }
  },
  categories: { default: { appenders: ['file', 'console'], level: 'info' } }
});

// Get logger instance and export
const loggerInstance = log4js.getLogger('[LSRPV]');
module.exports = (moduleName, msg, type) => loggerInstance[type](`[${moduleName}] ${msg}`);
