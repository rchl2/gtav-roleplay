'use strict';

const authorizePlayerCommand = require('../../auth/commands/authorizePlayerCommand');

mp.events.add({
  authorizePlayer: async (player, login, password) => {
    await authorizePlayerCommand.execute(player, login, password);
  }
});
