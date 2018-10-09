'use strict';

const logger = require('../modules/utils/logger');

module.exports = async () => {
  try {
    require('../modules/database/database');

    logger('server', `Loaded successfully database config!`, 'info');
  } catch (err) {
    logger('server', `Error while loading database config (Error: ${err.message} / ${err.stack})!`, 'error');
  }
};
