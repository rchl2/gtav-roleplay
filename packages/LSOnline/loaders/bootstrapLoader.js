'use strict';

const logger = require('../modules/utils/logger');

module.exports = async () => {
  try {
    const vehicleBootstrap = require('../modules/vehicles/vehicleBootstrap');
    const doorBootstrap = require('../modules/doors/doorBootstrap');

    vehicleBootstrap.boot();
    doorBootstrap.boot();
  } catch (err) {
    logger('server', `Error while bottstraping (Error: ${err.message} / ${err.stack})!`, 'error');
  }
};
