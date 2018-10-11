'use strict';

const logger = require('../utils/logger');
const { loadAll } = require('./doorManager');

const boot = async () => {
  loadAll();
  logger('server', `Successfully bootstrapped doors!`, 'info');
};

exports.boot = boot;
