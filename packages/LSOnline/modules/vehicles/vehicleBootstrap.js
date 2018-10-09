'use strict';

const logger = require('../utils/logger');
const { loadAll } = require('./vehicleManager');

const boot = async () => {
  loadAll();

  logger('server', `Successfully bootstrapped vehicles!`, 'info');
};

exports.boot = boot;
