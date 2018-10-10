const CommandCollection = require('../modules/structures/commandCollection');

class GameClient {
  constructor () {
    this.initialize();
  }

  /**
   * Initialize game client.
   */
  initialize () {
    this.loadGlobals();
    this.runLoaders();
  }

  /**
   * Assign commands collection and server config to global.
   */
  loadGlobals () {
    global.rp = {};

    rp.commands = new CommandCollection();
    rp.config = require('../../../config/server.config.json');
  }

  /**
   * Run loaders.
   */
  runLoaders () {
    (async () => {
      await require('../loaders/databaseLoader')();
      await require('../loaders/eventHandlersLoader')();
      await require('../loaders/commandsLoader')();
      await require('../loaders/clientProvidersLoader')();
      await require('../loaders/bootstrapLoader.js')();
    })();
  }
}

module.exports = new GameClient();
