'use strict';

const logger = require('../modules/utils/logger');

module.exports = async () => {
  try {
    const commands = await rp.commands.loadFiles();

    logger('server', `Loaded successfully ${commands.size} (${commands.size} files) commands!`, 'info');
  } catch (err) {
    logger('server', `Error while loading commands (Error: ${err.message} / ${err.stack})!`, 'error');
  }
};
