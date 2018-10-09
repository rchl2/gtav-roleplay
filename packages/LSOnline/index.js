'use strict';

// Globals
global.rp = {};

// Libs
const moment = require('moment');
const dotenv = require('dotenv');
const result = dotenv.config();
const logger = require('./modules/utils/logger');

// Config for moment
moment.locale('pl');

// Command collection
const CommandCollection = require('./modules/structures/commandCollection');
rp.commands = new CommandCollection();

rp.config = require('../../config/server.config.json');

// Load server gamemode async
(async () => {
  await require('./loaders/databaseLoader')();

  await require('./loaders/eventHandlersLoader')();

  await require('./loaders/commandsLoader')();

  await require('./loaders/clientProvidersLoader')();

  await require('./loaders/bootstrapLoader.js')();

  // Loading complete
  logger('server', 'Loading complete... server is ready!', 'info');
})();
